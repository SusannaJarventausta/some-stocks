import React, {useState, useEffect} from 'react';
import '../styles.css';

export default function StockArrayItemSma5(props) {
  return (
    <div className="StockArrayItemSma5">
      <p>{props.Date.toString()}</p>
      <p>{props.Precentage}%</p>
    </div>
  );
}
