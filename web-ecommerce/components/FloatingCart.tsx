"use client";

import { useCartStore } from "@/stores/cartStore";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

const FloatingCart = ({ onOpen }: { onOpen: () => void }) => {
    const cart = useCartStore();
    const totalQty = cart.totalQty();
    const totalPrice = cart.totalPrice();

    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (totalQty > 0) {
            setAnimate(true);
            const timer = setTimeout(() => setAnimate(false), 500);
            return () => clearTimeout(timer);
        } else {
            setAnimate(false);
        }
    }, [totalQty]);

    return (
        <button
            onClick={onOpen}
            className="fixed top-6 right-6 bg-[var(--foreground)] shadow-2xl rounded-full
                 px-6 py-7 flex items-center gap-7 z-50 text-[var(--background)]"
        >
            <div className="relative">
                <ShoppingCart size={28} />

                <span
                    className={`absolute -top-2 -right-2 bg-red-500 text-white
            text-xs w-5 h-5 rounded-full flex items-center justify-center
            ${animate ? "animate-bounce" : ""}`}
                >
                    {totalQty}
                </span>
            </div>

            <span className="font-semibold">
                ฿{totalPrice.toFixed(2)}
            </span>
        </button>
    );
};
export default FloatingCart;