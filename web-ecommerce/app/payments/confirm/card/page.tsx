"use client";

import { useState } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import { createCardPayment } from "@/services/payments";
import { useCartStore } from "@/stores/cartStore";
import { useRouter } from "next/navigation";
import SecondaryButton from "@/components/SecondaryButton";
import { Info, SquareChevronLeft } from "lucide-react";
import { formatCardNumber, CardIcon, detectCardBrand, formatErrorDescByCode } from "@/helpers/format";

export default function CardPaymentForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const cart = useCartStore((s) => s.items);
    const [showTestCardModal, setShowTestCardModal] = useState(false);
    const [isFailedMode, setFailedMode] = useState(false);

    const [cardNumber, setCardNumber] = useState("");
    const brand = detectCardBrand(cardNumber);
    const totalPrice = useCartStore((s) => s.totalPrice().toFixed(2));

    const tableBody = isFailedMode
        ? [["Visa", "4111 1111 1114 0011", "XX/20XX", "123", "insufficient_funds"],
        ["Mastercard", "5555 5511 1111 0011", "XX/20XX", "123", "insufficient_funds"],
        ["JCB", "3530 1111 1119 0011", "XX/20XX", "123", "insufficient_funds"],
        ["UnionPay", "6250 9470 0000 0014", "XX/20XX", "123", "insufficient_funds"],
        ["Visa", "4111 1111 1113 0012", "XX/20XX", "123", "stolen_or_lost_card"],
        ["Mastercard", "5555 5511 1110 0012", "XX/20XX", "123", "stolen_or_lost_card"],
        ["JCB", "3530 1111 1118 0012", "XX/20XX", "123", "stolen_or_lost_card"],
        ["UnionPay", "6250 9470 0000 0022", "XX/20XX", "123", "stolen_or_lost_card"],
        ["Visa", "4111 1111 1112 0013", "XX/20XX", "123", "failed_processing"],
        ["Mastercard", "5555 5511 1119 0013", "XX/20XX", "123", "failed_processing"],
        ["JCB", "3530 1111 1117 0013", "XX/20XX", "123", "failed_processing"],
        ["UnionPay", "6250 9470 0000 0030", "XX/20XX", "123", "failed_processing"],
        ["Visa", "4111 1111 1111 0014", "XX/20XX", "123", "payment_rejected"],
        ["Mastercard", "5555 5511 1118 0014", "XX/20XX", "123", "payment_rejected"],
        ["JCB", "3530 1111 1116 0014", "XX/20XX", "123", "payment_rejected"],
        ["UnionPay", "6250 9470 0000 0048", "XX/20XX", "123", "payment_rejected"],
        ["Visa", "4111 1111 1119 0016", "XX/20XX", "123", "failed_fraud_check"],
        ["Mastercard", "5555 5511 1116 0016", "XX/20XX", "123", "failed_fraud_check"],
        ["JCB", "3530 1111 1114 0016", "XX/20XX", "123", "failed_fraud_check"],
        ["UnionPay", "6250 9470 0000 0055", "XX/20XX", "123", "failed_fraud_check"],
        ["Visa", "4111 1111 1118 0017", "XX/20XX", "123", "invalid_account_number"],
        ["Mastercard", "5555 5511 1115 0017", "XX/20XX", "123", "invalid_account_number"],
        ["JCB", "3530 1111 1113 0017", "XX/20XX", "123", "invalid_account_number"],
        ["UnionPay", "6250 9470 0000 0063", "XX/20XX", "123", "invalid_account_number"],
        ] : [
            ["Visa", "4242 4242 4242 4242", "XX/20XX", "123", "Successful"],
            ["Visa", "4111 1111 1111 1111", "XX/20XX", "123", "Successful"],
            ["Mastercard", "5555 5555 5555 4444", "XX/20XX", "123", "Successful"],
            ["Mastercard", "5454 5454 5454 5454", "XX/20XX", "123", "Successful"],
            ["JCB", "3530 1113 3330 0000", "XX/20XX", "123", "Successful"],
            ["JCB", "3566 1111 1111 1113", "XX/20XX", "123", "Successful"],
            ["UnionPay", "6250 9470 0000 0006", "XX/20XX", "123", "Successful"],
        ] 
       


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
                setError(formatErrorDescByCode(result?.fail_code || "") || "Payment failed");
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
                <h2 className="text-md">Total Amount: ฿{totalPrice}</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex flex-col">
                        <label className="text-md font-medium text-heading mb-2">
                            Card Number
                        </label>

                        <div className="relative">
                            <input
                                type="text"
                                name="cardNumber"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                inputMode="numeric"
                                autoComplete="cc-number"
                                maxLength={19}
                                className="px-3 py-3 w-full rounded-lg border border-default-medium bg-neutral-secondary-medium text-heading text-md focus:ring-brand focus:border-brand placeholder:text-body bg-[var(--foreground)] text-[var(--background)]"
                                placeholder="XXXX-XXXX-XXXX-XXXX"
                                required
                            />
                            <div className="absolute inset-y-0 right-4 flex items-center">
                                <CardIcon brand={brand} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-md font-medium text-heading mb-2">
                            Card Holder Name
                        </label>
                        <input
                            type="text"
                            name="cardName"
                            className="px-3 py-3 rounded-lg border border-default-medium bg-neutral-secondary-medium text-heading text-md focus:ring-brand focus:border-brand placeholder:text-body bg-[var(--foreground)] text-[var(--background)]"
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
                            inputMode="numeric"
                            name="expMonth"
                            maxLength={2}
                            className="px-3 py-3 rounded-lg border border-default-medium bg-neutral-secondary-medium text-heading text-md focus:ring-brand focus:border-brand placeholder:text-body bg-[var(--foreground)] text-[var(--background)]"
                            placeholder="MM"
                            onChange={(e) => {
                                let v = e.target.value.replace(/\D/g, "").slice(0, 2);
                                if (v.length === 1 && Number(v) > 1) {
                                    v = "0" + v;
                                }

                                if (Number(v) > 12) v = "12";

                                e.target.value = v;
                            }}
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
                            maxLength={4}
                            className="px-3 py-3 rounded-lg border border-default-medium bg-neutral-secondary-medium text-heading text-md focus:ring-brand focus:border-brand placeholder:text-body bg-[var(--foreground)] text-[var(--background)]"
                            placeholder="YYYY"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-md font-medium text-heading mb-2">CVV</label>
                        <input
                            type="text"
                            name="cvc"
                            maxLength={3}
                            className="px-3 py-3 rounded-lg border border-default-medium bg-neutral-secondary-medium text-heading text-md focus:ring-brand focus:border-brand placeholder:text-body bg-[var(--foreground)] text-[var(--background)]"
                            placeholder="123"
                            required
                        />
                    </div>
                </div>

                {error && <p className="text-red-500 font-bold">{error}</p>}
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
                                    Test Card Information {isFailedMode ? "(Successful)" : "(Failed)"}
                                </h2>
                            </div>

                            <div className="overflow-x-auto rounded-lg border border-[var(--foreground)]">
                                <table className="w-full text-sm">
                                    <thead className="bg-[var(--foreground)] text-[var(--background)]">
                                        <tr>
                                            <th className="px-4 py-3 text-center font-medium">Brand</th>
                                            <th className="px-4 py-3 text-center font-medium">Card Number</th>
                                            <th className="px-4 py-3 text-center font-medium">Card Holder Name</th>
                                            <th className="px-4 py-3 text-center font-medium">Expiration</th>
                                            <th className="px-4 py-3 text-center font-medium">CVV</th>
                                            <th className="px-4 py-3 text-center font-medium">Expected Result</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-[var(--foreground)]">
                                        {tableBody.map(([brand, number, exp, cvv, expected]) => (
                                            <tr key={number} className="hover:bg-[var(--foreground)]/10">
                                                <td className="px-4 py-3 text-center">{brand}</td>
                                                <td className="px-4 py-3 text-center font-mono">{number}</td>
                                                <td className="px-4 py-3 text-center">John Doe</td>
                                                <td className="px-4 py-3 text-center">{exp}</td>
                                                <td className="px-4 py-3 text-center">{cvv}</td>
                                                <td className="px-4 py-3 text-center">{expected}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex flex-row items-center justify-between gap-6 mt-6">
                                <label className="inline-flex items-center cursor-pointer">
                                    <span className="text-md font-medium text-green-600">
                                        Successful
                                    </span>

                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={isFailedMode}
                                        onChange={() => setFailedMode(isFailedMode => !isFailedMode)}
                                    />

                                    <div
                                        className={`relative mx-3 w-10 h-6 rounded-full bg-[var(--foreground)] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full ${isFailedMode ? "after:bg-red-700" : "after:bg-green-700"} duration-150 transition-all  peer-checked:after:translate-x-4`}
                                    ></div>
                                    <span className="text-md font-medium text-red-600">
                                        Failed
                                    </span>
                                </label>

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
