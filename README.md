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

### Polygon
1. Create an account on Polygon.io
2. Subscribe to the Stock and Crypto APIs, minimum starter package is required.
3. Add your API key to the environment variables

### AWS

#### S3
1. Create a S3 Access Key and Secret Access Key
2. Create a bucket for transactions
3. Add the bucket name and access keys to the spring environment variables

### Spring
1. Install JDK 17
2. Install Maven
3. Add your JWT Secret Key to the environment variables
4. Set the configuration for the database
5. Set the AWS configurations in application.properties to true if you want to use AWS
6. AWS S3 transactions bucket is required for the project to run

### FastAPI
Please refer to /back/fastapi/README.md for instructions on how to run the FastAPI server

### React Native
Please refer to /mobile/react-native-expo/README.md for instructions on how to run the React Native app


## Additional AWS Services (set to false in application.properties)

#### SES
1. Go to the SES dashboard
2. Under Configuration > Identities, click Create Identity
3. Add your Email Address and Domain
4. Verify your email address
5. Click the Get setup button and Request AWS for production access
6. Add your sender email address to the environment variables
7. Set the SES configuration in application.properties to true if you want to use SES
8. Create an access key and secret access key for the IAM user with SES permissions
9. Add the access key and secret access key to the environment variables
