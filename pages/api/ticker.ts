import Binance from "node-binance-api";

const binance = new Binance().options({
  APIKEY: "UCU6XmwuHd7HNABU8PJ8Aiw8DbS1bzGHDSsdEYvieEgxITKybpuwdBvej3afasmz",
  APISECRET: "Xd0yJtNL2ZrLOg852wMvl7EuE5E7duTo0CxZPunvfduUz5im1ElgTkse68iOCanW",
});

const ws = {
  candlesticks: null,
};

const getCs = new Promise((res) => {
  binance.websockets.candlesticks(["DOGEBUSD"], "1m", (candlesticks) => {
    let { e: eventType, E: eventTime, s: symbol, k: ticks } = candlesticks;
    let {
      o: open,
      h: high,
      l: low,
      c: close,
      v: volume,
      n: trades,
      i: interval,
      x: isFinal,
      q: quoteVolume,
      V: buyVolume,
      Q: quoteBuyVolume,
    } = ticks;
    ws.candlesticks = {
      eventTime,
      open,
      low,
      high,
      close,
    };

    res(candlesticks);
  });
});

export default async (req, res) => {
  switch (req.method) {
    default:
      const cs = ws.candlesticks === null ? await getCs : ws.candlesticks;
      res.status(200).json(cs || {});
  }
};
