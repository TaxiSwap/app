import { NextResponse } from "next/server";
import { PriceFetchingStrategy } from "../../../../../services/priceFetching/PriceFetchingStrategy";
import { CoinGeckoStrategy } from "../../../../../services/priceFetching/CoinGeckoStrategy";
import { CoinMarketCapStrategy } from "../../../../../services/priceFetching/CoinMarketCapStrategy";
import TokenPriceRepository from "../../../../../repositories/TokenPriceRepository";
import { NextApiRequest } from "next";

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

export async function GET(req: NextApiRequest,  { params }: { params: { tokenId: string }}) {
  const  tokenId  = params.tokenId;
  const tokenIdValue = Array.isArray(tokenId)
    ? tokenId[0]
    : tokenId;

  if (!tokenIdValue) {
    return NextResponse.json(
      { error: "Token ID is required." },
      { status: 400 }
    );
  }

  const tokenPriceRepository = new TokenPriceRepository();
  const strategies = [new CoinGeckoStrategy(), new CoinMarketCapStrategy()];
  const shuffledStrategies = strategies.sort(() => 0.5 - Math.random());

  try {
    const result = await fetchPriceWithFallback(
      tokenIdValue,
      shuffledStrategies
    );
    if (result) {
      await tokenPriceRepository.saveTokenPrice(
        tokenIdValue,
        result.price,
        result.provider
      );
      return NextResponse.json({ result }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Failed to fetch token price from all providers." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
