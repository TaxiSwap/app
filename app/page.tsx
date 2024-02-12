import Image from "next/image";
import Header from "./components/Header";
import TransferForm from "./components/TransferForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 text-white">
      <Header/>
      <TransferForm />
    </div>
  );
}
