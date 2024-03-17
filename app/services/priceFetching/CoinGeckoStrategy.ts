import { PriceFetchingStrategy } from "./PriceFetchingStrategy";

export class CoinGeckoStrategy implements PriceFetchingStrategy {
  async fetchTokenPrice(tokenId: string): Promise<number> {
    const API_KEY = process.env.COINGECKO_API_KEY as string;
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(
      tokenId
    )}&vs_currencies=usd`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-cg-demo-api-key": API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch token price from CoinGecko");
      }

      const data = await response.json();
      const price = data[tokenId]?.usd;

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
