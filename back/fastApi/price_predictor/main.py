# ref: https://medium.com/analytics-vidhya/fastapi-for-serve-simple-deep-learning-models-step-by-step-d054cf240a4c
from fastapi import FastAPI
# import tensorflow as tf
import json
import src.utils as util
import model  # this is to import the .py model file. Change filepath as needed.

app = FastAPI()

# Constants
# TODO: consider programmatically update file name
PREDICTIONS_JSON_TEXT = "predictions_json.txt"
PARENT_DIRECTORY_PATH = str(util.get_project_root())
REPO_ROOT_PATH = str(util.get_repo_root())
# TODO: replace with pulling model from S3 bucket.
# TODO: programmatically set .keras model name.
# MODEL = tf.keras.models.load_model(f'{REPO_ROOT_PATH}/ml/price_predictor/models/SPY-1721708792-model-rmse_14.keras')


@app.get("/train/")
async def train():
    model.main()
    return {"Message": "Training Completed"}


@app.get("/")
async def index():
    return {"Message": "Hello World"}


@app.get("/predictions/")
async def predictions():
    # f = open(f'{PREDICTIONS_JSON_TEXT}', "r")
    with open(f'{PREDICTIONS_JSON_TEXT}') as f:
        json_data = json.load(f)
    return {"predictions": json_data}  # test implementation with postman

# to run server: `fastapi run`
