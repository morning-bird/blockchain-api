const { ethers } = require("ethers")
const provider = new ethers.providers.JsonRpcProvider("http://localhost:15014")

const getBalance = async () => {
    const balance = await provider.getBalance("0xd1a5702a89bfe9257d303f4e7aca2f879af6af85")
    return ethers.utils.formatEther(balance)
}

const getBlockHeight = async (rpc = "") => {
    let result = ""
    if (rpc === "") {
        result = await provider.getBlockNumber()
    } else {
        const provider = new ethers.providers.JsonRpcProvider(rpc)
        result = await provider.getBlockNumber()
    }
    return result
}

const isBlockHeightSynced = async () => {
    const localRPCBlockHeight = await getBlockHeight()
    const publicRPCBlockHeight = await getBlockHeight("https://babel-api.mainnet.iotex.io")
    let isOkay = false
    if (localRPCBlockHeight == publicRPCBlockHeight || publicRPCBlockHeight - 3 < localRPCBlockHeight) {
        isOkay = true
    }
    return isOkay
}

module.exports = { getBalance, getBlockHeight, isBlockHeightSynced }