import { ethers } from 'ethers';

interface AttestationResponse {
  status: string;
  attestation?: string; 
}

export function addressToBytes32(address: string): string {
  if (!ethers.utils.isAddress(address)) {
    throw new Error('Invalid address');
  }
  // Remove the 0x prefix and pad with zeros to fit bytes32
  return ethers.utils.hexZeroPad(address, 32);
}

export async function getMessageHashFromTransaction(burnTxHash: string, provider: ethers.providers.Provider) {
  const transactionReceipt = await provider.getTransactionReceipt(burnTxHash);
  const eventTopic = ethers.utils.id('MessageSent(bytes)');
  const log = transactionReceipt.logs.find((l) => l.topics[0] === eventTopic);

  if (!log) throw new Error('Log not found');

  const messageBytes = ethers.utils.defaultAbiCoder.decode(['bytes'], log.data)[0];
  const messageHash = ethers.utils.keccak256(messageBytes);
  
  return {messageHash, messageBytes };
}

export async function pollAttestationStatus(attestationBaseUrl: string, messageHash: string) {
  let attestationResponse: AttestationResponse = { status: 'pending' };
  while (attestationResponse.status !== 'complete') {
    const response = await fetch(`${attestationBaseUrl}/attestations/${messageHash}`);
    attestationResponse = await response.json();
    if (attestationResponse.status === 'complete') {
      break; // Exit the loop if the status is 'complete'
    }
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds before the next poll
  }
  return attestationResponse; // Return the final attestation response
}
