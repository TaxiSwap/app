import { ethers } from 'ethers';

function addressToBytes32(address: string): string {
  if (!ethers.utils.isAddress(address)) {
    throw new Error('Invalid address');
  }
  // Remove the 0x prefix and pad with zeros to fit bytes32
  return ethers.utils.hexZeroPad(address, 32);
}
