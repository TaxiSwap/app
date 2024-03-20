import { IPriceFetchingStrategy } from "./IPriceFetchingStrategy";

type TokenMap = {
  [key: string]: number;
};

const coinmarketcapTokenMap: TokenMap = {
  ethereum: 1027,
  "avalanche-2": 5805,
};

export class CoinMarketCapStrategy implements IPriceFetchingStrategy {
  async fetchTokenPrice(tokenId: string): Promise<number> {
    const coinmarketcapTokenId = coinmarketcapTokenMap[tokenId];
    const API_KEY = process.env.COINMARKETCAP_API_KEY as string;
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${encodeURIComponent(
      coinmarketcapTokenId
    )}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-CMC_PRO_API_KEY": API_KEY,
          'Cache-Control': 'no-cache'
        },
        cache: "no-store",
      });

      if (!response.ok) {
        const errorBody = await response.json();
        const errorMessage =
          errorBody.status?.error_message || "Unknown error occurred";
        throw new Error(
          "Failed to fetch token price from Coin Market Cap: " + errorMessage
        );
      }

      const data = await response.json();
      const price = data.data[coinmarketcapTokenId].quote.USD.price;

      if (price === undefined) {
        throw new Error(`Price for token ${tokenId} not found`);
      }

      return price;
    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        throw new Error(
          `Error fetching price for ${tokenId}: ${error.message}`
        );
      throw new Error(`Unknown error on fetching price`);
    }
  }
}
