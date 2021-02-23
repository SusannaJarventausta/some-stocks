import React, {useState} from 'react';
import '../styles.css';
import OpeningPriceSma5 from './OpeningPriceSma5';
import UpwardTrend from './UpwardTrend';
import VolumeAndPriceChange from './VolumeAndPriceChange';
import * as Papa from 'papaparse';
import * as moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function AnalyzeData(props) {
  const [stockFile, setStockFile] = useState('');
  const [stockData, setStockData] = useState([]);
  const [stockDataTimeRange, setStockDataTimeRange] = useState([]);
  const [startDate, setStartDate] = useState(new Date().setHours(0, 0, 0, 0));
  const [endDate, setEndDate] = useState(new Date().setHours(0, 0, 0, 0));

  function updateStockFile(file) {
    setStockFile(file);
  }

  function updateStockData(data) {
    setStockData(data);
  }

  function updateStockDataTimeRange(dataInRange) {
    setStockDataTimeRange(dataInRange);
  }

  function updateStartDate(date) {
    if (date > endDate) {
      console.log('Start date should be earlier than end date');
    } else {
      setStartDate(date);
      let endingDate = new Date(endDate);
      updateStockDataTimeRange(filterWithDates(date, endingDate));
    }
  }

  function updateEndDate(date) {
    if (date < startDate) {
      console.log('End date should be later than starting date');
    } else {
      setEndDate(date);
      let startingDate = new Date(startDate);
      updateStockDataTimeRange(filterWithDates(startingDate, date));
    }
  }

  function filterWithDates(startingDate, endingDate) {
    let tempArray = [];
    let index = 0;

    for (let element of stockData) {
      if (element.Date > endingDate) {
        return tempArray;
      } else if (element.Date >= startingDate) {
        tempArray.push({
          Id: index,
          Date: element.Date,
          CloseLast: element.CloseLast,
          Volume: element.Volume,
          Open: element.Open,
          High: element.High,
          Low: element.Low,
        });
        index = index + 1;
      }
    }
    return tempArray;
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
      complete: function(results) {
        parseJSON(results.data);
      },
    });
  }

  function onStockFileChange(e) {
    updateStockFile(e.target.files[0]);
    if (e.target.files[0] != undefined) {
      parseFile(e);
    }
  }

  if (stockFile == undefined || stockFile == '') {
    return (
      <div className="AnalyzeData">
        <input
          className="chooseFile"
          type="file"
          accept=".csv"
          onChange={onStockFileChange}
        />
      </div>
    );
  } else if (
    (stockDataTimeRange == [] || stockDataTimeRange == '') &&
    (stockData != [] || stockData != '')
  ) {
    return (
      <div className="AnalyzeData">
        <input
          className="chooseFile"
          type="file"
          accept=".csv"
          onChange={onStockFileChange}
        />
        <div className="datePickers">
          <div className="datePickersStart">
            <h3>Start date</h3>
            <DatePicker
              id="datePickerStart"
              selected={startDate}
              onChange={(date) => updateStartDate(date)}
            />
          </div>
          <div className="datePickersEnd">
            <h3>End date</h3>
            <DatePicker
              id="datePickerEnd"
              selected={endDate}
              onChange={(date) => updateEndDate(date)}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="AnalyzeData">
      <input
        className="chooseFile"
        type="file"
        accept=".csv"
        onChange={onStockFileChange}
      />
      <div className="datePickers">
        <div className="datePickersStart">
          <h3>Start date</h3>
          <DatePicker
            id="datePickerStart"
            selected={startDate}
            onChange={(date) => updateStartDate(date)}
          />
        </div>
        <div className="datePickersEnd">
          <h3>End date</h3>
          <DatePicker
            id="datePickerEnd"
            selected={endDate}
            onChange={(date) => updateEndDate(date)}
          />
        </div>
      </div>
      <UpwardTrend stockData={stockDataTimeRange}></UpwardTrend>
      <div className="listContainer">
        <VolumeAndPriceChange
          stockData={stockDataTimeRange}
        ></VolumeAndPriceChange>
        <OpeningPriceSma5 stockData={stockDataTimeRange}></OpeningPriceSma5>
      </div>
    </div>
  );
}
