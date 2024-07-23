# ref: https://medium.com/analytics-vidhya/fastapi-for-serve-simple-deep-learning-models-step-by-step-d054cf240a4c
from fastapi import FastAPI, Path
from fastapi.responses import RedirectResponse
from typing import Annotated
import json
import src.utils as utils

app = FastAPI(docs_url="/documentation", redoc_url=None)

# Constants
CONSOLIDATED_PREDICTIONS = "consolidated.txt"
PARENT_DIRECTORY_PATH = str(utils.get_project_root())
REPO_ROOT_PATH = str(utils.get_repo_root())


@app.get("/")
async def redirect_to_documentation():
    return RedirectResponse("http://localhost:8000/documentation")


@app.get("/api/predictions/")
async def predictions():
    with open(f'{PARENT_DIRECTORY_PATH}/predictions/{CONSOLIDATED_PREDICTIONS}') as f:
        json_data = json.load(f)
    return {"predictions": json_data}


@app.post("/api/predictions/{ticker}")
async def predictions(ticker: Annotated[str, Path(title="Input TICKER (e.g., SPY) to get predicted prices")],):
    with open(f'{PARENT_DIRECTORY_PATH}/predictions/{ticker.upper()}.txt') as f:
        json_data = json.load(f)
    return {"predictions": json_data}
