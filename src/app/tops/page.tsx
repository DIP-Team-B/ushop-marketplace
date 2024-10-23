"use client"

import { products } from "../productsData";
import Products from "@/components/Products";

export default function Page() {
    const filteredProducts = products.filter(
        (product) => product.category === "Tops"
      );

  return (
    <Products title="Tops" products={filteredProducts} />
  );
}
