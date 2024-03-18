import { PriceFetchingStrategy } from "./tokenPriceFetching/PriceFetchingStrategy";

export class TokenPriceService {
  constructor(private priceFetchingStrategy: PriceFetchingStrategy) {}

  async fetchTokenPrice(tokenId: string) {
    const price = await this.priceFetchingStrategy.fetchTokenPrice(tokenId);
    return { price };
  }
}
