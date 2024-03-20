export interface IGasPriceFetchingStrategy {
    fetchGasPrice(provider: string): Promise<bigint | null>;
  }
  