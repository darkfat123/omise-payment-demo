"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cartStore";
import PrimaryButton from "@/components/PrimaryButton";
import {
    createPromptPayPayment,
    checkPaymentStatus,
} from "@/services/payments";

export default function PromptPayConfirmPage() {
    const router = useRouter();
    const cart = useCartStore((s) => s);

    const [qrUrl, setQrUrl] = useState<string | null>(null);
    const [chargeId, setChargeId] = useState<string | null>(null);
    const [status, setStatus] = useState<"pending" | "successful" | "failed">(
        "pending"
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function initPayment() {
            try {
                const res = await createPromptPayPayment({
                    items: cart.items.map((i) => ({
                        productId: i.ID,
                        quantity: i.qty,
                    })),
                });

                setQrUrl(res.download_uri);
                setChargeId(res.charge_id);
            } catch (err) {
                console.error(err);
                setStatus("failed");
            } finally {
                setLoading(false);
            }
        }

        initPayment();
    }, []);

    useEffect(() => {
        if (!chargeId) return;

        const timer = setInterval(async () => {
            const res = await checkPaymentStatus(chargeId);

            if (res.status === "successful") {
                clearInterval(timer);
                router.push("/payments/success");
            }

            if (res.status === "failed" || res.status === "expired") {
                clearInterval(timer);
                setStatus("failed");
            }
        }, 3000);

        return () => clearInterval(timer);
    }, [chargeId, router]);

    if (loading) {
        return <p className="p-8 text-center">Generating QR Code…</p>;
    }

    if (status === "failed") {
        return (
            <div className="p-8 text-center space-y-4">
                <p className="text-red-500">Payment failed or expired</p>
                <PrimaryButton onClick={() => router.push("/checkout")}>
                    Back to Checkout
                </PrimaryButton>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6 text-center space-y-4">
            <h1 className="text-xl font-semibold">
                Scan to Pay (PromptPay)
            </h1>

            {qrUrl && (
                <img
                    src={qrUrl}
                    alt="PromptPay QR Code"
                    width={280}
                    height={280}
                    className="mx-auto"
                />
            )}


            <p className="text-sm text-gray-500">
                Scan QR Code with your banking app
            </p>

            <p className="text-xs text-gray-400">
                Waiting for payment confirmation…
            </p>

            <PrimaryButton
                className="w-full mt-4"
                onClick={() => router.push("/checkout")}
            >
                Cancel Payment
            </PrimaryButton>
        </div>
    );
}
