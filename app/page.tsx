import Image from "next/image";
import Header from "./components/Header";
import TransferForm from "./components/TransferForm";
import { NetworkConfigProvider } from './context/NetworkConfigContext';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <NetworkConfigProvider>
      <Header/>
      <TransferForm />
      </NetworkConfigProvider>
    </div>
  );
}
