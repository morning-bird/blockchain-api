require('dotenv').config({ path: __dirname + "/../.env" })
const iotx = require("./iotxBlockchain")

describe('functions', () => {
    test('get wallet balance', async () => {
        const balance = await iotx.getBalance()
        expect(balance).not.toBe("")
    })
})

describe('block functions', () => {
    test('get local block height', async () => {
        const blockHeight = await iotx.getBlockHeight()
        expect(blockHeight).not.toBe("")
    })
    test('check if blockchain synced', async () => {
        expect(await iotx.isBlockHeightSynced()).toBe(true)
    })
})