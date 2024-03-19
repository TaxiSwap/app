import { ethers } from "ethers";
import { GasPriceFetchingStrategy } from "./GasPriceFetchingStrategy";

export class EvmGasPriceFetchingStrategy implements GasPriceFetchingStrategy {
  async fetchGasPrice(providerUrl: string): Promise<bigint | null> {
    const provider = new ethers.JsonRpcProvider(providerUrl);
    const feeData = await provider.getFeeData();
    return feeData.gasPrice || null;
  }
}
