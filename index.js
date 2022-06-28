const express = require('express')
const iotx = require("./modules/iotxBlockchain")
require('dotenv').config()
const app = express()
const port = 7000

app.get('/wallet/balance', async (req, res) => {
    const balance = await iotx.getBalance();
    const result = {
        balance: balance
    }
    return res.json(result)
})

app.get('/block/height', async (req, res) => {
    const blockHeight = await iotx.getBlockHeight()
    const synced = await iotx.isBlockHeightSynced()
    return res.json({
        blockHeight: blockHeight,
        synced: synced
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})