import { GasPriceService } from "./GasPriceService";
import { TokenPriceService } from "./TokenPriceService";
import { chainConfigs } from "../config/ChainConfigMap";

export class TransactionCostService {
  constructor(
    private gasPriceService: GasPriceService,
    private tokenPriceService: TokenPriceService
  ) {}

  async calculateTransactionCost(
    transactionType: string,
    chainId: string
  ): Promise<{ costInETH: bigint; costInUSD: number } | null> {
    try {
      const gasAmount = chainConfigs[chainId]?.receiveGasAmount;
      if (!gasAmount) {
        console.error("Transaction type or chain ID is not supported");
        return null;
      }

      const gasPrice = await this.gasPriceService.fetchAndStoreGasPrice(
        chainId
      );

      const tokenPriceUSD =
        await this.tokenPriceService.fetchAndStoreTokenPrice(chainConfigs[chainId]?.nativeTokenSymbol as string);

      if (gasPrice == null) return null;
      if (tokenPriceUSD.price == null) return null;

      const costInETH = gasAmount * (gasPrice) ;
      const costInUSD = (Number(costInETH) / (1e18)) * tokenPriceUSD.price;

      return { costInETH, costInUSD };
    } catch (error) {
      console.error("Error calculating transaction cost:", error);
      return null;
    }
  }
}
