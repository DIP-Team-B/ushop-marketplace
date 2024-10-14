"use client";

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart } from "lucide-react"
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";

type Product = {
  id: number;
  name: string;
  price: number;
  images: string;
  category: string;
  stock: number;
  sizes: string[];
  colours: string[];
  description: string[],
  liked: boolean,
}

type ProductsProps = {
  title: string;
  products: Product[];
};

const Products: React.FC<ProductsProps> = ({ title, products }) => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // Function to handle price filter
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newRange = [...priceRange];
    newRange[index] = Number(e.target.value);
    setPriceRange(newRange);
  };

  // Function to handle size filter
  const handleSizeChange = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Function to handle color filter
  const handleColorChange = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  // Filter the products based on the selected criteria
  const filteredProducts = products
  .filter(
    (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
  ) // Filter by price range
  .filter(
    (product) =>
      selectedSizes.length === 0 || product.sizes.some((size) => selectedSizes.includes(size))
  ) // Filter by sizes
  .filter(
    (product) =>
      selectedColors.length === 0 || product.colours.some((color) => selectedColors.includes(color))
  ); // Filter by colors

  return (
    <div className="flex">
      {/* Filter Sidebar */}
      <div className="w-1/5 mt-32 ml-3 h-4/5 p-6 border border-double shadow-lg shadow-mainGrey border-darkRed rounded-r-2xl">
        <h1 className="text-xl text-darkRed font-bold mb-4">Filters</h1>

        {/* Price Filter */}
        {/* <div className="mb-6">
          <h2 className="font-semibold mb-2">Price</h2>
          <label>Min:</label>
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(e, 0)}
            className="border rounded-xl py-1 pl-4 mb-2 w-full"
          />
          <label>Max:</label>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(e, 1)}
            className="border rounded-xl py-1 pl-4 w-full"
          />
        </div> */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Price</h3>
          <Slider
            value={priceRange}
            onValueChange={handlePriceChange}
            min={0}
            max={500} // Assuming a maximum price of $500
            step={10}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-sm">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        {/* Size Filter */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Size</h2>
          {["XS", "S", "M", "L", "XL"].map((size) => (
            <div key={size}>
              <input
                type="checkbox"
                id={size}
                value={size}
                onChange={() => handleSizeChange(size)}
                checked={selectedSizes.includes(size)}
              />
              <label htmlFor={size} className="ml-2">{size}</label>
            </div>
          ))}
        </div>

        {/* Color Filter */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Color</h2>
          {["Black", "Red", "Navy", "Green", "White"].map((color) => (
            <div key={color}>
              <input
                type="checkbox"
                id={color}
                value={color}
                onChange={() => handleColorChange(color)}
                checked={selectedColors.includes(color)}
              />
              <label htmlFor={color} className="ml-2">{color}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Product Listing */}
      <div className="w-4/5 p-6">
        <div className="text-left py-9 pl-16 text-sm text-mainGrey">
          <Link href="./" className="underline hover:color-darkRed">Home</Link> 
          &nbsp;&nbsp;&gt;&nbsp;&nbsp;
          <Link href="" className="underline hover:color-darkRed">{title}</Link>
        </div>
        <div className="text-left pb-9 pl-16 text-5xl font-bold text-darkRed">{title}</div>
        <hr />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 m-10">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden w-80">
              <Link href={`/${product.category?.toLowerCase()}/${product.id}`}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-80 object-cover cursor-pointer"
                />
                <CardContent className="p-4">
                  <h2 className="font-semibold text-lg mb-2">{product.name}</h2>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                    <Button variant="destructive" size="sm">
                      Add to Cart
                    </Button>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-darkRed">
                      Stock left: {product.stock}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-white bg-opacity-50 hover:bg-opacity-75 transition-colors"
                      aria-label={product.liked ? "Unlike" : "Like"}
                    >
                      <Heart className={`w-5 h-5 ${product.liked ? "text-red-500 fill-current" : "text-gray-600"}`} />
                    </Button>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>

  );
}

export default Products;