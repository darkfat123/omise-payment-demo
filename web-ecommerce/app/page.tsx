import React from "react";
import ProductCard from "@/components/ProductCard";
import CartUI from "@/components/Cart";
import { getProducts } from "@/services/products";

const ProductsPage = async () => {
  const products = await getProducts();

  return (
    <div>
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard key={product.ID} product={product} />
        ))}
      </div>

      <CartUI />
    </div>
  );

};

export default ProductsPage;
