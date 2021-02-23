# How to use some-stocks

This project was created with [Create React App](https://github.com/facebook/create-react-app).\
It uses [Papa parse](https://www.papaparse.com/) for converting csv file data into Json objects.

In the project directory, you can run:

### `npm start`

Which runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

When the app is running you can use it by providing a csv file for the input section.\
The csv file should be formated like [This example file](https://www.nasdaq.com/api/v1/historical/AAPL/stocks/2020-01-20/2021-01-20).\
The file needs to have data for all columns for the app to analyze it.\
Here is an example of the correctly formatted source data:\
“Date, Close/Last, Volume, Open, High, Low\
01/19/2021, $127.83, 90757330, $127.78, $128.71, $126.938”

If the data is in the right format, the app will provide three analytics.\
Maximum amount of days the stock price has risen in the given time range.\
List of the dates in time range ordered by volume and price change per day.\
List of dates in time range ordered by price change compared to 5 days
simple moving average.
