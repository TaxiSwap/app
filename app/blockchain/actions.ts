import { BigNumber, ethers } from "ethers";
import erc20abi from "./contracts/erc20.abi.json";
import tokenMessengerAbi from "./contracts/tokenMessenger.abi.json";
import { addressToBytes32 } from "./utils";

// Function to approve token transfer
export async function approveTokenTransfer(
  tokenAddress: string,
  spenderAddress: string,
  amount: BigNumber,
  signer: ethers.Signer
) {
  const tokenContract = new ethers.Contract(tokenAddress, erc20abi, signer);

  try {
    const tx = await tokenContract
      .connect(signer)
      .approve(spenderAddress, amount);
    await tx.wait();
    return tx.hash;
  } catch (error) {
    throw error;
  }
}

export async function depositForBurn(
  tokenMessengerAddress: string,
  amount: BigNumber,
  destinationDomain: number,
  destinationAddress: string,
  tokenAddress: string,
  signer: ethers.Signer
) {
  const tokenMessengerContract = new ethers.Contract(
    tokenMessengerAddress,
    tokenMessengerAbi,
    signer
  );

  try {
    const tx = await tokenMessengerContract
      .connect(signer)
      .depositForBurn(
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
