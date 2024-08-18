# FourQuant.ai Team 4

## Note
This readme is for running the project locally. The deployed version of the project has been taken down as our team is using our 
personal AWS accounts and we do not want to incur any further costs. 

The deployed project was hosted on AWS and used the following services:
- EC2
- S3
- SES
- RDS
- Route53

This version of the project only uses 5 tickers and models for prediction by the FastAPI server. The deployed version of
the project used 502 tickers and models for prediction.

There is no way to emulate S3 and SES locally, please sign up for an AWS account and use the services to run the project.

The polygon API key is required for live stock data to run the project. Please sign up for an account and use the API key to run the project.

## Installation
### Requirements
- JDK 17
- Maven
- AWS
- Polygon API Key (Stock and Crypto)
- Expo
- React Native
- React
- npm
- FastAPI

### Polygon
1. Create an account on Polygon.io
2. Subscribe to the Stock and Crypto APIs
3. Add your API key to the environment variables

### AWS

#### Access Keys
1. Create a S3 Access Key and Secret Access Key
2. Create an SES Access Key and Secret Access Key
3. Add the access keys to the environment variables

#### S3
1. Create a bucket for transactions
2. Create a bucket for predictions
3. Create a bucket for models
4. Add the bucket names to the environment variables

#### SES
1. Go to the SES dashboard
2. Under Configuration > Identities, click Create Identity
3. Add your Email Address and Domain
4. Verify your email address
5. Click the Get setup button and Request AWS for production access
6. Add your sender email address to the environment variables

### Spring
1. Install JDK 17
2. Install Maven
3. Add your JWT Secret Key to the environment variables
4. Set the configuration for the database
5. Set the AWS configurations to false if you do not want to use AWS

### FastAPI
Please refer to /back/fastapi/README.md for instructions on how to run the FastAPI server

### Environment Variables

POLYGON_API_KEY=Your Polygon API Key

JWT_SECRET_KEY=Your JWT Secret Key

AWS_S3_ACCESS_KEY_ID=Your AWS S3 Access Key

AWS_S3_SECRET_ACCESS_KEY=Your AWS S3 Secret Access Key

AWS_S3_REGION=Your AWS S3 Region

AWS_S3_TRANSACTION_BUCKET_NAME=Your AWS S3 Transaction Bucket Name

AWS_S3_PREDICTION_BUCKET_NAMe=Your AWS S3 Prediction Bucket Name

AWS_S3_MODEL_BUCKET_NAME=Your AWS S3 Model Bucket Name

AWS_SES_ACCESS_KEY_ID=Your AWS SES Access Key

AWS_SES_SECRET_ACCESS_KEY= Your AWS SES Secret Access Key

AWS_SES_REGION=Your AWS SES Region

AWS_SES_SENDER_EMAIL=Your AWS SES Sender Email

BACK_FASTAPI_URL=http://localhost:8000

API_BACK_FASTAPI_PREDICT_TICKER_BACKTEST=/api/v1/predict/ticker/backtest

API_BACK_FASTAPI_PREDICT_TICKER_LIVE=/api/v1/predict/ticker/live

POLYGON_API_BASE_URL=https://api.polygon.io

