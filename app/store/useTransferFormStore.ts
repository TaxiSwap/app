import { create } from 'zustand'
import { devtools } from 'zustand/middleware';

// Define a type for the store's state
interface TransferFormState {
  sourceChain: string;
  destinationChain: string;
  destinationAddress: string;
  amount: number;
  setSourceChain: (chain: string) => void;
  setDestinationChain: (chain: string) => void;
  setDestinationAddress: (address: string) => void;
  setAmount: (amount: number) => void;
}

// Initialize the store with state and actions
export const useTransferFormStore = create<TransferFormState>()(
  devtools((set) => ({
    // Initial state
    sourceChain: '',
    destinationChain: '',
    destinationAddress: '',
    amount: 0,
    // Actions to update state
    setSourceChain: (chain) => set(() => ({ sourceChain: chain })),
    setDestinationChain: (chain) => set(() => ({ destinationChain: chain })),
    setDestinationAddress: (address) => set(() => ({ destinationAddress: address })),
    setAmount: (amount) => set(() => ({ amount })),
  })),
);

