"use client";

import { useState } from "react";
import Image from "next/image";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import { useCartStore } from "@/stores/cartStore";
import type { Product } from "@/types/Product";

type Props = {
  product: Product;
  onClose: () => void;
};

const ProductModal = ({ product, onClose }: Props) => {
  const [qty, setQty] = useState(1);
  const addToCart = useCartStore((s) => s.addToCart);

  const handleConfirm = () => {
    addToCart(product, qty);
    onClose();
  };

    return (
        <div className="fixed inset-0 bg-[var(--foreground)]/40 flex items-center justify-center z-50">
            <div className="bg-[var(--background)] rounded-2xl p-6 w-[90%] max-w-md">
                <h2 className="text-xl font-semibold mb-2">
                    {product.Name}
                </h2>

                <p className="my-3">
                    ฿{product.Price.toFixed(2)}
                </p>

                <div className="relative w-full aspect-[16/9] mb-2">
                    <Image src={product.Image} alt={product.Name} fill className="object-cover rounded-md" />
                </div>

                <div className="flex flex-col items-center text-center my-6">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-1 border rounded"> − </button>
                        <span className="text-lg">{qty}</span>
                        <button onClick={() => setQty((q) => q + 1)} className="px-3 py-1 border rounded"> + </button>
                    </div>
                </div>

                <div className="flex gap-3 w-full">
                    <SecondaryButton onClick={onClose} className="flex-1"> Cancel </SecondaryButton>
                    <PrimaryButton onClick={handleConfirm} className="flex-1"> Add to Cart </PrimaryButton>
                </div>

            </div>
        </div>
    );
};

export default ProductModal;
