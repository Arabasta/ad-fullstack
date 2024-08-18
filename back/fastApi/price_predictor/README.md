# Backend - FastAPI - Price Predictor
_ref: https://fastapi-openapi-markdown-documentation-generator-d96hc549nb58e.streamlit.app/_

---
This backend was originally developed to consume our trained models and scalers from our 
AWS S3 buckets for this FastAPI backend's prediction and backtest APIs. It also required 
Polygon.io API key for non-publicly available 10-minute interval historical ticker price data.

However, for the purpose of submission, this FastAPI backend has been refactored to:
1. Contain source data locally at `/data` - to simulate getting 'live 10-minute interval prices'
2. Read trained models and scalers from `/trained_models` - to simulate reading them from the cloud

The cloud deployment code remains in the main.py, but are commented out.

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
This FastAPI backend is to be consumed by backend Spring application server's PredictionService.
However, if you choose to use these FastAPI APIs separately, the steps are:

1. Ensure you have `Postman Desktop` running.
2. Start the FastAPI server as described above in `Running locally` section.
3. Follow the API section below on how to consume the APIs.

---
## API


### Redirect To Documentation

| Method | URL |
|--------|-----|
| GET | / |


---

### Health

| Method | URL |
|--------|-----|
| GET | /api/v1/health |

---

### By Prediction Dto Backtest

| Method | URL |
|--------|-----|
| POST | /api/v1/predict/ticker/backtest |


##### Request Body
| Field | Type | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Required |
|-------|------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| tickerDTO | object | to pass a TickerDTO object as follows, e.g., :<br/>{ <br/>&nbsp;&nbsp;&nbsp;&nbsp;"tickerType" : "STOCKS",<br/>&nbsp;&nbsp;&nbsp;&nbsp;"tickerName" : "AAPL",<br/>&nbsp;&nbsp;&nbsp;&nbsp;"portfolioType" : "AGGRESSIVE"<br/>}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Required |
| predictions | array | to pass a list of minimally 40 target historical VWAP prices, e.g,: <br/><br/>{<br/>&nbsp;&nbsp;&nbsp;&nbsp;"predictions": ["157.77301098460376", "157.4877472781012", "157.37611008467886", "157.45241548157273", "157.3361943225329", "157.4979730475556", "157.74522510070705", "157.71017539437045", "157.67357419197867", "157.69176900935256", "157.83161522195937", "157.85538132062229", "157.93570650274995", "157.9515740760412", "157.9886689362687", "158.0144096662745", "158.01927572208382", "158.13838830559007", "158.19635784001406", "158.33169060955134", "158.50771488926222", "158.56808219031691", "158.61526177490282", "158.27026547027728", "158.32012491168575", "158.34840445341814", "158.46561292812942", "158.43112740217646", "158.36610561295637", "158.47640287796747", "158.4127915397066", "158.36547091002473", "158.2892360356788", "157.8472007050588", "157.62843976128352", "157.95368975248002", "157.93923263014798", "157.49226072117074", "156.77723260739342"]<br/>} | Required |

##### Response (200)
| Field | Type | Description                                                                         |
|-------|------|-------------------------------------------------------------------------------------|
| tickerDTO | object | Contains tickerType, tickerName, portfolioType                                      |
| predictions | array | List of backtested price predictions based on input list of historical VWAP prices. |

---

### By Ticker Dto Live

| Method | URL |
|--------|-----|
| POST | /api/v1/predict/ticker/live |


##### Request Body
| Field | Type | Description                | Required |
|-------|------|----------------------------|----------|
| tickerType | string | e.g., STOCKS, CRYPTO       | Required |
| tickerName | string | e.g., AAPL, X:BTCUSD       | Required |
| portfolioType | string | e.g., AGGRESSIVE, MODERATE | Optional |

##### Response (200)
| Field | Type | Description                                          |
|-------|------|------------------------------------------------------|
| tickerDTO | object | Contains tickerType, tickerName, portfolioType       |
| predictions | array | List of price predictions of the next 39 data-points |

---

# Machine Learning - Price Predictor

---

## Introduction

This `/machine_learning` directory contains the python `ipynb` used in our [cloud machine 
learning pipeline](https://colab.research.google.com/drive/1C7HLlr5DImSzG13F2qCjgj7ep-AFP8ci?usp=sharing) 
that we developed at Google Colaboratory using Jupyter Notebook and python.

The source data for stocks was retrieved from Polygon API, [Aggregates (Bars)](https://polygon.io/docs/stocks/get_v2_aggs_ticker__stocksticker__range__multiplier___timespan___from___to). For 
ease of development, the source `.json` files were stored in Google Drive, mounted into 
the Google Colaboratory Jupyter notebook.

However, for the purpose of submission, this Machine Learning Pipeline has been refactored
and placed into the `/machine_learning` directory. For your east of testing, the `main.py` 
contains a scheduler which automatically runs the `Price_Predictor_Notebook_Local.py` at 
set intervals of 1 minute. 


---
## Usage (Local - `Price_Predictor_Notebook_Local.py`)

You do not have to explicitly run the python file. However, if you choose to do so:

1. Ensure you have `cd` to `/back/fastApi/price_predictor`.
2. Execute command
```bash
python -m machine_learning.Price_Predictor_Notebook_Local
```
