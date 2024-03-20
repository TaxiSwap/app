import { IGasPriceFetchingStrategy } from "./gasPriceFetching/IGasPriceFetchingStrategy"; // Ensure this interface exists
import { GasPriceRepository } from "../repositories/GasPriceRepository";
import { chainConfigs } from "../config/ChainConfigMap";

export class GasPriceService {
  constructor(
    private gasPriceFetchingStrategy: IGasPriceFetchingStrategy, // Use interface for strategy
    private gasPriceRepository: GasPriceRepository
  ) {}

  async fetchAndStoreGasPrice(chainId: string): Promise<bigint | null> {
    const providerUrl = chainConfigs[chainId]?.providerUrl;
    if (!providerUrl) {
      console.error(`No provider URL found for chain ID: ${chainId}`);
      return null;
    }

    try {
      const gasPrice = await this.gasPriceFetchingStrategy.fetchGasPrice(providerUrl);
      if (gasPrice != null && gasPrice > 0) {
        await this.gasPriceRepository.save({ chainId, price: gasPrice }); // Adjust according to your repository method signature
        return gasPrice;
      } else {
        console.warn(`Received invalid gas price for chain ID ${chainId}.`);
        return null;
      }
    } catch (error) {
      console.error(`Failed to fetch gas price for chain ID ${chainId}:`, error);
      return null;
    }
  }
}
