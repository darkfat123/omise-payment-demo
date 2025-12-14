"use client";

import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/PrimaryButton";
import PaymentOption from "@/components/PaymentOption";

export default function PaymentsPage() {
  const router = useRouter();

  const selectMethod = (method: "promptpay" | "card") => {
    router.push(`/payments/confirm/${method}`);
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-center">
        Select Payment Method
      </h1>

      <PaymentOption
        title="PromptPay QR Code"
        description="Pay via mobile banking with QR Code"
        onClick={() => selectMethod("promptpay")}
      />

      <PaymentOption
        title="Credit / Debit Card"
        description="Visa, MasterCard, JCB"
        onClick={() => selectMethod("card")}
      />

      <PrimaryButton
        className="w-full mt-4"
        onClick={() => router.push("/checkout")}
      >
        ← Back to Checkout
      </PrimaryButton>
    </div>
  );
}
