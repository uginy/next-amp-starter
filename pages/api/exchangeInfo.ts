import Binance from "binance-api-node";

const client = Binance();

const client2 = Binance({
  apiKey: "UCU6XmwuHd7HNABU8PJ8Aiw8DbS1bzGHDSsdEYvieEgxITKybpuwdBvej3afasmz",
  apiSecret: "Xd0yJtNL2ZrLOg852wMvl7EuE5E7duTo0CxZPunvfduUz5im1ElgTkse68iOCanW",
  getTime: async () => await client.time(),
});

export default async (req, res) => {
  switch (req.method) {
    default:
      const req = await client2.accountSnapshot({
        type: "SPOT",
      });
      res.status(200).json(req);
  }
};
