import { ethers } from "ethers";
import { IGasPriceFetchingStrategy } from "./IGasPriceFetchingStrategy";

export class EvmGasPriceFetchingStrategy implements IGasPriceFetchingStrategy {
  async fetchGasPrice(providerUrl: string): Promise<bigint | null> {
    const provider = new ethers.JsonRpcProvider(providerUrl);
    const feeData = await provider.getFeeData();
    return feeData.gasPrice || null;
  }
}
