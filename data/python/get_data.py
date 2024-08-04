# import dependencies
import os
import pandas as pd
import boto3

from polygon import RESTClient

from pytickersymbols import PyTickerSymbols

client = RESTClient() # POLYGON_API_KEY is used
s3 = boto3.client('s3',
                  aws_access_key_id = os.getenv('AWS_ACCESS_KEY_ID'),
                  aws_secret_access_key = os.getenv('AWS_SECRET_ACCESS_KEY'),
                  aws_session_token = os.getenv('AWS_SESSION_TOKEN'))

stock_bucket_name = os.getenv('AWS_STOCK_BUCKET_NAME')

stock_data = PyTickerSymbols()
sp500_yahoo_tickers = stock_data.get_sp_500_nyc_yahoo_tickers()

test_tickers = ['AAPL']

''' helper functions '''
def get_data(stock_tickers):
    for stock_ticker in stock_tickers:
        json_file_path = stock_ticker + '.json'

        # 10 minutes daily bars
        dataRequest = client.list_aggs(
            ticker = stock_ticker,
            multiplier = 10,
            timespan = 'minute',
            from_ = '2022-07-23',
            to = '2024-07-24',
            adjusted=True,
            sort='asc',
            limit=50000
        )

        # list of polygon agg objects to DataFrame
        priceData = pd.DataFrame(dataRequest)

        # storing data in JSON format
        priceData.to_json(json_file_path, orient = 'split', compression = 'infer')
        upload_to_S3(json_file_path, stock_bucket_name, json_file_path)

        # reading the JSON file
        #df = pd.read_json(json_file_path, orient ='split', compression = 'infer')
        #print(df)

def upload_to_S3(file_name, bucket_name, object_name):
    with open(file_name, "rb") as f:
        s3.upload_fileobj(f, bucket_name, object_name)

''' Main Program '''
def main():
    get_data(sp500_yahoo_tickers)

if __name__ == '__main__':
    main()