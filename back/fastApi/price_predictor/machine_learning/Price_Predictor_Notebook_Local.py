# -*- coding: utf-8 -*-
"""Price_Predictor-Template2.ipynb
Adapted from Original file located at
    https://colab.research.google.com/drive/1Jd_uJuBVfpCCvEq03fhcq5udfwlGyT9a
# 1. Setup
## 1.1 Imports"""
import json
import numpy as np
import pandas as pd
import logging
from pathlib import Path

# Download files
import os, re, sys, time
import requests

# Data Preprocessing
from sklearn.preprocessing import RobustScaler

# Regression Models
from sklearn.linear_model import LinearRegression
from sklearn.linear_model import ElasticNet

# Evaluation
from sklearn.metrics import mean_absolute_error

# Prediction
from sklearn.base import clone

# Serialization
import pickle

# # AWS SDK
# import boto3


def get_project_root() -> Path:
    return Path(__file__).parent.parent


def get_repo_root() -> Path:
    return Path(__file__).parent.parent.parent.parent.parent


"""## 1.2 Download Files from Cloud (Google Drive) to access JSON saved there."""

"""## 1.3 Constants"""
# PATHS
PARENT_DIRECTORY_PATH = str(get_project_root())
REPO_ROOT_PATH = str(get_repo_root())
DOWNLOAD_DIRECTORY = PARENT_DIRECTORY_PATH + '/sample_local_data'
TRAINED_FILES_DIRECTORY = PARENT_DIRECTORY_PATH + '/sample_local_trained_files'

"""# 2. Data Preprocessing"""

# Number of 10-min intervals: 6/hour, 39/day, 195/week(5days), 819/month(21days), 2457/quarter(63days), 9828(84days).
WINDOW_DATAPOINTS_QUANTITY = 819  # Datapoints in total.
FUTURE_DATAPOINTS_QUANTITY = 39  # Datapoints for test.

"""## 2.1 Read JSON from Google Drive, use as Dataframe"""

# Data Preprocessing Variables - for ticker data extracted from polygon API.
UNWANTED_FEATURES = ['open', 'high', 'low', 'volume', 'otc', 'timestamp', 'transactions']


def json_to_dataframes(source_directory):
    all_data = []
    combined_df = pd.DataFrame()

    # Iterate over all files in the source directory
    for filename in os.listdir(source_directory):

        filepath = os.path.join(source_directory, filename)
        # Check if the file is not empty
        if os.path.getsize(filepath) <= 0:
            print(f"Skipping empty file {filename}")
            continue

        ticker = filename.split(".")[0]
        try:
            # Open and read the json file
            with open(filepath, 'r') as file:
                data_dict = json.load(file)

            # Create a DataFrame from the JSON data
            current_df = pd.DataFrame(data=data_dict['data'],
                                      columns=data_dict['columns'],
                                      index=data_dict['index'])

            current_df.columns = current_df.columns.str.replace(' ', '')
            if current_df.shape[0] <= WINDOW_DATAPOINTS_QUANTITY:
                print(
                    f'Excluded {ticker}. Has {current_df.shape[0]} samples when {WINDOW_DATAPOINTS_QUANTITY} is required.')
                continue
            current_df['ticker'] = ticker  # Add ticker column for MultiIndex
            current_df.drop(labels=UNWANTED_FEATURES, axis=1, inplace=True)
            all_data.append(current_df[-(WINDOW_DATAPOINTS_QUANTITY + FUTURE_DATAPOINTS_QUANTITY):])

        except (json.JSONDecodeError, KeyError) as e:
            print(f"Error processing file {filename}: {e}")

        # Concatenate all DataFrames into a single MultiIndex DataFrame
        if all_data:
            combined_df = pd.concat(all_data)
            combined_df.reset_index(inplace=True)
            combined_df.set_index(['ticker', 'index'], inplace=True)
        else:
            combined_df = pd.DataFrame()  # Return an empty DataFrame if no data is collected

    return combined_df


"""## 2.2 Feature Engineering"""

"""### 2.2.1 Separate by S&P sectors"""

# possible enhancement:
# ticker_sectors = pd.read_csv('https://github.com/datasets/s-and-p-500-companies/raw/main/data/constituents.csv')

"""### 2.2.2 Lag Data as Features"""

# Volume Weighted Average Price (VWAP) is the average price of a ticker weighted by the total trading volume.
FEATURES = ['vwap']
LABEL = ['close']


def add_lagged_features(df_main, label, features, future_window):
    all_lagged_data = []

    # gets pandas dataframe's Index object e.g., Index(['AAPL', 'NVDA', ...])
    tickers = df_main.index.get_level_values('ticker').unique()

    # list of columns used to create lags
    for ticker in tickers:
        # Select the data for the current ticker
        df = df_main.loc[ticker].copy()

        # Create lagged features for the past N periods
        for lag in range(1, future_window):
            df[f'lag_vwap_{lag}'] = df['vwap'].shift(lag)

        # Drop rows with NaN values created by the lagged features
        df.dropna(inplace=True)

        # Reintroduce the ticker column for concatenation later
        df['ticker'] = ticker
        all_lagged_data.append(df)

    # Use only lagging close prices as Feature columns
    if len(FEATURES) == 1:
        for i in range(1, future_window):
            FEATURES.append(f'lag_vwap_{i}')

    # Concatenate all lagged DataFrames into a single MultiIndex DataFrame
    if all_lagged_data:
        combined_lagged_df = pd.concat(all_lagged_data)
        combined_lagged_df.reset_index(inplace=True)
        combined_lagged_df.set_index(['ticker', 'index'], inplace=True)
    else:
        combined_lagged_df = pd.DataFrame()  # Return an empty DataFrame if no data is collected

    return combined_lagged_df


"""### 2.2.3 Feature Selection"""

# possible enhancement: With Feature Selection, we will be able to introduce more features in above sections,
# before choosing the most significant ones.


"""## 2.3 Train-Test Split and Scale"""


# Split dataset
def train_test_split_scale(df, features, label, future_datapoints):
    train_data = []
    test_data = []

    tickers = df.index.get_level_values('ticker').unique()

    for ticker in tickers:
        ticker_df = df.loc[ticker]
        train_df = ticker_df[:-2 * future_datapoints].copy()
        test_df = ticker_df[-2 * future_datapoints:].copy()

        # Reintroduce the ticker column for concatenation later
        train_df['ticker'] = ticker
        test_df['ticker'] = ticker

        train_data.append(train_df)
        test_data.append(test_df)

    # Concatenate train and test data into separate MultiIndex DataFrames
    train_data = pd.concat(train_data)
    test_data = pd.concat(test_data)

    # Reset and set index to handle concatenation properly
    train_data.reset_index(inplace=True, drop=False)
    train_data.set_index(['ticker', 'index'], inplace=True)
    test_data.reset_index(inplace=True, drop=False)
    test_data.set_index(['ticker', 'index'], inplace=True)

    # Split into features and labels
    X_train = train_data[features].astype(float)
    y_train = train_data[label].astype(float)
    X_test = test_data[features].astype(float)
    y_test = test_data[label].astype(float)

    for ticker in tickers:
        row_labels = pd.IndexSlice[ticker, :]

        # Apply RobustScaler to the features. Fitted scalers are stored for later sections.
        dictionary_X_train_scaler[ticker] = RobustScaler().fit(X_train.loc[row_labels])
        dictionary_X_test_scaler[ticker] = RobustScaler().fit(X_test.loc[row_labels])
        dictionary_y_train_scaler[ticker] = RobustScaler().fit(y_train.loc[row_labels])
        dictionary_y_test_scaler[ticker] = RobustScaler().fit(y_test.loc[row_labels])

        X_train.loc[row_labels] = dictionary_X_train_scaler[ticker].transform(X_train.loc[row_labels])
        X_test.loc[row_labels] = dictionary_X_test_scaler[ticker].transform(X_test.loc[row_labels])
        y_train.loc[row_labels] = dictionary_y_train_scaler[ticker].transform(y_train.loc[row_labels])
        y_test.loc[row_labels] = dictionary_y_test_scaler[ticker].transform(y_test.loc[row_labels])

        print(
            f'{ticker} - X_train {X_train.shape} - X_test {X_test.shape} - y_train {y_train.shape} - y_test {y_test.shape}')
    return X_train, X_test, y_train, y_test


# Hold fitted scalers to inverse scaling after predictions later
dictionary_X_train_scaler = {}
dictionary_X_test_scaler = {}
dictionary_y_train_scaler = {}
dictionary_y_test_scaler = {}

"""# 3. Modular Sklearn Models

Using sklearn's Models' .predict method in `Train and Evaluate` and `Predict` sections later.

Thus, the models used here should be available in Sklearn.

## 3.1 Models
"""

# To hold multiple Keras Model objects across notebook so they can be iterated:
models_names = []
trained_models = {}  # key: ticker, value: trained Model object

# Set and append to models[]. e.g., models = [LinearRegression(), Model2(), Model3(), etc.]
models = [
    LinearRegression(),
    ElasticNet(alpha=0.2, l1_ratio=0.2)
]

for i, individual_model in enumerate(models):
    model_name = str(individual_model).split("(")[0]
    if model_name not in models_names:
        models_names.append(model_name)

print(models_names)

"""# 4. Train, Evaluate, Predict"""

# Predictions
predictions_close_price_dictionary = {}  # key: ticker, value: prediction ('close' price)

"""## 4.1 Functions

### 4.1.1 Plot
"""

# def plot_predictions(ticker, model_name, y_train, y_test, y_pred, mae, future_y_pred):
#     fig, axs = plt.subplots(1, 1, layout='constrained')
#     axs.plot(range(len(y_train) - FUTURE_DATAPOINTS_QUANTITY), y_train[FUTURE_DATAPOINTS_QUANTITY:], color='blue')
#     axs.plot(range(len(y_train) - FUTURE_DATAPOINTS_QUANTITY, len(y_train) + len(y_test) - FUTURE_DATAPOINTS_QUANTITY),
#              y_test, color='green')
#     axs.plot(range(len(y_train) - FUTURE_DATAPOINTS_QUANTITY, len(y_train) + len(y_pred) - FUTURE_DATAPOINTS_QUANTITY),
#              y_pred, color='red')
#     plt.plot(range(len(y_train) + len(y_test) - FUTURE_DATAPOINTS_QUANTITY,
#                    len(y_train) + len(y_test) + len(future_y_pred) - FUTURE_DATAPOINTS_QUANTITY), future_y_pred,
#              color='black')
#     axs.set_title(f'{ticker}: {model_name} - MAE: {mae:.2f}')
#     axs.set_xlabel('Period')
#     axs.set_ylabel('$USD')
#
#     plt.show()
#     return


"""### 4.1.2 Train and Predict"""


# Train, evaluate, and output a fitted model, R2 score, and rmse.
def individual_model_train_predict(ticker, model_name, model, X_train, X_test, y_train):
    model_fitted = model.fit(X=X_train,
                             y=y_train)
    y_pred = model_fitted.predict(X_test)
    return model_fitted, y_pred


"""### 4.1.3 Loss Function
possible enhancement: to explore using Mean absolute scaled error
"""


def calculate_mae(y_true, y_pred):
    """
    Compute mean absolute error (MAE)
    """
    y_true, y_pred = np.array(y_true), np.array(y_pred)
    return mean_absolute_error(y_true, y_pred)


"""### 4.1.4 Prepare future datapoints for  predictions"""


def data_to_supervised_learning(X_test, X_train, n_in, n_out=1, dropnan=True):
    X_train = X_train[n_in:]
    X_future = pd.concat([X_train, X_test], axis=0)
    return X_future.values[-FUTURE_DATAPOINTS_QUANTITY:]


"""## 4.2 Iterate through Functions"""


# Iterate through models[], train and evaluate them.
def all_models_train_and_evaluate(models, df_X_train, df_X_test,
                                  df_y_train, df_y_test):
    # Check dictionary lengths before continuing
    if ((df_X_train.shape[0] != df_y_train.shape[0])
            or (df_X_test.shape[0] != df_y_test.shape[0])
    ):
        raise Exception(f"Please make sure all dataframe lengths are equal.")

    tickers = df_X_train.index.get_level_values('ticker').unique()

    # Initialise variables
    for ticker in tickers:
        row_labels = pd.IndexSlice[ticker, :]
        local_X_train = df_X_train.loc[row_labels].values
        local_X_test = df_X_test.loc[row_labels].values[:-FUTURE_DATAPOINTS_QUANTITY]
        local_y_train = df_y_train.loc[row_labels].values.ravel()
        local_y_test = df_y_test.loc[row_labels].values.ravel()[:-FUTURE_DATAPOINTS_QUANTITY]

        lowest_mae = 9999999
        best_model_fitted = None

        # Iterate through models and perform train, test, validate.
        for model in models:
            local_model = clone(model)
            local_model_name = str(local_model).split("(")[0]
            model_fitted, y_pred = individual_model_train_predict(ticker, local_model_name, local_model,
                                                                  local_X_train, local_X_test, local_y_train)
            mae = calculate_mae(y_true=dictionary_y_test_scaler[ticker].inverse_transform(local_y_test.reshape(-1, 1)),
                                y_pred=dictionary_y_test_scaler[ticker].inverse_transform(y_pred.reshape(-1, 1)))
            # Validation: Use model that gives lowest MAE
            if mae < lowest_mae:
                lowest_mae = mae
                best_model_fitted = model_fitted

        # prepare future_x and predict future_y_pred
        future_X = data_to_supervised_learning(df_X_test.loc[row_labels], df_X_train.loc[row_labels],
                                               FUTURE_DATAPOINTS_QUANTITY, 1)
        print(future_X.shape)
        future_y_pred = best_model_fitted.predict(future_X)

        # inverse scaling
        df_dictionary_X_train_scale_inversed[ticker] = dictionary_X_train_scaler[ticker].inverse_transform(
            local_X_train)
        df_dictionary_X_test_scale_inversed[ticker] = dictionary_X_test_scaler[ticker].inverse_transform(local_X_test)
        df_dictionary_y_train_scale_inversed[ticker] = dictionary_y_train_scaler[ticker].inverse_transform(
            local_y_train.reshape(-1, 1))
        df_dictionary_y_test_scale_inversed[ticker] = dictionary_y_test_scaler[ticker].inverse_transform(
            local_y_test.reshape(-1, 1))
        y_pred = dictionary_y_test_scaler[ticker].inverse_transform(y_pred.reshape(-1, 1))
        future_X = dictionary_X_test_scaler[ticker].inverse_transform(future_X)
        future_y_pred = dictionary_y_test_scaler[ticker].inverse_transform(future_y_pred.reshape(-1, 1))

        best_model_fitted_name = str(best_model_fitted).split("(")[0]
        # if i < 2: # for sample visualisation
        print(f'''\nModel: {best_model_fitted_name}
        Ticker: {ticker}
        Mean Absolute Error: {lowest_mae}''')
        # plot_predictions(ticker, best_model_fitted_name, df_dictionary_y_train_scale_inversed[ticker],
        #                  df_dictionary_y_test_scale_inversed[ticker], y_pred, lowest_mae, future_y_pred)

        # Store fitted model
        trained_models[ticker] = best_model_fitted
        # Store predictions
        predictions_close_price_dictionary[ticker] = np.round(future_y_pred.flatten(), 2)


df_dictionary_X_train_scale_inversed = {}
df_dictionary_X_test_scale_inversed = {}
df_dictionary_y_train_scale_inversed = {}
df_dictionary_y_test_scale_inversed = {}

"""# 5. Prediction Post-processing

## 5.1 Functions

### 5.1.1 Save as local files (.pkl)
"""


def save_as_local_file(ticker):
    model = trained_models[ticker]
    model_name = str(model).split("(")[0]

    if model_name in models_names:
        # save trained models
        with open(f'{TRAINED_FILES_DIRECTORY}/model/{ticker}.pkl', 'wb') as f:
            pickle.dump(model, f)  # serialize the object

        # save x_test_scaler
        with open(f'{TRAINED_FILES_DIRECTORY}/x_scaler/{ticker}.pkl', 'wb') as f:
            pickle.dump(dictionary_X_test_scaler[ticker], f)  # serialize the object

        # save y_test_scaler
        with open(f'{TRAINED_FILES_DIRECTORY}/y_scaler/{ticker}.pkl', 'wb') as f:
            pickle.dump(dictionary_y_test_scaler[ticker], f)  # serialize the object

    else:
        raise Exception(f"Please implement saving of {ticker}'s model: {model_name}.")

    print(f'Saved {ticker} model, x_scaler, y_scaler')
    return


"""### 5.1.2 Upload to S3 Bucket"""


# def upload_to_s3(s3, ticker, model_name, prefix):
#     models_bucket_name = "fourquant-robotrader-models"
#     # Upload to S3 bucket
#     with open(f'/content/drive/MyDrive/Colab Notebooks/RoboTrader-Models/{prefix}/{ticker}.pkl', "rb") as f:
#         s3.upload_fileobj(f, models_bucket_name, f'{prefix}/{ticker}.pkl')
#         print(f'Uploaded {prefix}/{ticker}.pkl')
#
#     return


"""### 5.1.4 Iterate through all tickers"""


# predictions_coef_dictionary[ticker] = [[-5.90832260e-01  5.43316834e-01  ...]]
def combine_predictions_to_dictionary():
    # Add ticker, predicted close prices to dictionary
    for i, ticker in enumerate(trained_models):
        output_dictionary = {}

        model_name = str(trained_models[ticker]).split("(")[0]
        index = list(range(len(predictions_close_price_dictionary[ticker]))),  # generates ([0, 1, ... n],)

        # JSON output format
        if model_name == "LinearRegression" or model_name == "ElasticNet":
            output_dictionary[ticker] = {
                "tickerName": ticker,
                "predictions": predictions_close_price_dictionary[ticker]
            }

        else:
            raise Exception(f"Please ensure loop checks for {model_name} and outputs its JSON.")

        # save_dictionary_as_json(ticker, output_dictionary)
        save_as_local_file(ticker)
        print(f'{i+1} / {len(trained_models)}')


"""### Execute"""


def execute():
    logger = logging.getLogger('uvicorn')
    logger.info('ML - 1/7 - Start')

    # Load JSON to global MultiIndex Dataframe
    df_raw = json_to_dataframes(DOWNLOAD_DIRECTORY)
    logger.info('ML - 2/7 - Load Dataframes Complete')

    df_feature_engineered = add_lagged_features(df_raw, LABEL, FEATURES, FUTURE_DATAPOINTS_QUANTITY)
    logger.info('ML - 3/7 - Feature Engineer Complete')

    df_X_train, df_X_test, df_y_train, df_y_test = train_test_split_scale(df_feature_engineered, FEATURES, LABEL,
                                                                          FUTURE_DATAPOINTS_QUANTITY)
    logger.info('ML - 4/7 - Train-Test-Split and Scale Complete')

    all_models_train_and_evaluate(models, df_X_train, df_X_test, df_y_train, df_y_test)
    logger.info('ML - 5/7 - Model Training and Evaluate - Complete')

    combine_predictions_to_dictionary()
    logger.info('ML - 6/7 - Save Models, X_Scalers, Y_Scalers - Complete')

    logger.info('ML - 7/7 - Pipeline Complete. Pending next cycle of ML Pipeline according to set interval.')


if __name__ == "__main__":
    execute()
