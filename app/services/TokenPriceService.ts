import { PriceFetchingStrategy } from "./tokenPriceFetching/PriceFetchingStrategy";
import { TokenPriceRepository } from "../repositories/TokenPriceRepository";

export class TokenPriceService {
  constructor(
    private tokenPriceRepository: TokenPriceRepository,
    private strategies: PriceFetchingStrategy[]
  ) {}

  async fetchAndStoreTokenPrice(tokenId: string) {
    for (const strategy of this.strategies) {
      try {
        const price = await strategy.fetchTokenPrice(tokenId);
        if (price != null && !isNaN(price)) {
          await this.tokenPriceRepository.save({
            tokenId: tokenId,
            price: price,
            provider: strategy.constructor.name
          });
          return { price, provider: strategy.constructor.name };
        }
      } catch (error) {
        console.error(`Error with ${strategy.constructor.name}:`, error);
      }
    }
    throw new Error("Failed to fetch token price from all providers.");
  }
}
