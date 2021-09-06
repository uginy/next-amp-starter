import {useEffect, useRef, useState} from "react";
import Binance from "binance-api-node";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbarFilterButton,
  GridToolbarDensitySelector
} from '@mui/x-data-grid';
import Chart from "react-google-charts";
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

interface QuickSearchToolbarProps {
  clearSearch: () => void;
  onChange: () => void;
  value: string;
}

function QuickSearchToolbar(props: QuickSearchToolbarProps) {

  return (
    <div>
      <div>
        <GridToolbarFilterButton/>
        <GridToolbarDensitySelector/>
      </div>
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        InputProps={{
          startAdornment: <SearchIcon fontSize="small"/>,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{visibility: props.value ? 'visible' : 'hidden'}}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small"/>
            </IconButton>
          ),
        }}
      />
    </div>
  );
}

const History = ({values}) => {

  const data = values.value ? values?.value?.map((el, i) => {
    return [i, +el.value]
  }) : [0, 0]

  return (
    <Chart
      width={'100%'}
      height={'200px'}
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={[
        ['x', 'price'],
        ...data
      ]}
      options={{
        hAxis: {
          title: 'Tick',
        },
        vAxis: {
          title: 'Price / BUSD',
        },
      }}
      rootProps={{'data-testid': '1'}}
    />
  )
}
const client = Binance();


function escapeRegExp(value: string): string {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function nFormatter(num) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2).replace(/\.0$/, '') + 'K';
  }
  return num;
}

const rows: GridRowsProp = []
const columns: GridColDef[] = [
  {field: 'position', headerName: '#',  width: 75, disableColumnMenu: true},
  {field: 'symbol', headerName: 'Ticker Name', flex: 1, resizable: true},
  {field: 'priceChangePercent', headerName: 'Price change, %', flex: 1, resizable: true},
  {
    field: 'bestBid',
    headerName: 'Price',
    resizable: true,
    flex: 1,
    valueFormatter: (p) => (+p.value).toString().replace(/\.0$/, '')
  },
  {field: 'volumeQuote', headerName: 'Volume', resizable: true, flex: 1, valueFormatter: (p) => nFormatter(+p.value)},
  {field: 'history', headerName: 'History', resizable: true, flex: 4, renderCell: (p) => <History values={p}/>}
];

const Rank = () => {
  const [data, setData] = useState<GridRowsProp>(rows);
  const symbol = useRef<{ [key: string]: any }>({})
  const [searchText, setSearchText] = useState('');

  const requestSearch = (searchValue: string) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');

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
          if (!symbol.current[el.symbol]) {
            symbol.current[el.symbol] = []
          }
          symbol.current[el.symbol] = [...symbol.current[el.symbol], {date: new Date(), value: +el.bestBid}]

          return {
            ...el,
            position: i + 1,
            priceChangePercent: +el.priceChangePercent,
            id: el.symbol,
            symbol: el.symbol,
            history: (symbol.current[el.symbol] as Array<any>)?.slice(-60)
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
