require("dotenv").config();
const express = require("express");
const iotx = require("./modules/iotxBlockchain");
const app = express();
const port = 7000;

app.get("/wallet/balance", async (req, res) => {
  const balance = await iotx.getBalance();
  const result = {
    balance: balance,
  };
  return res.json(result);
});

app.get("/block/height", async (req, res) => {
  const { synced, localRPCBlockHeight, publicRPCBlockHeight } =
    await iotx.isBlockHeightSynced();
  return res.json({
    blockHeight: localRPCBlockHeight,
    publicRPCBlockHeight: publicRPCBlockHeight,
    synced: synced,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
