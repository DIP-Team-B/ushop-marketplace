"use client"

import Products from "@/components/Products";
import { products } from "../productsData";
import Navbar from "@/components/Navbar";

export default async function Page({ searchParams }) {
  const filteredProducts = products.filter(
    (product) => product.category === "Bottoms"
  );
  const { id } = searchParams;  // Fetch the ID from the search params

  return (
    <>
    <Navbar id={id}/>
    <Products title="Bottoms" products={filteredProducts} />
    </>
  );
}
