import {useEffect, useRef, useState} from "react";
import Binance from "binance-api-node";
import {GridColDef, GridRowsProp} from '@mui/x-data-grid';
import HistoryChart from '../../components/HistoryChart'


const client = Binance();

const Rank = () => {
  const [data, setData] = useState<GridRowsProp>([]);
  const symbol = useRef<{ [key: string]: any }>({})
  const position = useRef<{ [key: string]: any }>({})
  const ticks = useRef<number>(0)


  const tickersMap = (tickers) => {
    if (ticks.current % 10 === 0) {
      const tickersSorted = tickers
        .filter(el => el.symbol.search('BUSD') > -1)
        .sort((a, b) =>
          +a.priceChangePercent > +b.priceChangePercent ? -1 : 1
        )
        .map((el, i) => {
          el['position'] = el.priceChangePercent
          if (!symbol.current[el.symbol]) {
            symbol.current[el.symbol] = []
          }
          symbol.current[el.symbol] =
            [...symbol.current[el.symbol], {date: new Date(), value: +el.bestBid}].slice(-60)

          if (!position.current[el.symbol]) {
            position.current[el.symbol] = []
          }

          position.current[el.symbol] =
            [...position.current[el.symbol], {date: new Date().toISOString(), value: +el['position']}].slice(-60)

          return {
            ...el,
            priceChangePercent: +el.priceChangePercent,
            id: el.symbol,
            symbol: el.symbol,
            priceChange: (position.current[el.symbol] as Array<any>)
          }
        })
        .slice(0, 20);
      setData(() => tickersSorted);
    }
    ticks.current++
  }

  useEffect(() => {
    let disposed = false;
    client.ws.allTickers(tickersMap);
    return () => {
      setData(() => [])
      disposed = true;
    }
  }, []);

  return (
    <div style={{height: 'calc(100% - 30px)', width: "100%", border: '1px solid silver'}}>
      <HistoryChart values={data}/>
    </div>
  );
};

export default Rank;
