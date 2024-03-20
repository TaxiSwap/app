import { IGasPriceFetchingStrategy } from "./gasPriceFetching/IGasPriceFetchingStrategy"; // Ensure this interface exists
import { GasPriceRepository } from "../repositories/GasPriceRepository";
import { chainConfigs } from "../config/ChainConfigMap";

export class GasPriceService {
  constructor(
    private gasPriceRepository: GasPriceRepository,
    private gasPriceFetchingStrategy?: IGasPriceFetchingStrategy
  ) {}

  async fetchAndStoreGasPrice(chainId: string): Promise<bigint | null> {
    const providerUrl = chainConfigs[chainId]?.providerUrl;
    if (!providerUrl) {
      console.error(`No provider URL found for chain ID: ${chainId}`);
      return null;
    }
    if (!this.gasPriceFetchingStrategy) {
      console.error(`No price fetching strategy provided`);
      return null;
    }

    try {
      const gasPrice = await this.gasPriceFetchingStrategy.fetchGasPrice(
        providerUrl
      );
      if (gasPrice != null && gasPrice > 0) {
        await this.gasPriceRepository.save({ chainId, price: gasPrice }); // Adjust according to your repository method signature
        return gasPrice;
      } else {
        console.warn(`Received invalid gas price for chain ID ${chainId}.`);
        return null;
      }
    } catch (error) {
      console.error(
        `Failed to fetch gas price for chain ID ${chainId}:`,
        error
      );
      return null;
    }
  }

  async getGasPrices(page: number = 1, limit: number = 10, chainId?: string) {
    const { data, totalCount } = await this.gasPriceRepository.getAllGasPrices(page, limit, chainId);
    const totalPages = Math.ceil(totalCount / limit);
    return { gasPrices: data, totalCount, totalPages, currentPage: page, limit };
  }
}
