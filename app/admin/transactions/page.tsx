"use client";
import TransactionsList from "@/app/components/admin/TransactionsList";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import useEnvFlags from "@/app/hooks/useEnvFlags";

export default function Page() {
  const { isTestnet, isLoading } = useEnvFlags();
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header />
      {isTestnet && !isLoading && <TransactionsList />}
      <Footer />
    </div>
  );
}
