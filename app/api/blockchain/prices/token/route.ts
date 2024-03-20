import { NextResponse } from "next/server";
import { TokenPriceRepository } from "../../../../repositories/TokenPriceRepository";
import { TokenPriceService } from "../../../../services/TokenPriceService";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);
  const tokenId = url.searchParams.get("tokenId");

  if (!tokenId) {
    return NextResponse.json(
      { error: "Token symbol is required." },
      { status: 400 }
    );
  }

  const tokenPriceService = new TokenPriceService(new TokenPriceRepository());

  try {
    const paginationData = await tokenPriceService.getTokenPrices(
      page,
      limit,
      tokenId
    );
    return NextResponse.json(paginationData, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
}
