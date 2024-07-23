# ref: https://medium.com/analytics-vidhya/fastapi-for-serve-simple-deep-learning-models-step-by-step-d054cf240a4c
import tensorflow as tf
import numpy as np
from fastapi import FastAPI
import pathlib
from src.utils import get_project_root
from src.utils import get_repo_root
import model # this is to import the .py model file. Change filepath as needed.
import json


# ref: https://stackoverflow.com/a/47626762/23332444
class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return super().default(obj)


app = FastAPI()

PARENT_DIRECTORY_PATH = str(get_project_root())
REPO_DIRECTORY_PATH = str(get_repo_root())

# TODO: replace with pulling model from S3 bucket.
# TODO: programmatically set .keras model name.
MODEL = tf.keras.models.load_model(f'{REPO_DIRECTORY_PATH}/ml/price_predictor/models/SPY-1721708792-model-rmse_14.keras')

predictions = []


@app.get("/train/")
async def train():
    predictions.append(model.main())
    return {"Message": "Training Completed"}


@app.get("/")
async def index():
    return {"Message": "Hello World"}


@app.post("/predict/")
async def predict():
    return {"prediction": json.dumps(predictions, cls=NumpyEncoder)}  # test implementation with postman

# to run server: `fastapi run`
