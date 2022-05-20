import Chart from 'react-google-charts';
import dayjs from 'dayjs';

const options = {
  title: "Price Change Speed",
  curveType: "function",
  hAxis: {
    title: 'Tick',
  },
  vAxis: {
    title: '',
  },
};


export const History = ({values}) => {
  let data = [];
  const tickers = values?.map(el => el.symbol)

  for (let i = 0; i < 60; i++) {
    for (let k = 0; k < values.length; k++) {
      const vals = values.map((_, n)=> values[n]?.priceChange[i]?.value)
      const index = dayjs(values[0]?.priceChange[i]?.date).format("HH:mm:ss");
      data[i] = [i, ...vals]
    }
  }

  return values.length > 0 && (
    <Chart
      width={'1800px'}
      height={'800px'}
      chartType="LineChart"
      options={options}
      loader={<div>Loading Chart</div>}
      data={[
        ['tick', ...tickers],
        ...data
      ]}
      rootProps={{'data-testid': '1'}}
    />
  )
}
