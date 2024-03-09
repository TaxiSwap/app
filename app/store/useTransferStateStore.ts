import { create } from "zustand";

interface Step {
  name: string;
  status: "pending" | "completed" | "working" | "error";
  requiresWalletInteraction?: boolean;
}

interface TransferStateStore {
  steps: Step[];
  setSteps: (steps: Step[]) => void;
  updateStepStatus: (stepIndex: number, status: Step["status"]) => void;
  resetSteps: () => void;
}

const initialSteps: Step[] = [
  {
    name: "Approve Tokens",
    status: "pending",
    requiresWalletInteraction: true,
  },
  {
    name: "Deposit Tokens",
    status: "pending",
    requiresWalletInteraction: true,
  },
  { name: "Wait for transfer. This takes a while", status: "pending" },
];

export const useTransferStateStore = create<TransferStateStore>((set) => ({
  steps: initialSteps,
  setSteps: (steps) => set(() => ({ steps })),
  updateStepStatus: (stepIndex, status) =>
    set((state) => ({
      steps: state.steps.map((step, index) =>
        index === stepIndex ? { ...step, status } : step
      ),
    })),
  resetSteps: () =>
    set((state) => ({
      steps: state.steps.map((step) => ({ ...step, status: "pending" })),
    })),
}));
