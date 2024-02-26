import { ethers } from "ethers";
import {
  getMessageHashFromTransaction,
  pollAttestationStatus,
  findRejectionReason,
} from "../../../blockchain/utils";
import { chainConfigs } from "../../../config/ChainConfigMap";
import messageTransmitterAbi from "../../../blockchain/contracts/MessageTransmitter.abi.json";

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
    const providerSource = new ethers.JsonRpcProvider(
      chainConfigs[sourceChain]?.providerUrl
    );
    const transactionReceipt = await providerSource.getTransactionReceipt(
      depositTx
    );
    // Check if tx comes from own contracts
    if (
      transactionReceipt?.to !=
      chainConfigs[sourceChain]?.whiteBridgeContractAddress
    ) {
      throw new Error("Transaction not from whitebridge contract");
    }
    // Get message
    const { messageHash, messageBytes } = await getMessageHashFromTransaction(
      depositTx,
      providerSource as ethers.Provider
    );
    // Get attestation
    const attestationResponse = await pollAttestationStatus(
      chainConfigs[sourceChain]?.attestationUrl as string,
      messageHash
    );
    // Destination Provider
    const providerDestination = new ethers.JsonRpcProvider(
      chainConfigs[destinationChain]?.providerUrl
    );
    // Operator Signer
    const signer = new ethers.Wallet(
      process.env.OPERATOR_PRIVATE_KEY as string,
      providerDestination
    );
    // define message transmitter contract
    const messageTransmitterContract = new ethers.Contract(
      chainConfigs[destinationChain]?.messageTransmitterAddress as string,
      messageTransmitterAbi,
      signer
    );
    // Test receive
    const testReceiveTx =
      await messageTransmitterContract.receiveMessage.staticCall(
        messageBytes,
        attestationResponse.attestation
      );
    // actual receive
    const receiveTx = await messageTransmitterContract.receiveMessage(
      messageBytes,
      attestationResponse.attestation
    );
    await receiveTx.wait();
    console.log("receiptTx: ", receiveTx.hash);
    return new Response(JSON.stringify({ hash: receiveTx.hash }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
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
