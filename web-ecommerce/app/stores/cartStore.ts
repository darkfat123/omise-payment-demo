// store/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";


type CartItem = Product & { qty: number };

interface CartState {
  items: CartItem[];
  addToCart: (product: Product, qty: number) => void;
  removeFromCart: (id: number) => void;
  totalQty: () => number;
  totalPrice: () => number;
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

      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.ID !== id),
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
