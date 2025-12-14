"use client";

import { useState } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import { createCardPayment } from "@/services/payments";
import { useCartStore } from "@/stores/cartStore";
import { useRouter } from "next/navigation";

export default function CardPaymentForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const cart = useCartStore((s) => s.items);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const form = e.target as HTMLFormElement;

        try {
            const result = await createCardPayment({
                card: {
                    number: (form as any).cardNumber.value,
                    name: (form as any).cardName.value,
                    expiration_month: (form as any).expMonth.value,
                    expiration_year: (form as any).expYear.value,
                    security_code: (form as any).cvc.value,
                },
                items: cart.map((i) => ({ productId: i.ID, quantity: i.qty })),
            });

            if (result.status === "successful") {
                router.push("/payments/success");
            } else {
                setError(result?.error || "Payment failed");
            }
            
        } catch (err: any) {
            setError(err.message || "Payment failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <input name="cardNumber" placeholder="Card Number" required />
            <input name="cardName" placeholder="Cardholder Name" required />
            <input name="expMonth" placeholder="MM" required />
            <input name="expYear" placeholder="YYYY" required />
            <input name="cvc" placeholder="CVC" required />
            {error && <p className="text-red-500">{error}</p>}
            <PrimaryButton type="submit" disabled={loading}>
                {loading ? "Processing…" : "Pay"}
            </PrimaryButton>
        </form>
    );
}
