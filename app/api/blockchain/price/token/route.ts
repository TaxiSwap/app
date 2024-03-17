import { NextResponse } from "next/server";
import { PriceFetchingStrategy } from "../../../../services/priceFetching/PriceFetchingStrategy";
import { CoinGeckoStrategy } from "../../../../services/priceFetching/CoinGeckoStrategy";
import { CoinMarketCapStrategy } from "../../../../services/priceFetching/CoinMarketCapStrategy";
import TokenPriceRepository from '../../../../repositories/TokenPriceRepository';

async function fetchPriceWithFallback(
  tokenId: string,
  strategies: PriceFetchingStrategy[]
): Promise<{ price: number; provider: string } | null> {
  for (const strategy of strategies) {
    try {
      const price = await strategy.fetchTokenPrice(tokenId);
      if (price != null && !isNaN(price)) {
        return { price, provider: strategy.constructor.name };
      }
    } catch (error) {
      console.error(
        `Error fetching price with ${strategy.constructor.name}:`,
        error
      );
      // Log and continue to the next strategy
    }
  }
  return null; // Return null if all strategies fail
}

export async function GET(request: Request): Promise<NextResponse> {
  const url = new URL(request.url);
  const tokenId = url.searchParams.get("tokenId");
  const tokenPriceRepository = new TokenPriceRepository();

  if (!tokenId) {
    return NextResponse.json(
      { error: "Token ID is required." },
      { status: 400 }
    );
  }

  const strategies = [new CoinGeckoStrategy(), new CoinMarketCapStrategy()];
  const shuffledStrategies = strategies.sort(() => Math.random() - 0.5);

  try {
    const result = await fetchPriceWithFallback(tokenId, shuffledStrategies);
    if (result) {
      await tokenPriceRepository.saveTokenPrice(tokenId, result.price, result.provider);
      return NextResponse.json(result);
    } else {
      return NextResponse.json(
        { error: "Failed to fetch token price from all providers." },
        { status: 404 }
      );
    }
  } catch (error) {
    // If an unexpected error occurs, log it and return a 500 error response
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
