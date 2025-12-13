"use client";

import { useCartStore } from "@/stores/cartStore";
import { Delete, Minus, Plus, X } from "lucide-react";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import Link from "next/link";

const MiniCartDrawer = ({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) => {
    const cart = useCartStore();
    const items = cart.items;
    const removeFromCart = cart.removeFromCart;
    const totalPrice = cart.totalPrice();

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
                            <div className="flex gap-5">
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => cart.decreaseQty(item.ID)}
                                        className="w-7 h-7 border rounded flex items-center justify-center"
                                    >
                                        <Minus size={14} />
                                    </button>

                                    <span className="min-w-[20px] text-center">
                                        {item.qty}
                                    </span>

                                    <button
                                        onClick={() => cart.increaseQty(item.ID)}
                                        className="w-7 h-7 border rounded flex items-center justify-center"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                                <Delete onClick={() => removeFromCart(item.ID)} className="text-red-500 text-sm" />

                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t gap-2 flex flex-col">
                    <div className="flex justify-between font-semibold mb-3">
                        <span>Total</span>
                        <span>฿{totalPrice.toFixed(2)}</span>
                    </div>
                    <Link href={items.length > 0 ? "/checkout" : "#"} className="flex-1">
                        <PrimaryButton disabled={items.length === 0} className="w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed">
                            Checkout
                        </PrimaryButton>
                    </Link>

                    <SecondaryButton onClick={() => cart.clearCart()} className="flex-1 w-full py-3">Clear</SecondaryButton>
                </div>
            </div>
        </>
    );
};

export default MiniCartDrawer;
