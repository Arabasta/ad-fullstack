# ref: https://medium.com/analytics-vidhya/fastapi-for-serve-simple-deep-learning-models-step-by-step-d054cf240a4c
from fastapi import FastAPI, Path
from fastapi.responses import RedirectResponse
from typing import Annotated
# import tensorflow as tf
import json
import src.utils as utils
import model  # this is to import the .py model file. Change filepath as needed.

app = FastAPI(docs_url="/documentation", redoc_url=None)

# Constants
# TODO: consider programmatically update file name
PREDICTIONS_JSON_TEXT = "predictions_json.txt"
PARENT_DIRECTORY_PATH = str(utils.get_project_root())
REPO_ROOT_PATH = str(utils.get_repo_root())
# TODO: replace with pulling model from S3 bucket.
# TODO: programmatically set .keras model name.
# MODEL = tf.keras.models.load_model(f'{REPO_ROOT_PATH}/ml/price_predictor/models/SPY-1721708792-model-rmse_14.keras')


@app.get("/")
async def redirect_to_documentation():
    return RedirectResponse("http://localhost:8000/documentation")


@app.get("/train/")
async def train():
    await model.train()
    return {"Message": "Training Started"}


@app.get("/predictions/")
async def predictions():
    # f = open(f'{PREDICTIONS_JSON_TEXT}', "r")
    with open(f'{PARENT_DIRECTORY_PATH}/predictions/{PREDICTIONS_JSON_TEXT}') as f:
        json_data = json.load(f)
    return {"predictions": json_data}  # test implementation with postman


@app.post("/predictions/{ticker}")
async def predictions(ticker: Annotated[str, Path(title="Input TICKER (e.g., SPY) to get predicted prices")],):
    with open(f'{PARENT_DIRECTORY_PATH}/predictions/{ticker.upper()}.txt') as f:
        json_data = json.load(f)
    return {"predictions": json_data}  # test implementation with postman
# to run server: `fastapi run`
