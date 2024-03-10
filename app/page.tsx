import Header from "./components/header/Header";
import TransferForm from "./components/transferForm/TransferForm";
import { MessageProvider } from "./contexts/MessageContext";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <MessageProvider>
              <Header />
              <TransferForm />
      </MessageProvider>
    </div>
  );
}
