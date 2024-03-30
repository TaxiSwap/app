import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  return NextResponse.json(
    { TESTNET: process.env.TESTNET },
    { status: 200 }
  );
}
