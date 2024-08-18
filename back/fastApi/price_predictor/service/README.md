# get_data.py - Stock Data Aggregator and Uploader (API Data Source + AWS S3 Cloud Storage)

This Python script was used to fetch stock data for S&P 500 companies, processes it, and uploads the data to an S3 bucket. 
The script utilizes the Polygon API for retrieving stock data and AWS SDK (Boto3) for interacting with Amazon S3.

## Prerequisites

Before running the script, ensure you have the following:

1. **Python 3.x** installed on your machine.
2. **Polygon API Key**: Sign up at [Polygon.io](https://polygon.io/) to get your API key.
3. **AWS Credentials**: AWS access key ID, secret access key, and session token with permissions to upload files to the specified S3 bucket.

## Installation

1. Clone the repository or download the script to your local machine.
2. Install the required Python packages using pip:

```sh
pip install requests pandas boto3 polygon pytickersymbols
```
### Notes
1. Ensure that your AWS credentials have the necessary permissions to upload files to the specified S3 bucket.
2. Modify the date range and stock tickers as needed to suit your requirements.

---

# gdown_folder.py - Stock Data Aggregator and Uploader (Google Drive + Local Storage)

To allow running of the project locally, we can only simulate the reading of Data Source from a public storage - 
in this case, we use Google Drive.

The Source Data that were previously downloaded from the Polygon.io API are stored
in a Google Drive folder made public by us: https://drive.google.com/drive/folders/1gCXag6LO5GCEJAyrLhuHH7DRWdoPxkvV.

## Prerequisites

If you have not already done so, you would first need to install all the python dependencies of our FastAPI server.
You can do so by running the following command after you have `cd` into `/back/fastApi/price_predictor`

```sh
pip install -r requirements.txt
```

## Usage

You do not need to specifically run this script. It is automatically ran by `main.py` on schedule.