# Stock Data Aggregator and Uploader

This Python script fetches stock data for S&P 500 companies, processes it, and uploads the data to an S3 bucket. 
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