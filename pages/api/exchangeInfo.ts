import Binance from "binance-api-node";

const client = Binance();

const client2 = Binance({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
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
