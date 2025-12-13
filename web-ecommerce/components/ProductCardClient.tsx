"use client";

import { useState } from "react";
import Image from "next/image";
import StarRating from "./ReviewRating";
import ProductModal from "./ProductModal";

type Props = {
    product: Product;
};

const ProductCardClient = ({ product }: Props) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div onClick={() => setOpen(true)} className="card border rounded-lg shadow p-4 flex flex-col items-center hover:scale-98 hover:bg-[var(--hover-background)] transition-all duration-200 cursor-pointer">
                <div className="relative w-full aspect-[16/9] mb-2">
                    <Image
                        src={product.Image}
                        alt={product.Name}
                        fill
                        className="object-cover rounded-md"
                    />
                </div>
                <div className="flex flex-col justify-between items-center text-center gap-2 h-full">
                    <h2 className="text-lg font-semibold">{product.Name}</h2>
                    
                    <p className="text-gray-500">{product.Description}</p>
                    <div className="flex flex-col gap-2 items-center">
                    <p className="text-gray-200">฿{product.Price.toFixed(2)}</p>
                    <StarRating rating={product.Rating} />
                    </div>
                </div>
            </div>
            {open && (<ProductModal product={product} onClose={() => setOpen(false)}/>)}
        </>
    );
};

export default ProductCardClient;
