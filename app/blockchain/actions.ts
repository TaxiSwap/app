import { BigNumber, ethers } from 'ethers';
import  erc20abi  from './contracts/erc20.abi.json';

// Function to approve token transfer
export async function approveTokenTransfer(tokenAddress: string, spenderAddress: string, amount: BigNumber, signer: ethers.Signer) {
  const tokenContract = new ethers.Contract(tokenAddress, erc20abi, signer);
  
  try {
    const tx = await tokenContract.connect(signer).approve(spenderAddress, amount);
    await tx.wait(); 
    console.log('Approval successful');
    return tx;
  } catch (error) {
    console.error('Error approving token transfer:', error);
    throw error;
  }
}
