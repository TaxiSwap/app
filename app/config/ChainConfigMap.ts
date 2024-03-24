export interface GasAmounts {
  receive: bigint;
  approve: bigint;
  deposit: bigint;
}

interface ChainConfig {
  providerUrl: string | undefined;
  taxiSwapContractAddress: string;
  messageTransmitterAddress: string;
  attestationUrl: string;
  USDCContractAddress: string;
  transactionGasAmount: GasAmounts
  nativeTokenSymbol: string;
  nativeUnitSymbol: string;
}

interface ChainConfigMap {
  [chainId: string]: ChainConfig | undefined;
}

export const chainConfigs: ChainConfigMap = {
    '1': {
      providerUrl: process.env.PROVIDER_URL_MAINNET,
      USDCContractAddress: "",
      taxiSwapContractAddress: "",
      messageTransmitterAddress: "",
      attestationUrl: "https://iris-api.circle.com",
      transactionGasAmount: {
        receive: BigInt("150000"),
        approve: BigInt("150000"),
        deposit: BigInt("150000")
      },
      nativeTokenSymbol: "ethereum",
      nativeUnitSymbol: "ETH"
    },
    '43114': {
      providerUrl: process.env.PROVIDER_URL_AVALANCHE,
      USDCContractAddress: "",
      taxiSwapContractAddress: "",
      messageTransmitterAddress: "",
      attestationUrl: "https://iris-api.circle.com",
      transactionGasAmount: {
        receive: BigInt("150000"),
        approve: BigInt("150000"),
        deposit: BigInt("150000")
      },
      nativeTokenSymbol: "avalanche-2",
      nativeUnitSymbol: "AVAX"
    },
    '10': {
      providerUrl: process.env.PROVIDER_URL_OP_MAINNET,
      USDCContractAddress: "",
      taxiSwapContractAddress: "",
      messageTransmitterAddress: "",
      attestationUrl: "https://iris-api.circle.com",
      transactionGasAmount: {
        receive: BigInt("150000"),
        approve: BigInt("150000"),
        deposit: BigInt("150000")
      },
      nativeTokenSymbol: "ethereum",
      nativeUnitSymbol: "ETH"
    },
    '42161': {
      providerUrl: process.env.PROVIDER_URL_ARBITRUM,
      USDCContractAddress: "",
      taxiSwapContractAddress: "",
      messageTransmitterAddress: "",
      attestationUrl: "https://iris-api.circle.com",
      transactionGasAmount: {
        receive: BigInt("150000"),
        approve: BigInt("150000"),
        deposit: BigInt("150000")
      },
      nativeTokenSymbol: "ethereum",
      nativeUnitSymbol: "ETH"
    },
    '8453': {
      providerUrl: process.env.PROVIDER_URL_BASE,
      USDCContractAddress: "",
      taxiSwapContractAddress: "",
      messageTransmitterAddress: "",
      attestationUrl: "https://iris-api.circle.com",
      transactionGasAmount: {
        receive: BigInt("150000"),
        approve: BigInt("150000"),
        deposit: BigInt("150000")
      },
      nativeTokenSymbol: "ethereum",
      nativeUnitSymbol: "ETH"
    },
    '137': {
      providerUrl: process.env.PROVIDER_URL_POLYGON,
      USDCContractAddress: "",
      taxiSwapContractAddress: "",
      messageTransmitterAddress: "",
      attestationUrl: "https://iris-api.circle.com",
      transactionGasAmount: {
        receive: BigInt("150000"),
        approve: BigInt("150000"),
        deposit: BigInt("150000")
      },
      nativeTokenSymbol: "matic-network",
      nativeUnitSymbol: "MATIC"
    },
    '11155111': { 
      providerUrl: process.env.PROVIDER_URL_SEPOLIA,
      USDCContractAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
      taxiSwapContractAddress: "",
      messageTransmitterAddress: "",
      attestationUrl: "https://iris-api-sandbox.circle.com",
      transactionGasAmount: {
        receive: BigInt("150000"),
        approve: BigInt("150000"),
        deposit: BigInt("150000")
      },
      nativeTokenSymbol: "ethereum",
      nativeUnitSymbol: "ETH"
    },
    '43113': { 
      providerUrl: process.env.PROVIDER_URL_FUJI,
      USDCContractAddress: "0x5425890298aed601595a70ab815c96711a31bc65",
      taxiSwapContractAddress: "",
      messageTransmitterAddress: "0xa9fb1b3009dcb79e2fe346c16a604b8fa8ae0a79",
      attestationUrl: "https://iris-api-sandbox.circle.com",
      transactionGasAmount: {
        receive: BigInt("150000"),
        approve: BigInt("150000"),
        deposit: BigInt("150000")
      },
      nativeTokenSymbol: "avalanche-2",
      nativeUnitSymbol: "AVAX"
    },
    '11155420': {
      providerUrl: process.env.PROVIDER_URL_OP_SEPOLIA,
      USDCContractAddress: "0x5fd84259d66Cd46123540766Be93DFE6D43130D7",
      taxiSwapContractAddress: "",
      messageTransmitterAddress: "",
      attestationUrl: "https://iris-api-sandbox.circle.com",
      transactionGasAmount: {
        receive: BigInt("150000"),
        approve: BigInt("150000"),
        deposit: BigInt("150000")
      },
      nativeTokenSymbol: "ethereum",
      nativeUnitSymbol: "ETH"
    },
    '421614': {
      providerUrl: process.env.PROVIDER_URL_ARBITRUM_SEPOLIA,
      USDCContractAddress: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
      taxiSwapContractAddress: "",
      messageTransmitterAddress: "",
      attestationUrl: "https://iris-api-sandbox.circle.com",
      transactionGasAmount: {
        receive: BigInt("150000"),
        approve: BigInt("150000"),
        deposit: BigInt("150000")
      },
      nativeTokenSymbol: "ethereum",
      nativeUnitSymbol: "ETH"
    },
    '84532': {
      providerUrl: process.env.PROVIDER_URL_BASE_SEPOLIA,
      USDCContractAddress: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
      taxiSwapContractAddress: "",
      messageTransmitterAddress: "",
      attestationUrl: "https://iris-api-sandbox.circle.com",
      transactionGasAmount: {
        receive: BigInt("150000"),
        approve: BigInt("150000"),
        deposit: BigInt("150000")
      },
      nativeTokenSymbol: "ethereum",
      nativeUnitSymbol: "ETH"
    },
    '80001': {
      providerUrl: process.env.PROVIDER_URL_MUMBAI,
      USDCContractAddress: "0x9999f7fea5938fd3b1e26a12c3f2fb024e194f97",
      taxiSwapContractAddress: "0x3A850eF482E77A1A3be32449796c33468992b71E",
      messageTransmitterAddress: "0xe09A679F56207EF33F5b9d8fb4499Ec00792eA73",
      attestationUrl: "https://iris-api-sandbox.circle.com",
      transactionGasAmount: {
        receive: BigInt("150000"),
        approve: BigInt("55819"),
        deposit: BigInt("187367")
      },
      nativeTokenSymbol: "matic-network",
      nativeUnitSymbol: "MATIC"
    }
  };
  