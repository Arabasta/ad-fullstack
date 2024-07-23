# FastAPI Backend - ML Models
_ref: https://fastapi-openapi-markdown-documentation-generator-d96hc549nb58e.streamlit.app/_

## Running locally

1. Navigate to `/back/fastApi/price_predictor/` directory
2. Run `pip install --no-cache-dir -r requirements.txt`
3. Execute command `fastapi run`

## Usage

Send GET or POST requests to the api at `http://{HOST_IP_ADDRESS}:8000/api/{API_METHOD}` (or ip  host).

1. GET http://localhost:8000/documentation
2. GET http://localhost:8000/api/train
3. GET http://localhost:8000/api/predictions
4. POST http://localhost:8000/api/predictions/{ticker}

---
## API

### 1. Redirect To Documentation

| Method | URL |
|--------|-----|
| GET | / |

#### Parameters
None

---

### 2. Train

| Method | URL |
|--------|-----|
| GET | /train/ |

#### Parameters
None

---

### 3. Predictions

| Method | URL                   |
|--------|-----------------------|
| GET | /predictions/         |
| POST | /predictions/{ticker} |

#### GET Parameters
None

#### POST Parameters
| Name | In | Description           | Required |
|------|----|-----------------------|----------|
| ticker | path | Ticker name, e.g, SPY | Required |

---
