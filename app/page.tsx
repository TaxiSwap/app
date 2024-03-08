import Header from "./components/header/Header";
import TransferForm from "./components/TransferForm";
import { WalletProvider } from "./contexts/WalletContext";
import { MessageProvider } from "./contexts/MessageContext";
import { TransactionProvider } from "./contexts/TransactionContext";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <MessageProvider>
          <WalletProvider>
            <TransactionProvider>
              <Header />
              <TransferForm />
            </TransactionProvider>
          </WalletProvider>
      </MessageProvider>
    </div>
  );
}
