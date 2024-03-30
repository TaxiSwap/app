"use client";
import ContractInterface from "@/app/components/admin/ContractInterface";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header />
      <ContractInterface />
      <Footer />
    </div>
  );
}
