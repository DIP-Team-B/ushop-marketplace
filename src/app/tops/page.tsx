"use client"

import { products } from "../productsData";
import Products from "@/components/Products";
import Navbar from "@/components/Navbar";

export default async function Page({ searchParams }) {
  const filteredProducts = products.filter(
      (product) => product.category === "Tops"
    );
  const { id } = searchParams;  // Fetch the ID from the search params

  return (
    <>
    <Navbar id={id}/>
    <Products title="Tops" products={filteredProducts}/>
    </>
  );
}
