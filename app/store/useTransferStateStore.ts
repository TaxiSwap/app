import { create } from "zustand";

interface Step {
  name: string;
  status: "pending" | "completed" | "working" | "error";
  requiresWalletInteraction?: boolean;
}

interface TransferStateStore {
  steps: Step[];
  isModalOpen: boolean;
  modalError: string | null;
  modalCanClose: boolean;
  isTransferCompleted: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  setModalError: (errorMessage: string | null) => void;
  setModalCanClose: (canClose: boolean) => void;
  setSteps: (steps: Step[]) => void;
  updateStepStatus: (stepIndex: number, status: Step["status"]) => void;
  resetSteps: () => void;
  setIsTransferCompleted: (isCompleted: boolean) => void;
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
  isModalOpen: false,
  modalError: null,
  modalCanClose: false,
  isTransferCompleted: false,
  setIsModalOpen: (isOpen) => set(() => ({ isModalOpen: isOpen })),
  setModalError: (errorMessage) => set(() => ({ modalError: errorMessage })),
  setModalCanClose: (canClose) => set(() => ({ modalCanClose: canClose })),
  setSteps: (steps) => set(() => ({ steps })),
  setIsTransferCompleted: (isCompleted) =>
    set(() => ({ isTransferCompleted: isCompleted })),
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
