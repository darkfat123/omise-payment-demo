"use client";

import { useCartStore } from "@/app/stores/cartStore";
import { Delete, X } from "lucide-react";
import PrimaryButton from "./PrimaryButton";

const MiniCartDrawer = ({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) => {
    const items = useCartStore((s) => s.items);
    const removeFromCart = useCartStore((s) => s.removeFromCart);
    const totalPrice = useCartStore((s) => s.totalPrice());

    return (
        <>
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40"
                    onClick={onClose}
                />
            )}

            <div
                className={`fixed top-0 right-0 h-full w-120 bg-[var(--background)] z-50
          shadow-lg transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="p-4 flex justify-between items-center border-b">
                    <h2 className="text-lg font-semibold">Your Cart</h2>
                    <button onClick={onClose}>
                        <X />
                    </button>
                </div>

                <div className="p-4 space-y-4 overflow-auto flex-1">
                    {items.length === 0 && (
                        <p className="text-gray-500 text-center">
                            Cart is empty
                        </p>
                    )}

                    {items.map((item) => (
                        <div
                            key={item.ID}
                            className="flex justify-between items-center"
                        >
                            <div>
                                <p className="font-medium">{item.Name}</p>
                                <p className="text-sm text-[var(--foreground)]">
                                    {item.qty} × ฿{item.Price}
                                </p>
                            </div>
                            <Delete onClick={() => removeFromCart(item.ID)}
                                className="text-red-500 text-sm" />

                        </div>
                    ))}
                </div>

                <div className="p-4 border-t">
                    <div className="flex justify-between font-semibold mb-3">
                        <span>Total</span>
                        <span>฿{totalPrice.toFixed(2)}</span>
                    </div>
                    <PrimaryButton className="flex-1 w-full py-3">Checkout</PrimaryButton>
                </div>
            </div>
        </>
    );
};

export default MiniCartDrawer;
