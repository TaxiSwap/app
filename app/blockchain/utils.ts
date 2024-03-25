import { ethers } from "ethers";

interface AttestationResponse {
  status: string;
  attestation?: string;
}

export function addressToBytes32(address: string): string {
  if (!ethers.isAddress(address)) {
    throw new Error("Invalid address");
  }
  // Remove the 0x prefix and pad with zeros to fit bytes32
  return ethers.zeroPadValue(address, 32);
}

export async function getMessageHashFromTransaction(
  burnTxHash: string,
  provider: ethers.Provider
) {
  const transactionReceipt = await provider.getTransactionReceipt(burnTxHash);
  const eventTopic = ethers.id("MessageSent(bytes)");
  const log = transactionReceipt?.logs.find((l) => l.topics[0] === eventTopic);

  if (!log) throw new Error("Log not found");

  const coder = ethers.AbiCoder.defaultAbiCoder();
  const messageBytes = coder.decode(["bytes"], log.data)[0];
  const messageHash = ethers.keccak256(messageBytes);

  return { messageHash, messageBytes };
}

export async function pollAttestationStatus(
  attestationBaseUrl: string,
  messageHash: string
) {
  let attestationResponse: AttestationResponse = { status: "pending" };
  while (attestationResponse.status !== "complete") {
    const response = await fetch(
      `${attestationBaseUrl}/attestations/${messageHash}`,
      { cache: "no-store" }
    );
    attestationResponse = await response.json();
    if (attestationResponse.status === "complete") {
      break; // Exit the loop if the status is 'complete'
    }
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds before the next poll
  }
  return attestationResponse; // Return the final attestation response
}

export function findRejectionReason(errorString: string): string | null {
  // Regular expression to match the reason within the error string
  const reasonRegex = /reason="([^"]+)"/;

  // Attempt to match the regex against the provided error string
  const match = errorString.match(reasonRegex);

  // If a match is found, return the captured group (the actual reason), otherwise return null
  return match ? match[1] : null;
}

export async function getTokenBalance(
  accountAddress: string,
  tokenAddress: string,
  provider: ethers.Provider
): Promise<number> {
  // ERC-20 Token ABI including balanceOf and decimals functions
  const tokenAbi = [
    // balanceOf function
    "function balanceOf(address owner) view returns (uint256)",
    // decimals function
    "function decimals() view returns (uint8)",
  ];

  // Create an instance of the token contract
  const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);

  try {
    // Fetch the token decimals
    const decimals = await tokenContract.decimals();

    // Fetch the token balance
    const balance = await tokenContract.balanceOf(accountAddress);

    // Format the balance using the token's decimals
    const formattedBalance = ethers.formatUnits(balance, decimals);

    return Number(formattedBalance);
  } catch (error) {
    // console.error("Error fetching token balance:", error);
    throw error;
  }
}

export async function getTipAmount(
  contractAddress: string,
  destinationDomain: number,
  provider: ethers.Provider
): Promise<number> {
  const contractAbi = ["function getTipAmount(uint32) view returns (uint256)"];
  try {
    const contract = new ethers.Contract(
      contractAddress,
      contractAbi,
      provider
    );
    const tipAmount = await contract.getTipAmount(destinationDomain);
    return Number(ethers.formatUnits(tipAmount.toString(), 6));
  } catch (error) {
    throw error;
  }
}
