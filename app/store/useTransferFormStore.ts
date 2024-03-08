import { create } from 'zustand'
import { devtools } from 'zustand/middleware';

// Define a type for the store's state
interface TransferFormState {
  sourceChain: string;
  destinationChain: string;
  destinationAddress: string;
  amount: number;
  userBalance: number;
  isAddressValid: boolean;
  isAmountValid: boolean;
  setSourceChain: (chain: string) => void;
  setDestinationChain: (chain: string) => void;
  setDestinationAddress: (address: string) => void;
  setAmount: (amount: number) => void;
  setUserBalance: (balance: number) => void;
  setIsAddressValid: (isValid: boolean) => void;
  setIsAmountValid: (isValid: boolean) => void;
}

// Initialize the store with state and actions
export const useTransferFormStore = create<TransferFormState>()(
  devtools((set) => ({
    // Initial state
    sourceChain: '',
    destinationChain: '',
    destinationAddress: '',
    amount: 0,
    userBalance: 0,
    isAddressValid: false,
    isAmountValid: false,
    // Actions to update state
    setSourceChain: (chain) => set(() => ({ sourceChain: chain })),
    setDestinationChain: (chain) => set(() => ({ destinationChain: chain })),
    setDestinationAddress: (address) => set(() => ({ destinationAddress: address })),
    setAmount: (amount) => set(() => ({ amount })),
    setUserBalance: (balance) => set(() => ({ userBalance: balance })),
    setIsAddressValid: (isValid) => set(() => ({ isAddressValid: isValid })),
    setIsAmountValid: (isValid) => set(() => ({ isAmountValid: isValid })),
  })),
);

