## Spring Setup

To set up the Spring application for this project, follow the steps below:

### 1. Install JDK 17

Ensure that you have JDK 17 installed on your machine. You can download and install it from the [Oracle website](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html).


### 2. Install Maven

Maven is required to manage the project's dependencies and build the application. You can download and install Maven from the [Apache Maven website](https://maven.apache.org/download.cgi).

To verify Maven installation, run:

```bash
mvn -version
```

### 3. Add Your JWT Secret Key to the Environment Variables
In the project's root directory create a .env file and add the following line
```bash
JWT_SECRET_KEY=your-secret-key
```

### 4. AWS S3 Transactions Bucket Requirement

This project requires an AWS S3 bucket for storing transaction data. Ensure that you have an S3 bucket set up and have 
the necessary access keys and secret access keys to access the bucket. 

In the .env file add the following lines
```bash
AWS_S3_ACCESS_KEY_ID=your-access-key
AWS_S3_SECRET_ACCESS_KEY=your-secret-access-key
AWS_S3_BUCKET_NAME=your-bucket-name
AWS_S3_REGION=Your AWS S3 Region
```

### 5. Polygon
1. Create an account on Polygon.io
2. Subscribe to the Stock and Crypto APIs, minimum starter package is required.
3. Add the following line to the .env file
```bash

POLYGON_API_KEY=your-polygon-api-key
```

### 6. Run
Start the Spring application by running:

```bash
./mvnw spring-boot:run
```

### SES (set to false in application.properties)
Only set to true if you want to use SES

1. Go to the SES dashboard
2. Under Configuration > Identities, click Create Identity
3. Add your Email Address and Domain
4. Verify your email address
5. Click the Get setup button and Request AWS for production access
6. Add your sender email address to the environment variables
7. Set the SES configuration in application.properties to true if you want to use SES
8. Create an access key and secret access key for the IAM user with SES permissions
9. Add the access key and secret access key to the environment variables


## User Registration

This project uses Spring Security with a password encoder, making it necessary to create user accounts 
through API endpoints rather than directly in the database. 


### Creating a Customer Account
To create a customer account, send a POST request to the /api/v1/auth/register endpoint. 
You can use tools like curl, Postman, or the React or React Native front end to send the request.

### Creating an Admin Account
To create an admin account, send a POST request to the /api/v1/dev/admin/create endpoint.


