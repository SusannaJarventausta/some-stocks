import React, {useState, useEffect} from 'react';
import '../styles.css';
import OpeningPrice from './OpeningPrice';
import UpwardTrend from './UpwardTrend';
import VolumeAndPriceChange from './VolumeAndPriceChange';

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
    //This one should be sent as props to children
  }

  function parseFile() {
    //Parse data from stockFile to right format
    //Put result to stockData and stockDataTimeRange
  }

  function onStockFileChange(e) {
    updateStockFile(e.target.value);
  }

  function onAnalyzeFileClick() {
    parseFile();
  }

  return (
    <div className="AnalyzeData">
      <input type="file" value={stockFile} onChange={onStockFileChange} />
      <button onClick={onAnalyzeFileClick}>Analyze</button>
      <UpwardTrend stockData={stockDataTimeRange}></UpwardTrend>
      <VolumeAndPriceChange
        stockData={stockDataTimeRange}
      ></VolumeAndPriceChange>
      <OpeningPrice stockData={stockDataTimeRange}></OpeningPrice>
    </div>
  );
}
