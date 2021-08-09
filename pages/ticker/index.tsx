import Chart from "react-google-charts";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";

type TTicker = {
  eventTime: number;
  open: string;
  close: string;
  low: string;
  high: string;
};
const Ticker = () => {
  const { uiStore } = useStore();
  let interval;

  useEffect(() => {
    interval = setInterval(() => {
      fetch("/api/ticker")
        .then((res) => res.json())
        .then((resJson: TTicker) => {
          const index = new Date(resJson.eventTime).getMinutes().toString();
          const pushedData = [
            index,
            parseFloat(resJson?.low || "0"),
            parseFloat(resJson?.open || "0"),
            parseFloat(resJson?.close || "0"),
            parseFloat(resJson?.high || "0"),
          ];

          if (resJson?.eventTime) {
            const oldCh = uiStore.tickers;
            oldCh[index] = pushedData;
            uiStore.setTickers(oldCh);
          }
        });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      CandleStick DOGE/BUSD
      <Chart
        chartType="CandlestickChart"
        width="100%"
        height="400px"
        data={uiStore?.tickers}
      />
    </>
  );
};

export default observer(Ticker);
