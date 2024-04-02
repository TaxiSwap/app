"use client";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import useEnvFlags from "@/app/hooks/useEnvFlags";
import ReceiveMessageForm from "@/app/components/admin/ReceiveMessageForm";

export default function Page() {
  const { isTestnet, isLoading } = useEnvFlags();
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header />
      {isTestnet && !isLoading && <ReceiveMessageForm />}
      <Footer />
    </div>
  );
}
