"use client";

import React from "react";
import Image from "next/image";
import PrimaryButton from "./PrimaryButton";
import StarRating from "./ReviewRating";

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const handleClick = () => {
    console.log(`Button clicked! Product: ${product.Name}`);
  };

  return (
    <div className="card border rounded-lg shadow p-4 flex flex-col justify-between items-center hover:scale-98 hover:bg-[var(--hover-background)] transition-all duration-250 cursor-pointer">
      <div className="relative w-full aspect-[16/9]  mb-2">
        <Image
          src={product.Image}
          alt={product.Name}
          fill
          className="object-cover rounded-md"
          sizes="(max-width: 768px) 100vw,
             (max-width: 1024px) 50vw,
             33vw"
        />
      </div>

      <h2 className="text-lg font-semibold mb-2 text-center ">{product.Name}</h2>
      <p className="text--[var(--bg-foreground)] mb-2">${product.Price.toFixed(2)}</p>
      <p className="text-gray-500 text-center mb-2">{product.Description}</p>
      <div className="flex justify-between items-center w-full">
        <StarRating rating={product.Rating} />
        <PrimaryButton onClick={handleClick}>Add to cart</PrimaryButton>
      </div>

    </div>

  );
};

export default ProductCard;
