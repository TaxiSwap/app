import { NextResponse } from "next/server";
import GasPriceRepository from "@/app/repositories/GasPriceRepository";
import { GasPriceService } from "@/app/services/GasPriceService";

(BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };

export async function GET(req: Request,  { params }: { params: { chainId: string }}) {
  const  chainId  = params.chainId;
  const chainIdValue = Array.isArray(chainId)
    ? chainId[0]
    : chainId;

  if (!chainIdValue) {
    return NextResponse.json(
      { error: "chain ID is required." },
      { status: 400 }
    );
  }

  const gasPriceRepository = new GasPriceRepository();
  const gasPriceService = new GasPriceService(gasPriceRepository);

  try {
    const gasPrice = await gasPriceService.fetchAndStoreGasPrice(chainIdValue);
    if (gasPrice) {
        return NextResponse.json(
            { gasPrice },
            { status: 200 }
          );
    } else {
        return NextResponse.json(
            { error: "Gas Price not found." },
            { status: 404 }
          );
    }
  } catch (error) {
    console.error('Error fetching gas price:', error);
    return NextResponse.json(
        { error: "Unexpected error on fetching gas price." },
        { status: 500 }
      );
  }
}
