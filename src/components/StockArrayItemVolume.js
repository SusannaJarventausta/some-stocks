import React from 'react';
import '../styles.css';

export default function StockArrayItemVolume(props) {
  function priceChange(high, low) {
    let difference = high - low;
    return parseFloat(difference.toFixed(6));
  }
  return (
    <tr className="StockArrayItemVolume">
      <td>{props.Date.toString()}</td>
      <td>{props.Volume}</td>
      <td>{priceChange(props.High, props.Low)}</td>
    </tr>
  );
}
