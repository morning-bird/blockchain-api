const { ethers } = require("ethers");
console.log(process.env.LOCAL_RPC);
const provider = new ethers.providers.JsonRpcProvider(process.env.LOCAL_RPC);

const getBalance = async () => {
  const balance = await provider.getBalance(process.env.WALLET_ADDRESS);
  return ethers.utils.formatEther(balance);
};

const getBlockHeight = async (rpc = "") => {
  let result = "";
  if (rpc === "") {
    result = await provider.getBlockNumber();
  } else {
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    result = await provider.getBlockNumber();
  }
  return result;
};

const isBlockHeightSynced = async () => {
  const localRPCBlockHeight = await getBlockHeight();
  const publicRPCBlockHeight = await getBlockHeight(process.env.PUBLIC_RPC);
  let synced = false;
  if (
    localRPCBlockHeight == publicRPCBlockHeight ||
    publicRPCBlockHeight - 3 < localRPCBlockHeight
  ) {
    synced = true;
  }
  return { synced, localRPCBlockHeight, publicRPCBlockHeight };
};

module.exports = { getBalance, getBlockHeight, isBlockHeightSynced };
