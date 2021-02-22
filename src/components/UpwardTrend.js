import React, {useState, useEffect} from 'react';
import '../styles.css';
import DateFormat from './DateFormat';

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
      <h2>Upward trend</h2>
      <p>Days: {upward[0]}</p>
      <p>From: {DateFormat(upward[1])}</p>
      <p>To: {DateFormat(upward[2])}</p>
    </div>
  );
}
