import React from 'react';
import '../styles.css';
import DateFormat from './DateFormat';

export default function StockArrayItemSma5(props) {
  return (
    <tr className="StockArrayItemSma5">
      <td>{DateFormat(props.Date)}</td>
      <td>{props.Precentage}%</td>
    </tr>
  );
}
