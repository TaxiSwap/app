import { ethers } from "ethers";
import erc20abi from "./contracts/erc20.abi.json";
import tokenMessengerAbi from "./contracts/tokenMessenger.abi.json";
import messageTransmitterAbi from "./contracts/MessageTransmitter.abi.json";
import whiteBridgeAbi from "./contracts/WhiteBridge.abi.json";
import { addressToBytes32 } from "./utils";

// Function to approve token transfer
export async function approveTokenTransfer(
  tokenAddress: string,
  spenderAddress: string,
  amount: BigInt,
  signer: ethers.Signer
) {
  const tokenContract = new ethers.Contract(tokenAddress, erc20abi, signer);

  try {
    const tx = await tokenContract
      .approve(spenderAddress, amount);
    await tx.wait();
    return tx.hash;
  } catch (error) {
    throw error;
  }
}

export async function depositForBurn(
  tokenMessengerAddress: string,
  amount: BigInt,
  destinationDomain: number,
  destinationAddress: string,
  tokenAddress: string,
  signer: ethers.Signer
) {

  const whiteBridgeContract = new ethers.Contract(
    tokenMessengerAddress,
    whiteBridgeAbi,
    signer
  );

  try {
    const tx = await whiteBridgeContract
      .sendMessage(
        amount,
        destinationDomain,
        addressToBytes32(destinationAddress),
        tokenAddress
      );
    await tx.wait();
    return tx.hash;
  } catch (error) {
    throw error;
  }
}

export async function callReceiveMessage(
  contractAddress: string,
  receivingMessageBytes: string,
  signature: string,
  provider: ethers.Provider,
  signer: ethers.Signer
) {
  const messageTransmitterContract = new ethers.Contract(
    contractAddress,
    messageTransmitterAbi,
    signer
  );
  const receiveTx = await messageTransmitterContract
    .receiveMessage(receivingMessageBytes, signature);
  return receiveTx.hash;
}
