import { ethers } from "ethers";
import {
  getMessageHashFromTransaction,
  pollAttestationStatus,
  findRejectionReason,
} from "../../../blockchain/utils";
import { chainConfigs } from "../../../config/ChainConfigMap";
import messageTransmitterAbi from "../../../blockchain/contracts/MessageTransmitter.abi.json";
import { simpleQueue } from "@/queue";

export async function POST(request: Request) {
  const { depositTx, sourceChain, destinationChain } = await request.json();

  if (!depositTx || !sourceChain || !destinationChain) {
    return new Response(
      JSON.stringify({
        error: "depositTx, sourceChain and destinationChain are required",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    // Create a jobId using depositTx and sourceChain
    const jobId = `${depositTx}_${sourceChain}`;

    // Add job to the blockchain message reception queue with the custom jobId
    await simpleQueue.add(
      "simpleMessageReceptionQueue",
      {
        depositTx,
        sourceChain,
        destinationChain,
      },
      { jobId }
    );

    // Return the jobId in the response for later monitoring
    return new Response(
      JSON.stringify({ status: "Job added to the queue", jobId }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: findRejectionReason(error.message) || error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
