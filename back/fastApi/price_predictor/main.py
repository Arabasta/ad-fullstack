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
LOADED_X_SCALERS = {}
LOADED_Y_SCALERS = {}

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
@app.post("/api/v1/predict/ticker/backtest")
async def by_prediction_dto_backtest(prediction_dto: PredictionDTO):
    if prediction_dto.tickerDTO is None or prediction_dto.predictions is None:
        return None
    predictions = predictions_from_x_values(ticker_dto=prediction_dto.tickerDTO,
                                            x_values=np.array(prediction_dto.predictions).reshape(1, -1))
    return PredictionDTO(tickerDTO=prediction_dto.tickerDTO,
                         predictions=predictions)


# Accepts Backend's TickerDTO in RequestBody
@app.post("/api/v1/predict/ticker/live")
async def by_ticker_dto_live(ticker_dto: TickerDTO):
    ticker_name = ticker_dto.tickerName
    if ticker_name not in list(LOADED_MODELS):
        return None
    logger.info('--Start prediction--')
    logger.info(f'--Predicting {ticker_name}--')
    predictions = predictions_from_ticker_dto(ticker_dto)
    logger.info('--Finish prediction--')
    return PredictionDTO(tickerDTO=ticker_dto,
                         predictions=predictions)


# Dev
# todo: method tested as working. to remove this api, and run the function using scheduler once / twice a day.
@app.get("/api/v1/dev/load_all_pickle_models")
async def load_models():
    load_all_pickle_files(AWS_S3_MODEL_BUCKET_NAME, LOADED_MODELS)
    return {"response": f'Loaded: {list(LOADED_MODELS)}'}


# todo: method tested as working. to remove this api after dev.
@app.get("/api/v1/dev/load_pickle_model")
async def test_load_pickle_model(ticker_name, key):
    load_pickle_file(AWS_S3_MODEL_BUCKET_NAME, ticker_name, key, LOADED_MODELS)
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
def load_all_pickle_files(bucket_name, models_dict):
    try:
        s3_client = get_s3_client()
        # Retrieve the list of model files in the bucket
        # todo: include logic to loop through stocks bucket and crypto bucket
        response = s3_client.list_objects_v2(Bucket=bucket_name, Prefix="model/")
        if 'Contents' in response:
            # Extract the keys (filenames) and filter out non-.pkl files if needed
            keys = [str(item['Key']).split("/")[1] for item in response['Contents'] if item['Key'].endswith('.pkl')]  # todo:to reinstate.
            logger.info(keys)
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
                load_pickle_file(bucket_name, ticker_name, key, models_dict)
            logger.info('--Finish loading models--')

        else:
            print("No objects found in the bucket.")
    except Exception as e:
        print(f"Failed to retrieve objects from the bucket: {str(e)}")


def load_pickle_file(bucket_name, ticker_name, key, models_dict):
    # Set up S3 client
    s3_client = get_s3_client()
    # Read file from S3 bucket
    obj = s3_client.get_object(Bucket=bucket_name, Key=f'model/{key}')
    models_dict[ticker_name] = pickle.loads(obj['Body'].read())
    logger.info(f'Loaded {key} model')
    obj = s3_client.get_object(Bucket=bucket_name, Key=f'x_scaler/{key}')
    LOADED_X_SCALERS[ticker_name] = pickle.loads(obj['Body'].read())
    logger.info(f'Loaded {key} x_scaler')
    obj = s3_client.get_object(Bucket=bucket_name, Key=f'y_scaler/{key}')
    LOADED_Y_SCALERS[ticker_name] = pickle.loads(obj['Body'].read())
    logger.info(f'Loaded {key} y_scaler')


def predictions_from_ticker_dto(ticker_dto):
    x_values = get_latest_ticker_api_data(ticker_dto.tickerName)
    return predictions_from_x_values(ticker_dto, np.array(x_values))


# Read and load prices jsons from polygon API
def get_latest_ticker_api_data(ticker_name):
    # todo: to consider redesigning pipeline to know the name and quantity of features required by the trained models.
    # todo: handle non-trading day requests (in polygon's response {}, it will contain "resultsCount": 0).
    # Build polygon client
    polygon_client = RESTClient(api_key=POLYGON_API_KEY)

    # todo: logic to check if today is trading day. will not be able to get current prices on closed market day.
    # Datetime strings for api
    today = datetime.today().strftime('%Y-%m-%d')
    previous_datetime = datetime.today() - timedelta(days=4)
    previous = previous_datetime.strftime('%Y-%m-%d')

    # Call polygon api
    data_request = polygon_client.list_aggs(
        ticker=ticker_name,
        multiplier=10,
        timespan='minute',
        from_=previous,
        to=today,
        adjusted=True,
        sort='desc',  # get most recent datapoints.
        limit=117  # todo: do not hardcode. match quantity of features required by models.
    )
    # Create DataFrame from polygon api json response for data processing.
    df_raw = pd.DataFrame(data_request)
    # todo: do not hardcode features required by models.
    df_features = add_lagged_features(df_raw[['vwap']].iloc[::-1], 39)
    arr_features = df_features.iloc[:39].values
    return arr_features


# Pass parameters into models
def predictions_from_x_values(ticker_dto, x_values):
    ticker_name = ticker_dto.tickerName
    model = LOADED_MODELS[ticker_name]
    scaled_x_values = LOADED_X_SCALERS[ticker_name].transform(x_values)
    y_pred = model.predict(np.array(scaled_x_values))
    inverse_scaled_y_pred = LOADED_Y_SCALERS[ticker_name].inverse_transform(y_pred.reshape(-1, 1)).flatten()
    return list(inverse_scaled_y_pred)


def add_lagged_features(df_x_values, future_window):
    df = df_x_values.copy()
    # Create lagged features for the past N periods
    # todo: do not hardcode features required by models.
    for lag in range(1, future_window):
        df[f'lag_vwap_{lag}'] = df['vwap'].shift(lag)
    # Drop rows with NaN values created by the lagged features
    df.dropna(inplace=True)
    return df


'''
MAIN
'''


def main():
    return


if __name__ == '__main__':
    main()
