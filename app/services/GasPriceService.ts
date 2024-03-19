import { EvmGasPriceFetchingStrategy } from "./gasPriceFetching/EvmGasPriceFetchingStrategy";
import GasPriceRepository from "../repositories/GasPriceRepository";
import { chainConfigs } from "../config/ChainConfigMap";

export class GasPriceService {
  private gasPriceFetchingStrategy: EvmGasPriceFetchingStrategy =
    new EvmGasPriceFetchingStrategy();
  private gasPriceRepository: GasPriceRepository;

  constructor(gasPriceRepository: GasPriceRepository) {
    this.gasPriceRepository = gasPriceRepository;
  }

  async fetchAndStoreGasPrice(chainId: string): Promise<bigint | null> {
    const providerUrl = chainConfigs[chainId]?.providerUrl;
    if (!providerUrl) {
      console.error(`No provider URL found for chain ID: ${chainId}`);
      return null;
    }

    try {
      const gasPrice = await this.gasPriceFetchingStrategy.fetchGasPrice(
        providerUrl
      );
      if (gasPrice != null && gasPrice > 0) {
        await this.gasPriceRepository.saveGasPrice(chainId, gasPrice);
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
}
