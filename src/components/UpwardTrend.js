import React, {useState, useEffect} from 'react';
import '../styles.css';

export default function UpwardTrend(props) {
  return (
    <div className="UpwardTrend">
      StockData date from child: {props.stockData[0].Date.toString()}
    </div>
  );
}
