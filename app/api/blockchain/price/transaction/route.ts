import { NextResponse } from "next/server";
import { TransactionCostService } from "@/app/services/TransactionCostService";
import { GasPriceService } from "@/app/services/GasPriceService";
import { TokenPriceService } from "@/app/services/TokenPriceService";
import { GasPriceRepository } from "@/app/repositories/GasPriceRepository";
import { TokenPriceRepository } from "@/app/repositories/TokenPriceRepository";
import { CoinGeckoStrategy } from "@/app/services/tokenPriceFetching/CoinGeckoStrategy";
import { CoinMarketCapStrategy } from "@/app/services/tokenPriceFetching/CoinMarketCapStrategy";
import { EvmGasPriceFetchingStrategy } from "@/app/services/gasPriceFetching/EvmGasPriceFetchingStrategy";

// Ensure BigInt can be serialized in JSON responses
(BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };
  
export async function GET(req: Request) {
  const url = new URL(req.url);
  const chainId = url.searchParams.get("chainId") || undefined;
  const transactionType = url.searchParams.get("transactionType") || undefined;

  if (!chainId || !transactionType) {
    return NextResponse.json(
      { error: "Chain ID and transaction type are required." },
      { status: 400 }
    );
  }

  const gasPriceService = new GasPriceService(
    new GasPriceRepository(),
    new EvmGasPriceFetchingStrategy()
  );
  const strategies = [new CoinGeckoStrategy(), new CoinMarketCapStrategy()];
  const tokenPriceService = new TokenPriceService(
    new TokenPriceRepository(),
    strategies
  );
  const transactionCostService = new TransactionCostService(
    gasPriceService,
    tokenPriceService
  );

  try {
    const costDetails = await transactionCostService.calculateTransactionCost(
      transactionType,
      chainId
    );
    if (costDetails) {
      return NextResponse.json(costDetails, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Could not calculate transaction costs." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error calculating transaction costs:", error);
    return NextResponse.json(
      { error: "Unexpected error calculating transaction costs." },
      { status: 500 }
    );
  }
}
