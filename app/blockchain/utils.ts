import { ethers } from 'ethers';

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
  
  return messageHash;
}