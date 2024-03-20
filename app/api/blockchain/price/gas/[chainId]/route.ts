import { NextResponse } from "next/server";
import { GasPriceRepository } from "@/app/repositories/GasPriceRepository";
import { GasPriceService } from "@/app/services/GasPriceService";
import { EvmGasPriceFetchingStrategy } from "@/app/services/gasPriceFetching/EvmGasPriceFetchingStrategy";

// Ensure BigInt can be serialized in JSON responses
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

export async function GET(
  req: Request,
  { params }: { params: { chainId: string } }
) {
  const chainId = params.chainId;
  const chainIdValue = Array.isArray(chainId) ? chainId[0] : chainId;

  if (!chainIdValue) {
    return NextResponse.json(
      { error: "Chain ID is required." },
      { status: 400 }
    );
  }

  const gasPriceRepository = new GasPriceRepository();
  const evmGasPriceFetchingStrategy = new EvmGasPriceFetchingStrategy();
  const gasPriceService = new GasPriceService(
    evmGasPriceFetchingStrategy,
    gasPriceRepository
  );

  try {
    const gasPrice = await gasPriceService.fetchAndStoreGasPrice(chainIdValue);
    if (gasPrice !== null) {
      return NextResponse.json({ gasPrice }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Gas Price not found." },
        { status: 404 }
      );
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    console.error("Error fetching gas price:", errorMessage);
    return NextResponse.json(
      { error: "Unexpected error on fetching gas price." },
      { status: 500 }
    );
  }
}
