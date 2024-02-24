interface ChainConfig {
  providerUrl: string | undefined;
  whiteBridgeContractAddress: string;
  messageTransmitterAddress: string;
  attestationUrl: string;
}

interface ChainConfigMap {
  [chainId: string]: ChainConfig | undefined;
}

export const chainConfigs: ChainConfigMap = {
    '1': {
      providerUrl: process.env.PROVIDER_URL_MAINNET,
      whiteBridgeContractAddress: "",
      messageTransmitterAddress: "",
      attestationUrl: "https://iris-api.circle.com"
    },
    '43114': {
      providerUrl: process.env.PROVIDER_URL_AVALANCHE,
      whiteBridgeContractAddress: "",
      messageTransmitterAddress: "",
      attestationUrl: "https://iris-api.circle.com"
    },
    '10': {
      providerUrl: process.env.PROVIDER_URL_OP_MAINNET,
      whiteBridgeContractAddress: "",
      messageTransmitterAddress: "",
      attestationUrl: "https://iris-api.circle.com"
    },
    '42161': {
      providerUrl: process.env.PROVIDER_URL_ARBITRUM,
      whiteBridgeContractAddress: "",
      messageTransmitterAddress: "",
      attestationUrl: "https://iris-api.circle.com"
    },
    '8453': {
      providerUrl: process.env.PROVIDER_URL_BASE,
      whiteBridgeContractAddress: "",
      messageTransmitterAddress: "",
      attestationUrl: "https://iris-api.circle.com"
    },
    '137': {
      providerUrl: process.env.PROVIDER_URL_POLYGON,
      whiteBridgeContractAddress: "",
      messageTransmitterAddress: "",
      attestationUrl: "https://iris-api.circle.com"
    },
    '11155111': { 
      providerUrl: process.env.PROVIDER_URL_SEPOLIA,
      whiteBridgeContractAddress: "",
      messageTransmitterAddress: "",
      attestationUrl: "https://iris-api-sandbox.circle.com"
    },
    '43113': { 
      providerUrl: process.env.PROVIDER_URL_FUJI,
      whiteBridgeContractAddress: "",
      messageTransmitterAddress: "0xa9fb1b3009dcb79e2fe346c16a604b8fa8ae0a79",
      attestationUrl: "https://iris-api-sandbox.circle.com"
    },
    '11155420': {
      providerUrl: process.env.PROVIDER_URL_OP_SEPOLIA,
      whiteBridgeContractAddress: "",
      messageTransmitterAddress: "",
      attestationUrl: "https://iris-api-sandbox.circle.com"
    },
    '421614': {
      providerUrl: process.env.PROVIDER_URL_ARBITRUM_SEPOLIA,
      whiteBridgeContractAddress: "",
      messageTransmitterAddress: "",
      attestationUrl: "https://iris-api-sandbox.circle.com"
    },
    '84532': {
      providerUrl: process.env.PROVIDER_URL_BASE_SEPOLIA,
      whiteBridgeContractAddress: "",
      messageTransmitterAddress: "",
      attestationUrl: "https://iris-api-sandbox.circle.com"
    },
    '80001': {
      providerUrl: process.env.PROVIDER_URL_MUMBAI,
      whiteBridgeContractAddress: "0x3A850eF482E77A1A3be32449796c33468992b71E",
      messageTransmitterAddress: "0xe09A679F56207EF33F5b9d8fb4499Ec00792eA73",
      attestationUrl: "https://iris-api-sandbox.circle.com"
    }
  };
  