import ProductCardClient from "./ProductCardClient";
import type { Product } from "@/types/Product";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return <ProductCardClient product={product} />;
};

export default ProductCard;
