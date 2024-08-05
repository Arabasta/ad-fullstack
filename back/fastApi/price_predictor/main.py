import logging
from datetime import datetime, timedelta
from decimal import Decimal
from typing import List

import boto3
import os
import pickle
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.linear_model import ElasticNet
from xgboost import XGBRegressor

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from polygon import RESTClient

import pandas as pd
from pydantic import BaseModel

import service.utils as utils

logger = logging.getLogger('uvicorn')

app = FastAPI(docs_url="/documentation", redoc_url=None)

# Load env variables to instance
load_dotenv()

'''
Constants
'''
# AWS
AWS_S3_ACCESS_KEY_ID = os.getenv('AWS_S3_ACCESS_KEY_ID')
AWS_S3_SECRET_ACCESS_KEY = os.getenv('AWS_S3_SECRET_ACCESS_KEY')
AWS_S3_REGION = os.getenv('AWS_S3_REGION')
AWS_S3_PREDICTION_BUCKET_NAME = os.getenv('AWS_S3_PREDICTION_BUCKET_NAME')
AWS_S3_MODEL_BUCKET_NAME = os.getenv('AWS_S3_MODEL_BUCKET_NAME')

# POLYGON
POLYGON_API_KEY = os.getenv('POLYGON_API_KEY')

# PATH
PARENT_DIRECTORY_PATH = str(utils.get_project_root())
REPO_ROOT_PATH = str(utils.get_repo_root())

# IN-MEMORY DATA
LOADED_MODELS = {}

# todo: to refactor models into dto folder. for some reason, they were not detected when imported from dto folder.
'''
MODELS
'''


class TickerDTO(BaseModel):
    tickerType: str
    tickerName: str


class TickerDTOListDTO(BaseModel):
    tickerDTOList: List[TickerDTO]


class PredictionDTO(BaseModel):
    tickerDTO: TickerDTO
    predictions: List[Decimal]


class PredictionDTOListDTO(BaseModel):
    predictionDTOList: List[PredictionDTO]


'''
API
'''


@app.get("/")
async def redirect_to_documentation():
    return RedirectResponse("http://localhost:8000/documentation")


# todo: for dev. to delete before submission.
# To check list of tickers that are available for predictions, with trained models loaded
@app.get("/api/v1/health")
async def get():
    health = {
        "AWS_S3_ACCESS_KEY_ID": AWS_S3_ACCESS_KEY_ID,
        "AWS_S3_SECRET_ACCESS_KEY": AWS_S3_SECRET_ACCESS_KEY,
        "AWS_S3_REGION": AWS_S3_REGION,
        "AWS_S3_PREDICTION_BUCKET_NAME": AWS_S3_PREDICTION_BUCKET_NAME,
        "AWS_S3_MODEL_BUCKET_NAME": AWS_S3_MODEL_BUCKET_NAME,
        "POLYGON_API_KEY": POLYGON_API_KEY,
        "PARENT_DIRECTORY_PATH": PARENT_DIRECTORY_PATH,
        "REPO_ROOT_PATH": REPO_ROOT_PATH,
        "LOADED_MODELS": LOADED_MODELS,
    }
    return {"response": health}


# Accepts Backend's PredictionDTO in RequestBody
@app.get("/api/v1/predict/ticker/backtest")
async def get(prediction_dto: PredictionDTO):
    if prediction_dto.tickerDTO is None or prediction_dto.predictions is None:
        return None
    predictions = predictions_from_x_values(ticker_dto=prediction_dto.tickerDTO,
                                            x_values=prediction_dto.predictions)
    return PredictionDTO(tickerDTO=prediction_dto.tickerDTO,
                         predictions=predictions)


# Accepts Backend's TickerDTO in RequestBody
@app.get("/api/v1/predict/ticker/live")
async def get(ticker_dto: TickerDTO):
    ticker_name = ticker_dto.tickerName
    if ticker_name not in list(LOADED_MODELS):
        return None
    logger.info('--Start prediction--')
    logger.info(f'--Predicting {ticker_name}--')
    predictions = predictions_from_ticker_dto(ticker_dto)
    logger.info('--Finish prediction--')
    return PredictionDTO(tickerDTO=ticker_dto,
                         predictions=predictions)


# todo: not working yet. to fix / remove.
# Accepts Backend's TickerDTOListDTO in RequestBody
@app.get("/api/v1/predict/ticker_list/live")
async def get(ticker_dto_list_dto: TickerDTOListDTO):
    ticker_names_list = [tickerDTO.tickerName for tickerDTO in ticker_dto_list_dto.tickerDTOList]
    # Boolean for checking if all requested models were loaded
    all_ticker_models_loaded = all(ticker_name in ticker_names_list for ticker_name in list(LOADED_MODELS))
    if not all_ticker_models_loaded:
        # todo: implement error logic. to return list of tickers that do not have trained models.
        return None
    predictions_dto_list = []
    logger.info('--Start predictions--')
    for tickerDTO in ticker_dto_list_dto.tickerDTOList:
        logger.info(f'--Predicting {tickerDTO.tickerName}--')
        predictions = predictions_from_ticker_dto(tickerDTO)
        predictions_dto_list.append(PredictionDTO(tickerDTO=tickerDTO,
                                                  predictions=predictions))
    logger.info('--Finish predictions--')
    # return {"predictions": json.dumps(json_predictions)}
    return PredictionDTOListDTO(predictionDTOList=predictions_dto_list)


# Dev
# todo: method tested as working. to remove this api, and run the function using scheduler once / twice a day.
@app.get("/api/v1/dev/load_all_pickle_models")
async def test_load_all_pickle_models():
    load_all_pickle_models(LOADED_MODELS, AWS_S3_MODEL_BUCKET_NAME)
    return {"response": f'Loaded: {list(LOADED_MODELS)}'}


# todo: method tested as working. to remove this api after dev.
@app.get("/api/v1/dev/load_pickle_model")
async def test_load_pickle_model(ticker_name, key):
    load_pickle_model(ticker_name, key, LOADED_MODELS, AWS_S3_MODEL_BUCKET_NAME)
    if ticker_name in list(LOADED_MODELS):
        return {"response": f'{ticker_name} loaded!'}
    return {"response": f'{ticker_name} loading failed!'}


# todo: method tested as working. to remove this api after dev.
@app.get("/api/v1/dev/get_latest_ticker_api_data")
async def test_get_latest_ticker_api_data(key):
    return {"response": get_latest_ticker_api_data(key)}  # {"latest": [223.4979, 223.0934, ... ]}


# todo: to refactor helper functions into another python file.
'''
Helper functions
'''


# Get s3 client for AWS S3 related functions
def get_s3_client():
    return boto3.client('s3',
                        aws_access_key_id=AWS_S3_ACCESS_KEY_ID,
                        aws_secret_access_key=AWS_S3_SECRET_ACCESS_KEY)


# Read and load models from S3 to RAM
# todo: to refactor. taking around 2s per model.
def load_all_pickle_models(dictionary, bucket_name):
    try:
        s3_client = get_s3_client()
        # Retrieve the list of model files in the bucket
        # todo: include logic to loop through stocks bucket and crypto bucket
        response = s3_client.list_objects_v2(Bucket=bucket_name)
        if 'Contents' in response:
            # Extract the keys (filenames) and filter out non-.pkl files if needed
            keys = [item['Key'] for item in response['Contents'] if item['Key'].endswith('.pkl')]  # todo:to reinstate.
            # todo: temporarily hardcoded temp_keys, to remove after implementing models trained on ETFs.
            temp_keys = ['AAPL.pkl', 'ABBV.pkl', 'ADBE.pkl', 'AMZN.pkl', 'AVGO.pkl',
                         'COST.pkl', 'CVX.pkl', 'GOOG.pkl', 'GOOGL.pkl', 'HD.pkl',
                         'JNJ.pkl', 'JPM.pkl', 'LLY.pkl', 'MA.pkl', 'META.pkl',
                         'MRK.pkl', 'MSFT.pkl', 'NVDA.pkl', 'PEP.pkl', 'PG.pkl',
                         'TSLA.pkl', 'UNH.pkl', 'XOM.pkl']  # V and BRK.B not in source data.

            # todo: temporarily hardcoded temp_keys, to remove after implementing models trained on ETFs.
            keys = list(set(keys) & set(temp_keys))
            # Load all models
            logger.info('--Start loading models--')
            for key in keys:
                ticker_name = str(key).split(".")[0]
                load_pickle_model(ticker_name, key, dictionary, bucket_name)
                logger.info(f'Loaded {key} model')
            logger.info('--Finish loading models--')

        else:
            print("No objects found in the bucket.")
    except Exception as e:
        print(f"Failed to retrieve objects from the bucket: {str(e)}")


def load_pickle_model(ticker_name, key, loaded_models_dict, bucket_name):
    # Set up S3 client
    s3_client = get_s3_client()
    # Read file from S3 bucket
    obj = s3_client.get_object(Bucket=bucket_name, Key=key)
    loaded_models_dict[ticker_name] = pickle.loads(obj['Body'].read())


def predictions_from_ticker_dto(ticker_dto):
    x_values = get_latest_ticker_api_data(ticker_dto.tickerName)
    return predictions_from_x_values(ticker_dto, x_values)


# Read and load prices jsons from polygon API
def get_latest_ticker_api_data(ticker_name):
    # todo: to consider redesigning pipeline to know the name and quantity of features required by the trained models.
    # todo: handle non-trading day requests (in polygon's response {}, it will contain "resultsCount": 0).
    # Build polygon client
    polygon_client = RESTClient(api_key=POLYGON_API_KEY)

    # todo: logic to check if today is trading day. will not be able to get current prices on closed market day.
    # Datetime strings for api
    today = datetime.today().strftime('%Y-%m-%d')
    yesterday_datetime = datetime.today() - timedelta(days=1)
    yesterday = yesterday_datetime.strftime('%Y-%m-%d')

    # Call polygon api
    data_request = polygon_client.list_aggs(
        ticker=ticker_name,
        multiplier=10,
        timespan='minute',
        from_='2024-08-01',  # todo: use 'yesterday' after fixing
        to='2024-08-02',  # todo: use 'today' after fixing
        adjusted=True,
        sort='desc',  # get most recent datapoints.
        limit=78  # todo: do not hardcode. match quantity of features required by models.
    )

    # Create DataFrame from polygon api json response for data processing.
    df_raw = pd.DataFrame(data_request)
    df_features = df_raw.vwap.iloc[::-1]  # todo: do not hardcode. match features required by models.
    arr_features = list(df_features.iloc[:39].values)
    return arr_features


# Pass parameters into models
def predictions_from_x_values(ticker_dto, x_values):
    ticker_name = ticker_dto.tickerName
    model = LOADED_MODELS[ticker_name]
    y_pred = model.predict(np.array(x_values).reshape(-1, 1))
    # todo: to import scaler used in model fitting, so can inverse the scaling on y_pred
    return list(y_pred)


'''
MAIN
'''


def main():
    return


if __name__ == '__main__':
    main()
