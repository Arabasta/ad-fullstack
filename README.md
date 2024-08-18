# FourQuant.ai Team 4

## Note
This readme is for running the project locally. The deployed version of the project has been taken down as our team is using our 
personal AWS accounts, and we do not want to incur any further costs. 

The deployed project was hosted on AWS and used the following services:
- EC2
- S3
- SES
- RDS
- Route53

This version of the project only uses 5 tickers and models for prediction by the FastAPI server. The deployed version of
the project used 502 tickers and models for prediction.

There is no way to emulate S3 locally, please sign up for an AWS account and create a bucket for the trading algorithms transactions
to run the project.

All other AWS services are set to false in the Spring boot application properties file. 
Please set them to true if you want to use them, creating the AWS resources is required for the project to run when set to true.

The polygon API key is required for live stock data to run the project. Please sign up for an account and use the API key to run the project.

## Installation
### Requirements
- JDK 17
- Maven
- AWS
- Polygon API Key (Stock and Crypto)
- Expo
- Node.js
- React Native
- React
- npm
- FastAPI
- Android Studio

### Spring
Please refer to /back/spring/README.md for instructions on how to run the Spring server and 
setup the database

### FastAPI
Please refer to /back/fastapi/README.md for instructions on how to run the FastAPI server

### React Native
Please refer to /mobile/react-native-expo/README.md for instructions on how to run the React Native app
