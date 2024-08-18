import json
import os
from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from dotenv import load_dotenv
from .service import utils as utils
import logging
from datetime import datetime, timedelta
from decimal import Decimal
from typing import List, Type
from pydantic import BaseModel
import pickle
import numpy as np
import pandas as pd
from apscheduler.schedulers.background import BackgroundScheduler
from polygon import RESTClient
from .machine_learning import Price_Predictor_Notebook_Local as ml

# Load
app = FastAPI(docs_url="/documentation", redoc_url=None)
logger = logging.getLogger('uvicorn')
load_dotenv()

'''
Constants
'''
# AWS
AWS_S3_ACCESS_KEY_ID = os.getenv('AWS_S3_ACCESS_KEY_ID')
AWS_S3_SECRET_ACCESS_KEY = os.getenv('AWS_S3_SECRET_ACCESS_KEY')
AWS_S3_PREDICTION_BUCKET_NAME = os.getenv('AWS_S3_PREDICTION_BUCKET_NAME')
AWS_S3_MODEL_BUCKET_NAME = os.getenv('AWS_S3_MODEL_BUCKET_NAME')

# POLYGON
POLYGON_API_KEY = os.getenv('POLYGON_API_KEY')

# PATH
PARENT_DIRECTORY_PATH = str(utils.get_project_root())
REPO_ROOT_PATH = str(utils.get_repo_root())
TRAINED_FILES_DIRECTORY = PARENT_DIRECTORY_PATH + '/trained_files'
DATA_DIRECTORY = PARENT_DIRECTORY_PATH + '/data'

# IN-MEMORY DATA
FEATURE = 'vwap'
FEATURE_COUNT = 39
LOADED_MODELS = {}
LOADED_X_SCALERS = {}
LOADED_Y_SCALERS = {}

'''
MODELS
'''


class HealthDTO(BaseModel):
    cloud_access_key_id_status: str
    cloud_secret_access_key_status: str
    cloud_prediction_storage_name_status: str
    cloud_model_storage_name_status: str
    cloud_data_provider_api_key_status: str
    models_loaded_for_prediction_and_backtesting: List[str]


class TickerDTO(BaseModel):
    tickerType: str
    tickerName: str
    portfolioType: str


class PredictionDTO(BaseModel):
    tickerDTO: TickerDTO
    predictions: List[Decimal]


'''
API
'''


@app.get("/")
def redirect_to_documentation():
    return RedirectResponse(url="/documentation")


@app.get("/api/v1/health")
def get() -> Type[HealthDTO]:
    HealthDTO(
        cloud_access_key_id_status="Loaded" if len(AWS_S3_ACCESS_KEY_ID) > 0 else "Not found.",
        cloud_secret_access_key_status="Loaded" if len(AWS_S3_SECRET_ACCESS_KEY) > 0 else "Not found.",
        cloud_prediction_storage_name_status="Loaded" if len(AWS_S3_PREDICTION_BUCKET_NAME) > 0 else "Not found.",
        cloud_model_storage_name_status="Loaded" if len(AWS_S3_MODEL_BUCKET_NAME) > 0 else "Not found.",
        cloud_data_provider_api_key_status="Loaded" if len(POLYGON_API_KEY) > 0 else "Not found.",
        models_loaded_for_prediction_and_backtesting=list(LOADED_MODELS)
    )
    return HealthDTO


# Accepts Backend's PredictionDTO in RequestBody
# Note: List<Decimal> must be >= FEATURE_COUNT, which will be used to create lag features and reshaped for predictions.
@app.post("/api/v1/predict/ticker/backtest")
def by_prediction_dto_backtest(prediction_dto: PredictionDTO) -> PredictionDTO:
    predictions = []
    try:
        # Exception handling
        if len(list(LOADED_MODELS)) == 0:
            raise EOFError(f"No models ready. Please try api `load_all_pickle_models`.")
        if prediction_dto.tickerDTO.tickerName is None or prediction_dto.predictions is None:
            raise IOError(f"tickerDTO.tickerName or predictions attributes cannot be null")
        if len(prediction_dto.predictions) < FEATURE_COUNT:
            raise IOError(f"Please input more than {FEATURE_COUNT} predictions datapoints")
        if prediction_dto.tickerDTO.tickerName.startswith("X:"):
            prediction_dto.tickerDTO.tickerName = prediction_dto.tickerDTO.tickerName.replace("X:", "X_")

        # Prediction logic
        x_values = add_lagged_features(df_x_values=pd.DataFrame(prediction_dto.predictions, columns=[FEATURE]),
                                       future_window=FEATURE_COUNT)
        predictions = predictions_from_x_values(ticker_dto=prediction_dto.tickerDTO,
                                                x_values=x_values)
    except Exception as err:
        logger.error(f"Exception occurred at backtest predictions for {prediction_dto.tickerDTO.tickerName}: {err}")
    return PredictionDTO(tickerDTO=prediction_dto.tickerDTO,
                         predictions=predictions)


# Accepts Backend's TickerDTO in RequestBody
@app.post("/api/v1/predict/ticker/live")
def by_ticker_dto_live(ticker_dto: TickerDTO) -> PredictionDTO:
    predictions = []
    try:
        ticker_name = ticker_dto.tickerName.strip()
        # Exception handling
        if ticker_name is None or ticker_name == "":
            raise IOError(f"tickerName cannot be empty")
        if ticker_name not in list(LOADED_MODELS):
            raise FileNotFoundError(f"{ticker_name} not in available models: {list(LOADED_MODELS)}")
        if ticker_name.startswith("X:"):
            ticker_name = ticker_name.replace("X:", "X_")

        # Prediction logic
        logger.info('--Start prediction--')
        logger.info(f'--Predicting {ticker_name}--')
        predictions = predictions_from_ticker_dto(ticker_dto)
        logger.info('--Finish prediction--')
    except Exception as err:
        logger.error(f"Exception occurred at live predictions for {ticker_dto.tickerName}: {err}")
    return PredictionDTO(tickerDTO=ticker_dto,
                         predictions=predictions)


@app.get("/api/v1/dev/load_all_pickle_models")
async def load_models() -> List[str]:
    load_all_pickle_files(AWS_S3_MODEL_BUCKET_NAME, LOADED_MODELS)
    return list(LOADED_MODELS)

# ##########################################
# Note:
# These commented out functions interact with Polygon.io paid API and AWS S3 cloud storage in deployment.
# In this submission, these functions cannot be used without the API and AWS S3 keys, so we have replaced them with
# reading + downloading from public Google Drive + local storage.
# ##########################################
'''
@app.get("/api/v1/dev/load_all_pickle_models")
async def load_models() -> List[str]:
    load_all_pickle_files(AWS_S3_MODEL_BUCKET_NAME, LOADED_MODELS)
    return list(LOADED_MODELS)
'''

'''
Helper functions (API Data Source + Cloud Storage)
'''

'''
# Get s3 client for AWS S3 related functions
def get_s3_client():
    return boto3.client('s3',
                        aws_access_key_id=AWS_S3_ACCESS_KEY_ID,
                        aws_secret_access_key=AWS_S3_SECRET_ACCESS_KEY)


# Read and load models from S3 to RAM
def load_all_pickle_files(bucket_name, models_dict):
    try:
        s3_client = get_s3_client()
        # Retrieve the list of model files in the bucket
        response = s3_client.list_objects_v2(Bucket=bucket_name, Prefix="model/")
        if 'Contents' in response:
            # Extract the keys (filenames) and filter out non-.pkl files if needed
            keys = [str(item['Key']).split("/")[1] for item in response['Contents']]
            logger.info(f'Trained models available: {keys}')
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
    # Load trained model from s3 to in-memory dictionary
    obj = s3_client.get_object(Bucket=bucket_name, Key=f'model/{key}')
    models_dict[ticker_name] = pickle.loads(obj['Body'].read())
    logger.info(f'Model: {type(models_dict[ticker_name])}')
    logger.info(f'Loaded {key} model. Ticker name: {ticker_name}')
    # Load x_scaler from s3 to in-memory dictionary
    obj = s3_client.get_object(Bucket=bucket_name, Key=f'x_scaler/{ticker_name}.pkl')
    LOADED_X_SCALERS[ticker_name] = pickle.loads(obj['Body'].read())
    logger.info(f'Loaded {key} x_scaler')
    # Load y_scaler from s3 to in-memory dictionary
    obj = s3_client.get_object(Bucket=bucket_name, Key=f'y_scaler/{ticker_name}.pkl')
    LOADED_Y_SCALERS[ticker_name] = pickle.loads(obj['Body'].read())
    logger.info(f'Loaded {key} y_scaler')
    
    
# Read and load prices jsons from polygon API
def get_latest_ticker_api_data(ticker_name):
    # Build polygon client
    polygon_client = RESTClient(api_key=POLYGON_API_KEY)
    # Datetime strings for api
    today = datetime.today().strftime('%Y-%m-%d')
    previous_datetime = datetime.today() - timedelta(days=4)
    previous = previous_datetime.strftime('%Y-%m-%d')

    # Call polygon api
    # ref: https://polygon.io/docs/stocks/get_v2_aggs_ticker__stocksticker__range__multiplier___timespan___from___to
    data_request = polygon_client.list_aggs(
        ticker=ticker_name,
        multiplier=10,
        timespan='minute',
        from_=previous,
        to=today,
        adjusted=True,
        sort='desc',
        limit=146
    )
    # Create DataFrame from polygon api json response for data processing.
    df_raw = pd.DataFrame(data_request)
    df_feature_flip = df_raw[[FEATURE]].iloc[::-1]
    df_ready = add_lagged_features(df_feature_flip, FEATURE_COUNT)
    arr_features = df_ready.iloc[-FEATURE_COUNT:].values
    return arr_features
'''
# ##########################################

'''
Helper functions (Google Drive Data Source + Local Storage)
'''


# Read and load models from Local Source to RAM
def load_all_pickle_files(trained_files_directory, models_dict):
    try:
        trained_models = utils.get_files_with_paths(trained_files_directory+'/model', ".pkl")
        print(trained_models)
        if len(trained_models) > 0:
            # Extract the keys (filenames) and filter out non-.pkl files if needed
            keys = list(trained_models.keys())
            logger.info(f'Trained models available: {keys}')
            # Load all models
            logger.info('--Start loading models--')
            for key in keys:
                ticker_name = str(key).split(".")[0]
                load_pickle_file(trained_files_directory, ticker_name, key, models_dict)
            logger.info('--Finish loading models--')

        else:
            print("No objects found in the bucket.")

    except Exception as e:
        print(f"Failed to retrieve objects from the source: {trained_files_directory}")


# loads fr
def load_pickle_file(trained_model_path, ticker_name, key, models_dict):
    with open(f'{trained_model_path}/model/{key}', 'rb') as f:
        models_dict[ticker_name] = pickle.load(f)
    logger.info(f'Model: {type(models_dict[ticker_name])}')
    logger.info(f'Loaded {key} model. Ticker name: {ticker_name}')

    # Load x_scaler from s3 to in-memory dictionary
    with open(f'{trained_model_path}/x_scaler/{key}', 'rb') as f:
        LOADED_X_SCALERS[ticker_name] = pickle.load(f)
    logger.info(f'Loaded {key} x_scaler')

    # Load y_scaler from s3 to in-memory dictionary
    with open(f'{trained_model_path}/y_scaler/{key}', 'rb') as f:
        LOADED_Y_SCALERS[ticker_name] = pickle.load(f)
    logger.info(f'Loaded {key} y_scaler')


# Read and load prices jsons from local storage
def get_latest_ticker_api_data(ticker_name):
    # Create DataFrame from simulated json response file for data processing.
    with open(f'{DATA_DIRECTORY}/{ticker_name}.json', 'r') as file:
        data_dict = json.load(file)

    df_raw = pd.DataFrame(data=data_dict['data'],
                          columns=data_dict['columns'],
                          index=data_dict['index'])
    df_feature_flip = df_raw[[FEATURE]].iloc[::-1]
    df_ready = add_lagged_features(df_feature_flip, FEATURE_COUNT)
    arr_features = df_ready.iloc[-FEATURE_COUNT:].values
    return arr_features


# Create lagged features for the past N periods (N = future_window)
def add_lagged_features(df_x_values, future_window):
    df = df_x_values.copy()
    for lag_count in range(1, future_window):
        df[f'lag_{FEATURE}_{lag_count}'] = df[FEATURE].shift(lag_count)
    df.dropna(inplace=True)
    return df


def predictions_from_ticker_dto(ticker_dto):
    x_values = get_latest_ticker_api_data(ticker_dto.tickerName)
    return predictions_from_x_values(ticker_dto, np.array(x_values))


# Pass parameters into models
def predictions_from_x_values(ticker_dto, x_values):
    ticker_name = ticker_dto.tickerName
    model = LOADED_MODELS[ticker_name]
    scaled_x_values = LOADED_X_SCALERS[ticker_name].transform(x_values)
    y_pred = model.predict(np.array(scaled_x_values))
    inverse_scaled_y_pred = LOADED_Y_SCALERS[ticker_name].inverse_transform(y_pred.reshape(-1, 1)).flatten()
    return list(inverse_scaled_y_pred)


'''
MAIN
'''


@app.on_event("startup")
def startup_event():
    # Load files
    load_all_pickle_files(TRAINED_FILES_DIRECTORY, LOADED_MODELS)

    # Scheduler to periodically download source data & execute machine learning
    scheduler = BackgroundScheduler(logger=logger)
    # scheduler.add_job(get_data.main(), 'interval', hours=1)
    scheduler.add_job(ml.execute, 'interval', minutes=1)
    try:
        scheduler.start()
    except (KeyboardInterrupt, SystemExit):
        pass
