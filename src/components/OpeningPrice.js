import React, {useState, useEffect} from 'react';
import '../styles.css';
import StockArrayItemSma5 from './StockArrayItemSma5';

export default function OpeningPrice(props) {
  const [stockArray, setStockArray] = useState([]);

  function updateStockArray(array) {
    setStockArray(array);
  }

  useEffect(() => {
    updateStockArray(sma());
  }, [props.stockData]);

  function compare(a, b) {
    if (a.Precentage > b.Precentage) {
      return -1;
    }
    if (a.Precentage < b.Precentage) {
      return 1;
    }
    return 0;
  }

  function sma() {
    let index = 0;
    let smaValues = [];

    for (let element of props.stockData) {
      if (index > 4) {
        let sma5 = 0;
        for (let i = 1; i < 6; i++) {
          sma5 = sma5 + smaValues[index - i].ClosePrice;
        }
        sma5 = sma5 / 5;
        let precentage = parseFloat(
          ((element.Open / sma5) * 100 - 100).toFixed(2)
        );
        smaValues[index] = {
          Id: element.Id,
          Date: element.Date,
          ClosePrice: element.CloseLast,
          Open: element.Open,
          Sma5: sma5,
          Precentage: precentage,
        };
      } else {
        smaValues[index] = {
          Id: element.Id,
          Date: element.Date,
          ClosePrice: element.CloseLast,
          Open: element.Open,
          Sma5: 0,
          Precentage: 0,
        };
      }
      index = index + 1;
    }
    return smaValues.sort(compare);
  }
  return (
    <div className="OpeningPrice">
      <h2>List of Opening prices compared to SMA5</h2>
      <div className="stockVolumeList">
        {stockArray.map((item) => (
          <StockArrayItemSma5
            key={item.Id}
            Id={item.Id}
            Date={item.Date}
            Precentage={item.Precentage}
          />
        ))}
      </div>
    </div>
  );
}
