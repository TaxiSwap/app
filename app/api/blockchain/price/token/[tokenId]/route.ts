import { NextResponse } from "next/server";
import { TokenPriceService } from "../../../../../services/TokenPriceService";
import { CoinGeckoStrategy } from "../../../../../services/tokenPriceFetching/CoinGeckoStrategy";
import { CoinMarketCapStrategy } from "../../../../../services/tokenPriceFetching/CoinMarketCapStrategy";
import { TokenPriceRepository } from "../../../../../repositories/TokenPriceRepository";

export async function GET(
  req: Request,
  { params }: { params: { tokenId: string } }
) {
  const tokenId = params.tokenId;
  const strategies = [new CoinGeckoStrategy(), new CoinMarketCapStrategy()];
  const tokenPriceService = new TokenPriceService(
    new TokenPriceRepository(),
    strategies
  );

  try {
    const result = await tokenPriceService.fetchAndStoreTokenPrice(tokenId);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    console.error("Service error:", errorMessage);
    return NextResponse.json(
      { error: "Failed to fetch token price from all providers." },
      { status: errorMessage.includes("Failed to fetch") ? 404 : 500 }
    );
  }
}
