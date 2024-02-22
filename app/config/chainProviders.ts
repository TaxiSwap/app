// config/chainProviders.ts
interface ChainProviderMap {
    [chainId: string]: string | undefined;
  }
  
  export const chainProviders: ChainProviderMap = {
    '1': process.env.PROVIDER_URL_MAINNET,
    '43114': process.env.PROVIDER_URL_AVALANCHE,
    '10': process.env.PROVIDER_URL_OP_MAINNET,
    '42161': process.env.PROVIDER_URL_ARBITRUM,
    '8453': process.env.PROVIDER_URL_BASE,
    '137': process.env.PROVIDER_URL_POLYGON,
    '11155111': process.env.PROVIDER_URL_SEPOLIA,
    '43113': process.env.PROVIDER_URL_FUJI,
    '11155420': process.env.PROVIDER_URL_OP_SEPOLIA,
    '421614': process.env.PROVIDER_URL_ARBITRUM_SEPOLIA,
    '84532': process.env.PROVIDER_URL_BASE_SEPOLIA,
    '80001': process.env.PROVIDER_URL_MUMBAI,
  };
  