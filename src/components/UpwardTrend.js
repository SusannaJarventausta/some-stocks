import React, {useState, useEffect} from 'react';
import '../styles.css';

export default function UpwardTrend(props) {
  const [upward, setUpwardTrend] = useState(['', '', '']);

  function updateUpwardTrend(array) {
    setUpwardTrend(array);
  }

  useEffect(() => {
    updateUpwardTrend(upwardTrend());
  }, [props.stockData]);

  function upwardTrend() {
    let upwardTrendDaysNow = [0]; //[number, startdate, enddate]
    let lastClosingPrice = 0;
    let round = 0;
    let upwardTrend = [0];
    for (let element of props.stockData) {
      if (element.CloseLast < lastClosingPrice || round == 0) {
        if (upwardTrendDaysNow[0] > upwardTrend[0]) {
          upwardTrend = [...upwardTrendDaysNow];
        }
        upwardTrendDaysNow[0] = 1;
        upwardTrendDaysNow[1] = element.Date;
        round = 1;
      } else {
        upwardTrendDaysNow[0] = upwardTrendDaysNow[0] + 1;
        upwardTrendDaysNow[2] = element.Date;
      }
      lastClosingPrice = element.CloseLast;
    }
    if (upwardTrendDaysNow[0] > upwardTrend[0]) {
      upwardTrend = [...upwardTrendDaysNow];
    }
    return upwardTrend;
  }

  return (
    <div className="UpwardTrend">
      StockData date from child: {props.stockData[0].Date.toString()}
      <h2>Upward trend</h2>
      <p>Days: {upward[0]}</p>
      <p>From: {upward[1].toString()}</p>
      <p>To: {upward[2].toString()}</p>
    </div>
  );
}
