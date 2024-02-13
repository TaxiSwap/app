import Image from "next/image";
import Header from "./components/Header";
import TransferForm from "./components/TransferForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header/>
      <TransferForm />
    </div>
  );
}
