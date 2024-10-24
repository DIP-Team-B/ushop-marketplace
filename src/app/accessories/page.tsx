"use client"

import Products from "@/components/Products";
import { products } from "../productsData";

export default function Page() {
  const filteredProducts = products.filter(
    (product) => product.category === "Accessories"
  );

  return (
    <Products title="Accessories" products={filteredProducts} />
  );
}
