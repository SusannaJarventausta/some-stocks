import React, {useState, useEffect} from 'react';
import '../styles.css';
import StockArrayItemVolume from './StockArrayItemVolume';

export default function VolumeAndPriceChange(props) {
  const [stockArray, setStockArray] = useState([]);

  function updateStockArray(array) {
    setStockArray(array);
  }

  useEffect(() => {
    updateStockArray(sortStocks());
  }, [props.stockData]);

  function compare(a, b) {
    if (a.Volume > b.Volume) {
      return -1;
    }
    if (a.Volume < b.Volume) {
      return 1;
    }
    if (a.High - a.Low < b.High - b.Low) {
      return 1;
    }
    if (a.High - a.Low > b.High - b.Low) {
      return -1;
    }
    //Equal in volume and price change
    return 0;
  }

  function sortStocks() {
    let stockArrayTemp = [...props.stockData];
    stockArrayTemp.sort(compare);
    return stockArrayTemp;
  }

  return (
    <div className="VolumeAndPriceChange">
      <h2>List of Volume and price changes</h2>
      <div className="stockVolumeList">
        {stockArray.map((item) => (
          <StockArrayItemVolume
            key={item.Id}
            Id={item.Id}
            Date={item.Date}
            CloseLast={item.CloseLast}
            Volume={item.Volume}
            Open={item.Open}
            High={item.High}
            Low={item.Low}
          />
        ))}
      </div>
    </div>
  );
}
