# Backend - FastAPI - Price Predictor
_ref: https://fastapi-openapi-markdown-documentation-generator-d96hc549nb58e.streamlit.app/_

---
## Running locally

1. RECOMMENDED: Create new virtual environment using IDE.
2. In IDE terminal, navigate to `/back/fastApi/price_predictor/` directory
3. Run 
```bash 
pip install --no-cache-dir -r requirements.txt
```
4. Execute command 
```bash 
fastapi run
```

---
## Usage
WIP

---
## API
WIP

---

# Machine Learning - Price Predictor

---

## WIP - Introduction

Contains the python code used to train the machine learning models.

The machine learning was performed on Google Colaboratory using Jupyter Notebook format files in `.ipynb`.

The source data for stocks is retrieved from Polygon API, [Aggregates (Bars)](https://polygon.io/docs/stocks/get_v2_aggs_ticker__stocksticker__range__multiplier___timespan___from___to).

For ease of development, the source `.json` files were stored in Google Drive, mounted into the Google Colaboratory Jupyter notebook.

It is recommended to run the `.ipynb` files in Google Colaboratory, or your own IDE's Jupyter notebook kernel.

---

## WIP - Usage (Google Colaboratory)
1. Open the `.ipynb` files in Google Colaboratory.
2. Ensure you have the stock data `.json` in your Google Drive. These data can be from yahoo finance or polygon api.
3. Ensure you have the AWS related secrets accessible by your notebook (Please contact the team for the AWS secrets).
4. Run the notebook.

---

## WIP - To-do:
- Reading source data from s3 bucket instead of Google Drive.
- Port the `.ipynb` files as `.py` files and include in this directory.
- Include usage instructions to run `.py` files locally.
