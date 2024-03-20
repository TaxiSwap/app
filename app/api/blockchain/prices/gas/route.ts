import { NextResponse } from "next/server";
import { GasPriceService } from "@/app/services/GasPriceService";
import { GasPriceRepository } from "@/app/repositories/GasPriceRepository";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "20", 10);
  const chainId = url.searchParams.get("chainId") || undefined;

  const gasPriceRepository = new GasPriceRepository();
  const gasPriceService = new GasPriceService(gasPriceRepository);

  try {
    const paginationData = await gasPriceService.getGasPrices(page, limit, chainId);
    return NextResponse.json(paginationData, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    console.error("Error fetching gas prices:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
