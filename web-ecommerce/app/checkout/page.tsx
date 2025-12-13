// app/checkout/page.tsx
"use client";

import { useCartStore } from "@/stores/cartStore";
import PrimaryButton from "@/components/PrimaryButton";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());

  if (items.length === 0) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-xl font-semibold">Your cart is empty</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 grid md:grid-cols-2 gap-6 bg-[var(--background)] rounded-lg ring-2">
      <div className="space-y-4">
        <h1 className="text-xl font-semibold mb-4">
          Checkout
        </h1>

        {items.map((item) => (
          <div
            key={item.ID}
            className="flex justify-between border-b pb-2"
          >
            <div>
              <p className="font-medium">{item.Name}</p>
              <p className="text-sm text-gray-500">
                {item.qty} × ฿{item.Price}
              </p>
            </div>

            <p className="font-semibold">
              ฿{(item.qty * item.Price).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
      <div className="border rounded-lg p-4 h-fit">
        <h2 className="text-lg font-semibold mb-4">
          Order Summary
        </h2>

        <div className="flex justify-between mb-2">
          <span>Total</span>
          <span>฿{totalPrice.toFixed(2)}</span>
        </div>

        <PrimaryButton className="w-full mt-4">
          Proceed to Payment
        </PrimaryButton>
      </div>
    </div>
  );
}
