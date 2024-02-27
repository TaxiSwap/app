import React from "react";

export interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  steps: Array<{
    name: string;
    status: "pending" | "completed" | "working" | "error";
    requiresWalletInteraction?: boolean;
  }>;
  errorMessage?: string;
  canClose: boolean;
  transferCompleted: boolean;
}

export const StatusModal: React.FC<StatusModalProps> = ({
  isOpen,
  onClose,
  title,
  steps,
  errorMessage,
  canClose,
  transferCompleted,
}) => {
  if (!isOpen) return null;

  interface SpinnerProps {
    stepNumber: number;
  }

  const Spinner: React.FC<SpinnerProps> = ({ stepNumber }) => (
    <div className="relative flex items-center justify-center">
      <div className="absolute">{stepNumber}</div>
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg">
        <div className="text-lg font-semibold">{title}</div>
        <ul className="my-4">
          {steps.map((step, index) => (
            <li key={index} className="flex flex-col my-4">
              <div className="flex items-center">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center relative ${
                    step.status === "completed"
                      ? "bg-green-500 text-white"
                      : step.status === "error"
                      ? "bg-red-500 text-white"
                      : "bg-gray-300 text-gray-900"
                  }`}
                >
                  {step.status === "completed" ? (
                    "✓"
                  ) : step.status === "error" ? (
                    "✕"
                  ) : step.status === "working" ? (
                    <Spinner stepNumber={index + 1} />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <div className="text-sm font-medium">{step.name}</div>
                  {step.status === "working" && (
                    <span className="text-xs text-gray-500">Processing...</span>
                  )}
                  {step.status === "working" &&
                    step.requiresWalletInteraction && (
                      <span className="text-xs text-blue-500">
                        Check your wallet
                      </span>
                    )}
                </div>
              </div>
              {step.status === "working" && (
                <div className="w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-transparent h-2.5 rounded-full animate-pulse"></div>
                </div>
              )}
            </li>
          ))}
        </ul>
        {transferCompleted && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 mb-4 rounded relative break-words whitespace-normal">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Transfer Completed</span>
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded relative break-words whitespace-normal mb-4">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {errorMessage}</span>
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={onClose}
            disabled={!canClose}
            hidden={!canClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition ease-in-out duration-150"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
