// store/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/Product";

type CartItem = Product & { qty: number };

interface CartState {
    items: CartItem[];
    addToCart: (product: Product, qty: number) => void;
    removeFromCart: (id: number) => void;
    increaseQty: (id: number) => void;
    decreaseQty: (id: number) => void;
    totalQty: () => number;
    totalPrice: () => number;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addToCart: (product, qty) =>
                set((state) => {
                    const exists = state.items.find(
                        (item) => item.ID === product.ID
                    );

                    if (exists) {
                        return {
                            items: state.items.map((item) =>
                                item.ID === product.ID
                                    ? { ...item, qty: item.qty + qty }
                                    : item
                            ),
                        };
                    }

                    return {
                        items: [...state.items, { ...product, qty }],
                    };
                }),

            increaseQty: (id) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.ID === id
                            ? { ...item, qty: item.qty + 1 }
                            : item
                    ),
                })),

            decreaseQty: (id) =>
                set((state) => ({
                    items: state.items
                        .map((item) =>
                            item.ID === id
                                ? { ...item, qty: item.qty - 1 }
                                : item
                        )
                        .filter((item) => item.qty > 0),
                })),

            removeFromCart: (id) =>
                set((state) => ({
                    items: state.items.filter((item) => item.ID !== id),
                })),

            clearCart: () =>
                set(() => ({
                    items: [],
                })),

            totalQty: () =>
                get().items.reduce((sum, item) => sum + item.qty, 0),

            totalPrice: () =>
                get().items.reduce(
                    (sum, item) => sum + item.qty * item.Price,
                    0
                ),
        }),
        { name: "cart-store" }
    )
);
