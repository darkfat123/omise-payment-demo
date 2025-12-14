"use client";

import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/PrimaryButton";
import PaymentOption from "@/components/PaymentOption";
import { SquareChevronLeft } from "lucide-react";

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
        imageSrc="/icons/thai_qr_logo.svg"
        onClick={() => selectMethod("promptpay")}
      />

      <PaymentOption
        title="Credit / Debit Card"
        description="Visa, MasterCard, UnionPay, JCB"
        imageSrc="/icons/card.svg"
        onClick={() => selectMethod("card")}
      />

      <PrimaryButton
        className="w-full mt-4 flex items-center justify-center gap-2"
        onClick={() => router.push("/checkout")}
      >
        <SquareChevronLeft /> Back to Checkout
      </PrimaryButton>
    </div>
  );
}
