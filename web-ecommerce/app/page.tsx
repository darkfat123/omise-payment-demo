import React from "react";
import ProductCard from "@/components/ProductCard";
import CartUI from "@/components/Cart";

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer example-token",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
  }


  return res.json();
}


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
