import { NextResponse } from "next/server";
import { pollAttestationStatus } from '../../../../utils/blockchain/utils';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const attestationBaseUrl = url.searchParams.get("attestationBaseUrl");
  const messageHash = url.searchParams.get("messageHash");

  try {
    if (!attestationBaseUrl || !messageHash) throw new Error("Both attestationBaseUrl and messageHash are required");
    const result = await pollAttestationStatus(attestationBaseUrl, messageHash);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
