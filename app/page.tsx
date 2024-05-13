import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import TransferForm from "./components/transferForm/TransferForm";
import { MessageProvider } from "./contexts/MessageContext";

export default function Home() {
  return (
    <div className="min-h-screen text-gray-800">
      <MessageProvider>
              <Header />
              <TransferForm />
              <Footer />
      </MessageProvider>
    </div>
  );
}
