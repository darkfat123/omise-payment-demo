import http from "./http";
import type { Product } from "@/types/Product";

export async function getProducts(): Promise<Product[]> {
  return http.get<Product[], Product[]>("/products");
}

