"use client";

import PrimaryButton from "@/components/PrimaryButton";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cartStore";
import { CircleCheckBig, House } from "lucide-react";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const clearCart = useCartStore((s) => s.clearCart);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden ">
      <div className="shadow-lg rounded-xl p-8 max-w-md w-full text-center ring-2 bg-[var(--box)]">
        <CircleCheckBig className="w-20 h-20 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">
          Payment Successful
        </h1>
        <p className="text-gray-500 mb-6">
          Thank you for your purchase! Your payment has been processed successfully.
        </p>

        <PrimaryButton
          className="w-full py-3 text-lg font-medium flex items-center justify-center gap-2"
          onClick={() => {
            clearCart();
            router.push("/");
          }}
        >
        <House size={16}/>Back to Home
        </PrimaryButton>

        <p className="mt-4 text-gray-400 text-sm">
          You will receive an email confirmation shortly.
        </p>
      </div>
    </div>
  );
}
