import { NextResponse } from "next/server";
import { addressToBytes32 } from "../../../../utils/blockchain/utils";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const address = url.searchParams.get("address");

  try {
    if (!address) throw new Error("Address is required");
    const result = addressToBytes32(address);
    return NextResponse.json({ result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
