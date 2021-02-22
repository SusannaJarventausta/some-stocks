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
      <h2>Longest upward trend</h2>
      <div className="upwardData">
        <p className="inline">Days: </p>
        <p className="textData">{upward[0]}</p>
      </div>
      <div className="upwardData">
        <p className="inline">From: </p>
        <p className="textData">{DateFormat(upward[1])}</p>
      </div>
      <div className="upwardData">
        <p className="inline">To: </p>
        <p className="textData">{DateFormat(upward[2])}</p>
      </div>
    </div>
  );
}
