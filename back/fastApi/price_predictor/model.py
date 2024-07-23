# Original file is located at https://colab.research.google.com/drive/19SELttKfrgxTbk92fajE13qT93tZPbBT
import math
import json
from datetime import timedelta
from time import time
# import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import tensorflow as tf
from sklearn.preprocessing import MinMaxScaler
import src.utils as util


output_predictions = []


def predictions():
    return output_predictions


def main():
    """# Data Preprocessing"""
    PARENT_DIRECTORY_PATH = str(util.get_project_root())
    REPO_ROOT_PATH = str(util.get_repo_root())
    PREDICTIONS_JSON_TEXT = "predictions_json.txt"
    STOCK_NAME = 'SPY'

    # read from local file
    df = pd.read_csv(f'{PARENT_DIRECTORY_PATH}/{STOCK_NAME}.csv', index_col='Date', parse_dates=True, dayfirst=True)

    # # read from yahoo finance
    # df = pd.DataFrame([yf.Ticker(STOCK_NAME).info])
    print(df.tail())

    df_trim = df.loc[:, ['Adj Close']]
    # Plot data
    # df_trim.plot(
    #     title='SPDR S&P 500 ETF Trust (SPY)',
    #     ylabel='Adj Close Price ($)',
    #     xlabel='Date'
    # )

    """# Trial
    Ref: https://stackoverflow.com/questions/65237843/predicting-stock-price-x-days-into-the-future-using-python-machine-learning
    """

    #Create a new dataframe with only the 'Adj Close' column
    data = df.filter(['Adj Close'])

    #Convert the dataframe to a numpy array
    dataset = data.values
    #Get the number of rows to train the model on
    training_data_len = math.ceil(len(dataset) * 0.8)
    print("training_data_len: ",training_data_len)

    #Scale the data
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(dataset)
    print("scaled_data: ",scaled_data)

    #Create the training data set
    #Create the scaled training data set
    train_data = scaled_data[0:training_data_len, :]
    #Split the data into x_train and y_train data sets
    x_train = []
    y_train = []
    #We create a loop
    for i in range(60, len(train_data)):
        x_train.append(train_data[i - 60:i, 0])  #Will contain 60 values (0-59)
        y_train.append(train_data[i, 0])  #Will contain the 61th value (60)
        if i <= 60:
            print(x_train)
            print(y_train)
            print()

    #Convert the x_train and y_train to numpy arrays
    x_train, y_train = np.array(x_train), np.array(y_train)

    #Reshape the data
    x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))
    print("x_train.shape: ",x_train.shape)

    #Build the LSTM model
    model = tf.keras.Sequential()
    model.add(tf.keras.layers.LSTM(50, return_sequences=True, input_shape=(x_train.shape[1], 1)))
    model.add(tf.keras.layers.LSTM(50, return_sequences=False))
    model.add(tf.keras.layers.Dense(25))
    model.add(tf.keras.layers.Dense(1))

    #Compile the model
    model.compile(optimizer='adam', loss='mean_squared_error')

    #Train the model
    model.fit(x_train, y_train, batch_size=1, epochs=1)

    #Create the testing data set
    #Create a new array containing scaled values
    test_data = scaled_data[training_data_len - 60:]
    #Create the data set x_test and y_test
    x_test = []
    y_test = dataset[training_data_len:, :]
    for i in range(60, len(test_data)):
        x_test.append(test_data[i - 60:i, 0])

    #Convert the data to a numpy array
    x_test = np.array(x_test)

    #Reshape the data
    x_test = np.reshape(x_test, (x_test.shape[0], x_test.shape[1], 1))

    #Get the model's predicted price values for the x_test data set
    predictions = model.predict(x_test)
    predictions = scaler.inverse_transform(predictions)

    #Evaluate model (get the root mean quared error (RMSE))
    rmse = np.sqrt(np.mean(predictions - y_test) ** 2)
    print("rmse: ",rmse)

    #Plot the data
    # train = data[:training_data_len]
    # valid = data[training_data_len:]
    # valid['Predictions'] = predictions
    # #Visualize the data
    # plt.figure(figsize=(16, 8))
    # plt.title('Model', fontsize=18)
    # plt.xlabel('Date', fontsize=18)
    # plt.ylabel('Adj Close ($)', fontsize=18)
    # plt.plot(train['Adj Close'])
    # plt.plot(valid[['Adj Close', 'Predictions']])
    # plt.legend(['Train', 'Validation', 'Predictions'], loc='lower right', fontsize=18)
    # plt.show()

    X_FUTURE = 100
    predictions = np.array([])
    last = x_test[-1]
    for i in range(X_FUTURE):
        curr_prediction = model.predict(np.array([last]))
        print(curr_prediction, i, '/', X_FUTURE)
        last = np.concatenate([last[1:], curr_prediction])
        predictions = np.concatenate([predictions, curr_prediction[0]])
    predictions = scaler.inverse_transform([predictions])[0]
    print("predictions: ", predictions)

    # dicts = []
    # curr_date = data.index[-1]
    # for i in range(X_FUTURE):
    #     curr_date = curr_date + timedelta(days=1)
    #     dicts.append({'Predictions': predictions[i], "Date": curr_date})

    # new_data = pd.DataFrame(dicts).set_index("Date")

    #Plot the data
    # train = data
    # #Visualize the data
    # plt.figure(figsize=(16, 8))
    # plt.title('Model')
    # plt.xlabel('Date', fontsize=18)
    # plt.ylabel('Adj Close ($)', fontsize=18)
    # plt.plot(train['Adj Close'])
    # plt.plot(new_data['Predictions'])
    # plt.legend(['Train', 'Predictions'], loc='lower right')
    # plt.show()

    # # uncomment to save currently trained model as .keras file in colab folder
    # # filename: [timestamp]_[model]_[model_accuracy]
    linux_timestamp = int(time())  # linux timestamp
    model.save(f'{REPO_ROOT_PATH}/ml/price_predictor/models/{STOCK_NAME}-{linux_timestamp}-model-rmse_{rmse:.0f}.keras')

    f = open(f'{REPO_ROOT_PATH}/back/fastApi/price_predictor/{PREDICTIONS_JSON_TEXT}', "w")
    output = {
        STOCK_NAME: {
        },
    }
    curr_date = data.index[-1]
    for i in range(len(predictions)):
        curr_date = curr_date + timedelta(days=1)
        output[STOCK_NAME].update({
            str(curr_date)[:10]: {
                "adj_close": predictions[i]
            },
        })
    f.write(json.dumps(output, cls=util.NumpyEncoder))
