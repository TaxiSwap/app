import { ethers } from "ethers";
import { getMessageHashFromTransaction } from "../../../../blockchain/utils";
import { chainProviders } from "../../../../config/chainProviders";

export async function POST(request: Request) {
  try {
    const { burnTxHash, chainId } = await request.json();
    if (!burnTxHash || !chainId) {
      return new Response(
        JSON.stringify({ error: "Both burnTxHash and chainId are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const providerUrl = chainProviders[chainId];
    if (!providerUrl) {
      return new Response(
        JSON.stringify({
          error: `No provider configured for chain ID ${chainId}`,
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const provider = new ethers.JsonRpcProvider(providerUrl);

    const result = await getMessageHashFromTransaction(burnTxHash, provider);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
