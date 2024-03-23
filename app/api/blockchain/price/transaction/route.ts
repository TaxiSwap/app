import { NextResponse } from "next/server";
import { TransactionCostService } from "@/app/services/TransactionCostService";
import { GasPriceService } from "@/app/services/GasPriceService";
import { TokenPriceService } from "@/app/services/TokenPriceService";
import { GasPriceRepository } from "@/app/repositories/GasPriceRepository";
import { TokenPriceRepository } from "@/app/repositories/TokenPriceRepository";
import { CoinGeckoStrategy } from "@/app/services/tokenPriceFetching/CoinGeckoStrategy";
import { CoinMarketCapStrategy } from "@/app/services/tokenPriceFetching/CoinMarketCapStrategy";
import { EvmGasPriceFetchingStrategy } from "@/app/services/gasPriceFetching/EvmGasPriceFetchingStrategy";
import { GasAmounts } from "@/app/config/ChainConfigMap";

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
  const validKeys: (keyof GasAmounts)[] = ["receive", "approve", "deposit"];

  if (!validKeys.includes(transactionType as keyof GasAmounts)) {
    throw new Error(`"${transactionType}" is not a valid key of GasAmounts.`);
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
      transactionType as keyof GasAmounts,
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
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    console.error("Error calculating transaction costs:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
