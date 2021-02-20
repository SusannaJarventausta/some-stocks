import React from 'react';
import '../styles.css';

export default function StockArrayItemVolume(props) {
  function priceChange(high, low) {
    let difference = high - low;
    return parseFloat(difference.toFixed(6));
  }
  return (
    <div className="StockArrayItemVolume">
      <p>{props.Date.toString()}</p>
      <p>{props.Volume}</p>
      <p>{priceChange(props.High, props.Low)}</p>
    </div>
  );
}
