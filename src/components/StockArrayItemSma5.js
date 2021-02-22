import React from 'react';
import '../styles.css';

export default function StockArrayItemSma5(props) {
  return (
    <tr className="StockArrayItemSma5">
      <td>{props.Date.toString()}</td>
      <td>{props.Precentage}%</td>
    </tr>
  );
}
