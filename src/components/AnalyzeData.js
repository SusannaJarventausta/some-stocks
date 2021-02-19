import React, {useState, useEffect} from 'react';
import '../styles.css';
import OpeningPrice from './OpeningPrice';
import UpwardTrend from './UpwardTrend';
import VolumeAndPriceChange from './VolumeAndPriceChange';
import * as Papa from 'papaparse';
import * as moment from 'moment';

export default function AnalyzeData(props) {
  const [stockFile, setStockFile] = useState('');
  const [stockData, setStockData] = useState([]);
  const [stockDataTimeRange, setStockDataTimeRange] = useState([]);

  function updateStockFile(file) {
    setStockFile(file);
  }

  function updateStockData(data) {
    setStockData(data);
    //This one should be used to set right array to timerange array according to datepickers
  }

  function updateStockDataTimeRange(dataInRange) {
    setStockDataTimeRange(dataInRange);
  }

  function stringToDate(string) {
    let date = moment(string, 'MM/DD/YYYY').toDate();
    return date;
  }

  function removeDollar(string) {
    let amount = string.substring(1);
    amount = parseFloat(amount);
    return amount;
  }

  function compareDates(a, b) {
    if (a.Date < b.Date) {
      return -1;
    }
    if (a.Date > b.Date) {
      return 1;
    }
    return 0;
  }

  function sortArray(array) {
    array.sort(compareDates);
    return array;
  }

  function parseJSON(jsonObject) {
    let tempArray = [];
    let index = 0;

    for (let element of jsonObject) {
      if (element.Date !== '') {
        let date = stringToDate(element.Date);
        let volume = parseInt(element.Volume, 10);
        let closeLast = removeDollar(element['Close/Last']);
        let open = removeDollar(element.Open);
        let high = removeDollar(element.High);
        let low = removeDollar(element.Low);

        tempArray.push({
          Id: index,
          Date: date,
          CloseLast: closeLast,
          Volume: volume,
          Open: open,
          High: high,
          Low: low,
        });
        index = index + 1;
      }
    }
    updateStockData(sortArray(tempArray));
    updateStockDataTimeRange(sortArray(tempArray));
  }

  function parseFile(e) {
    Papa.parse(e.target.files[0], {
      header: true,
      delimiter: ', ',
      complete: function (results) {
        parseJSON(results.data);
      },
    });
  }

  function onStockFileChange(e) {
    updateStockFile(e.target.files[0]);
    parseFile(e);
  }

  if (stockDataTimeRange == [] || stockDataTimeRange == '') {
    return (
      <div className="AnalyzeData">
        <input type="file" accept=".csv" onChange={onStockFileChange} />
        <div className="UpwardTrend"></div>
      </div>
    );
  }

  return (
    <div className="AnalyzeData">
      <input type="file" accept=".csv" onChange={onStockFileChange} />
      <div>
        StockData date from parent: {stockDataTimeRange[0].Date.toString()}
      </div>
      <UpwardTrend stockData={stockDataTimeRange}></UpwardTrend>
      <VolumeAndPriceChange
        stockData={stockDataTimeRange}
      ></VolumeAndPriceChange>
      <OpeningPrice stockData={stockDataTimeRange}></OpeningPrice>
    </div>
  );
}
