export interface PriceFetchingStrategy {
  fetchTokenPrice(tokenId: string): Promise<number>;
}
