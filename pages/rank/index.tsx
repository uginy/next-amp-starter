import {useEffect, useRef, useState} from "react";
import Binance from "binance-api-node";
import {DataGrid, GridColDef, GridRowsProp} from '@mui/x-data-grid';
import {QuickSearchToolbar} from './QuickSearch';
import {UtilsClass} from './utils';
import {History} from './HistoryChart'

const client = Binance();

const columns: GridColDef[] = [
  {
    field: 'position', headerName: '#', width: 75, disableColumnMenu: true, renderCell: p => {
      return <div>{p.value}</div>
    }
  },
  {field: 'symbol', headerName: 'Ticker Name', flex: 1},
  {field: 'priceChangePercent', headerName: 'Price change, %', flex: 1, valueFormatter: (p) => p.value + '%'},
  {
    field: 'bestBid',
    headerName: 'Price',
    flex: 1,
    valueFormatter: (p) => (+p.value).toString().replace(/\.0$/, '')
  },
  {field: 'volumeQuote', headerName: 'Volume', flex: 1, valueFormatter: (p) => UtilsClass.nFormatter(+p.value)},
  {
    field: 'positionChange',
    headerName: 'Position Change',
    flex: 4,
    renderCell: (p) => <History title={'Position change'} values={p}/>
  }
];

const Rank = () => {
  const [data, setData] = useState<GridRowsProp>([]);
  const symbol = useRef<{ [key: string]: any }>({})
  const position = useRef<{ [key: string]: any }>({})
  const [searchText, setSearchText] = useState('');


  const requestSearch = (searchValue: string) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(UtilsClass.escapeRegExp(searchValue), 'i');

    const filteredRows = data.filter((row: any) => {
      return Object.keys(row).some((field: any) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setData(filteredRows);
  };

  useEffect(() => {
    let disposed = false;
    client.ws.allTickers((tickers) => {
      const tickersSorted = tickers
        .filter(el => el.symbol.search('BUSD') > -1)
        .sort((a, b) =>
          +a.priceChangePercent > +b.priceChangePercent ? -1 : 1
        )
        .map((el, i) => {
          el['position'] = i + 1
          if (!symbol.current[el.symbol]) {
            symbol.current[el.symbol] = []
          }
          symbol.current[el.symbol] =
            [...symbol.current[el.symbol], {date: new Date(), value: +el.bestBid}].slice(-60)

          if (!position.current[el.symbol]) {
            position.current[el.symbol] = []
          }

          position.current[el.symbol] =
            [...position.current[el.symbol], {date: (new Date().getSeconds()), value: +el['position']}].slice(-60)

          return {
            ...el,
            priceChangePercent: +el.priceChangePercent,
            id: el.symbol,
            symbol: el.symbol,
            history: (symbol.current[el.symbol] as Array<any>),
            positionChange: (position.current[el.symbol] as Array<any>)
          }
        })
        .slice(0, 20)
      !disposed && setData(() => tickersSorted);
    });

    return () => {
      setData(() => [])
      disposed = true;
    }
  }, []);

  return (
    <div style={{height: 'calc(100vh - 7rem)', width: "100%"}}>
      {/*<pre>{JSON.stringify(data[0], null, 4)}</pre>*/}
      <button>Sort</button>
      <DataGrid
        components={{Toolbar: QuickSearchToolbar}}
        rowHeight={200}
        rows={data}
        columns={columns}
        componentsProps={{
          toolbar: {
            value: searchText,
            onChange: (event) => requestSearch(event.target.value),
            clearSearch: () => requestSearch(''),
          },
        }}
      />
    </div>
  );
};

export default Rank;
