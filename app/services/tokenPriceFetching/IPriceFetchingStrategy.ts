export interface IPriceFetchingStrategy {
  fetchTokenPrice(tokenId: string): Promise<number>;
}
