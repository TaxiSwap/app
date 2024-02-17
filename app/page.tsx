import Image from "next/image";
import Header from "./components/Header";
import TransferForm from "./components/TransferForm";
import { NetworkConfigProvider } from "./contexts/NetworkConfigContext";
import { WalletProvider } from "./contexts/WalletContext";
import { MessageProvider } from "./contexts/MessageContext";
import { TransactionProvider } from "./contexts/TransactionContext";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <MessageProvider>
        <NetworkConfigProvider>
          <WalletProvider>
            <TransactionProvider>
              <Header />
              <TransferForm />
            </TransactionProvider>
          </WalletProvider>
        </NetworkConfigProvider>
      </MessageProvider>
    </div>
  );
}
