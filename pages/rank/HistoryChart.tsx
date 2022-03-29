import Chart from 'react-google-charts';

export const History = ({values, title}) => {

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
          title: title || 'Price / BUSD',
        },
      }}
      rootProps={{'data-testid': '1'}}
    />
  )
}
