export interface GasPriceFetchingStrategy {
    fetchGasPrice(provider: string): Promise<bigint | null>;
  }
  