import ProductCardClient from "./ProductCardClient";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return <ProductCardClient product={product} />;
};

export default ProductCard;
