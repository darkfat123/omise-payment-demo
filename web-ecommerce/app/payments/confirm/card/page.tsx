"use client";

import { useState } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import { createCardPayment } from "@/services/payments";
import { useCartStore } from "@/stores/cartStore";
import { useRouter } from "next/navigation";
import SecondaryButton from "@/components/SecondaryButton";
import { Info, SquareChevronLeft } from "lucide-react";

export default function CardPaymentForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const cart = useCartStore((s) => s.items);
    const [showTestCardModal, setShowTestCardModal] = useState(false);

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

        <div className="fixed inset-0 flex items-center justify-center overflow-hidden ">
            <form
                className="max-w-2xl mx-auto bg-[var(--box)] rounded-lg ring-2 p-6 gap-6 flex flex-col "
                onSubmit={handleSubmit}
            >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex flex-col">
                        <label className="text-md font-medium text-heading mb-2">
                            Card Number
                        </label>
                        <input
                            type="text"
                            name="cardNumber"
                            className="px-3 py-3 rounded-lg border border-default-medium bg-neutral-secondary-medium text-heading text-md focus:ring-brand focus:border-brand placeholder:text-body"
                            placeholder="XXXX-XXXX-XXXX-1234"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-md font-medium text-heading mb-2">
                            Card Holder Name
                        </label>
                        <input
                            type="text"
                            name="cardName"
                            className="px-3 py-3 rounded-lg border border-default-medium bg-neutral-secondary-medium text-heading text-md focus:ring-brand focus:border-brand placeholder:text-body"
                            placeholder="John Doe"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col">
                        <label className="text-md font-medium text-heading mb-2">
                            Expiration Month
                        </label>
                        <input
                            type="text"
                            name="expMonth"
                            className="px-3 py-3 rounded-lg border border-default-medium bg-neutral-secondary-medium text-heading text-md focus:ring-brand focus:border-brand placeholder:text-body"
                            placeholder="MM"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-md font-medium text-heading mb-2">
                            Expiration Year
                        </label>
                        <input
                            type="text"
                            name="expYear"
                            className="px-3 py-3 rounded-lg border border-default-medium bg-neutral-secondary-medium text-heading text-md focus:ring-brand focus:border-brand placeholder:text-body"
                            placeholder="YYYY"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-md font-medium text-heading mb-2">CVV</label>
                        <input
                            type="text"
                            name="cvc"
                            className="px-3 py-3 rounded-lg border border-default-medium bg-neutral-secondary-medium text-heading text-md focus:ring-brand focus:border-brand placeholder:text-body"
                            placeholder="123"
                            required
                        />
                    </div>
                </div>

                {error && <p className="text-red-500">{error}</p>}
                <div className="flex gap-4 justify-between items-center">
                    <div>
                        <SecondaryButton type="button"
                            className="flex flex-row items-center gap-2"
                            onClick={() => setShowTestCardModal(true)}
                        >
                            <Info size={16} /> Test Cards Info
                        </SecondaryButton>
                    </div>

                    <div className="flex gap-2">
                        <SecondaryButton
                            className="flex flex-row items-center gap-2"
                            onClick={() => router.push("/payments")}
                        >
                            <SquareChevronLeft size={16} /> Back
                        </SecondaryButton>

                        <PrimaryButton type="submit" disabled={loading}>
                            {loading ? "Processing…" : "Confirm Payment"}
                        </PrimaryButton>
                    </div>
                </div>
            </form>
            <>
                {showTestCardModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--background)]/60 backdrop-blur-sm">
                        <div className="relative w-full max-w-4xl rounded-xl bg-[var(--box)] p-6 shadow-2xl">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-xl font-semibold">
                                    Test Card Information
                                </h2>
                            </div>

                            <div className="overflow-x-auto rounded-lg border border-[var(--foreground)]">
                                <table className="w-full text-sm">
                                    <thead className="bg-[var(--foreground)] text-[var(--background)]">
                                        <tr>
                                            <th className="px-4 py-3 text-center font-medium">Brand</th>
                                            <th className="px-4 py-3 text-center font-medium">Card Number</th>
                                            <th className="px-4 py-3 text-center font-medium">Card Holder Name</th>
                                            <th className="px-4 py-3 text-center font-medium"> Expiration</th>
                                            <th className="px-4 py-3 text-center font-medium">CVV</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-[var(--foreground)]">
                                        {[
                                            ["Visa", "4242 4242 4242 4242", "Any Future", "123"],
                                            ["Visa", "4111 1111 1111 1111", "Any Future", "123"],
                                            ["Mastercard", "5555 5555 5555 4444", "Any Future", "123"],
                                            ["Mastercard", "5454 5454 5454 5454", "Any Future", "123"],
                                            ["JCB", "3530 1113 3330 0000", "Any Future", "123"],
                                            ["JCB", "3566 1111 1111 1113", "Any Future", "123"],
                                            ["UnionPay", "6250 9470 0000 0006", "Any Future", "123"],
                                        ].map(([brand, number, exp, cvv]) => (
                                            <tr key={number} className="hover:bg-[var(--foreground)]/10">
                                                <td className="px-4 py-3 text-center">{brand}</td>
                                                <td className="px-4 py-3 text-center font-mono">{number}</td>
                                                <td className="px-4 py-3 text-center">John Doe</td>
                                                <td className="px-4 py-3 text-center">{exp}</td>
                                                <td className="px-4 py-3 text-center">{cvv}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Footer */}
                            <div className="mt-6 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowTestCardModal(false)}
                                    className="rounded-md bg-amber-900 px-5 py-2 text-sm font-medium text-white hover:bg-amber-950 transition"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </>

        </div>


    );
}
