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
  domain: number;
}

interface ChainConfigMap {
  [chainId: string]: ChainConfig ;
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
      nativeUnitSymbol: "ETH",
      domain: 0
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
      nativeUnitSymbol: "AVAX",
      domain: 1
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
      nativeUnitSymbol: "ETH",
      domain: 2
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
      nativeUnitSymbol: "ETH",
      domain: 3
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
      nativeUnitSymbol: "ETH",
      domain: 6
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
      nativeUnitSymbol: "MATIC",
      domain: 7
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
      nativeUnitSymbol: "ETH",
      domain: 0
    },
    '43113': { 
      providerUrl: process.env.PROVIDER_URL_FUJI,
      USDCContractAddress: "0x5425890298aed601595a70ab815c96711a31bc65",
      taxiSwapContractAddress: "0xdb2e24097bd07fb89abbcdd937780d80c4f1e65a",
      messageTransmitterAddress: "0xa9fb1b3009dcb79e2fe346c16a604b8fa8ae0a79",
      attestationUrl: "https://iris-api-sandbox.circle.com",
      transactionGasAmount: {
        receive: BigInt("150000"),
        approve: BigInt("150000"),
        deposit: BigInt("150000")
      },
      nativeTokenSymbol: "avalanche-2",
      nativeUnitSymbol: "AVAX",
      domain: 1
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
      nativeUnitSymbol: "ETH",
      domain: 2
    },
    '421614': {
      providerUrl: process.env.PROVIDER_URL_ARBITRUM_SEPOLIA,
      USDCContractAddress: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
      taxiSwapContractAddress: "0x4DEd6f4DAE97E937d8442C943930daD0C5FBC393",
      messageTransmitterAddress: "0xaCF1ceeF35caAc005e15888dDb8A3515C41B4872",
      attestationUrl: "https://iris-api-sandbox.circle.com",
      transactionGasAmount: {
        receive: BigInt("150000"),
        approve: BigInt("296335"),
        deposit: BigInt("475578")
      },
      nativeTokenSymbol: "ethereum",
      nativeUnitSymbol: "ETH",
      domain: 3
    },
    '84532': {
      providerUrl: process.env.PROVIDER_URL_BASE_SEPOLIA,
      USDCContractAddress: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
      taxiSwapContractAddress: "0x1fBbeF116621428Dd7B44ec41b52E888Bb5C52Ec",
      messageTransmitterAddress: "0x7865fAfC2db2093669d92c0F33AeEF291086BEFD",
      attestationUrl: "https://iris-api-sandbox.circle.com",
      transactionGasAmount: {
        receive: BigInt("150000"),
        approve: BigInt("150000"),
        deposit: BigInt("150000")
      },
      nativeTokenSymbol: "ethereum",
      nativeUnitSymbol: "ETH",
      domain: 6
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
      nativeUnitSymbol: "MATIC",
      domain: 7
    }
  };
  