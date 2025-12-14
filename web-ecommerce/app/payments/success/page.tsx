"use client";

import PrimaryButton from "@/components/PrimaryButton";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cartStore";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const clearCart = useCartStore((s) => s.clearCart);

  return (
    <div className="p-8 text-center space-y-4">
      <h1 className="text-2xl font-semibold text-green-500">
        Payment Successful 🎉
      </h1>

      <PrimaryButton
        onClick={() => {
          clearCart();
          router.push("/");
        }}
      >
        Back to Home
      </PrimaryButton>
    </div>
  );
}
