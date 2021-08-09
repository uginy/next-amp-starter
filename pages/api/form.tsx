import Binance from "binance-api-node";

const client = Binance();

export default async (req, res) => {
  switch (req.method) {
    default:
      res.status(200).json(await client.time());
  }
};
