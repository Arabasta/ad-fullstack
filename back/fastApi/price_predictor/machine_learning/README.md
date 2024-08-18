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
