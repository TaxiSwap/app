import { IPriceFetchingStrategy } from "./tokenPriceFetching/IPriceFetchingStrategy";
import { TokenPriceRepository } from "../repositories/TokenPriceRepository";

export class TokenPriceService {
  constructor(
    private tokenPriceRepository: TokenPriceRepository,
    private strategies?: IPriceFetchingStrategy[]
  ) {}

  async fetchAndStoreTokenPrice(tokenId: string) {
    if (!this.strategies) throw new Error("Missing strategies");
    for (const strategy of this.strategies) {
      try {
        const price = await strategy.fetchTokenPrice(tokenId);
        if (price != null && !isNaN(price)) {
          await this.tokenPriceRepository.save({
            tokenId: tokenId,
            price: price,
            provider: strategy.constructor.name,
          });
          return { price, provider: strategy.constructor.name };
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred";
        throw new Error(errorMessage);
      }
    }
    throw new Error("Failed to fetch token price from all providers.");
  }

  async getTokenPrices(page: number = 1, limit: number = 10, symbol: string) {
    const { data, totalCount } =
      await this.tokenPriceRepository.getAllTokenPrices(page, limit, symbol);
    const totalPages = Math.ceil(totalCount / limit);
    return {
      tokenPrices: data,
      totalCount,
      totalPages,
      currentPage: page,
      limit,
    };
  }
}
