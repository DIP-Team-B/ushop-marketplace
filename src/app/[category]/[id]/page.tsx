"use client";

// app/products/[id]/page.tsx
import { use, useState } from "react";
import { products } from "../../productsData"; // Import product data (or fetch from API)
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Image from "next/image";

type ProductPageProps = {
  params: { category: string; id: string };
};

const ProductPage = ({ params }: ProductPageProps) => {
  const productId = params.id;
  const productCat = params.category;

  // Find the product by ID
  const product = products.find(
    (p) =>
      p.id.toString() === productId && p.category?.toLowerCase() === productCat
  );
  // const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  // const [selectedColour, setSelectedColour] = useState(product.colours[0]);

  if (!product) {
    return (
      <div>
        <div className="h-screen">
          <Navbar />
          <div className="flex flex-col gap-8 items-center justify-center h-full pb-32">
            <Image
              src="/images/page-not-found.svg"
              width="500"
              height="690"
              alt="not-found"
            ></Image>
            <div className="flex flex-col gap-2 items-center">
              <h1 className="text-mainBlack text-2xl font-bold">
                Oops! This page doesn&apos;t exist.
              </h1>
              <p className="text-mainBlack font-light w-[500px] text-center">
                It looks like the link you followed may be broken or the page
                has been moved. Double-check the URL or head back to the
                homepage.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 mb-20">
        {/* Header Section */}
        <div className="text-left py-9 pl-16 text-sm text-mainGrey">
          <Link href="./" className="underline hover:color-darkRed">
            Home
          </Link>
          &nbsp;&nbsp; &gt; &nbsp;&nbsp;
          <Link
            href={`/${product.category?.toLowerCase()}`}
            className="underline hover:color-darkRed"
          >
            {product.category}
          </Link>
          &nbsp;&nbsp; &gt; &nbsp;&nbsp;
          <Link href="#" className="underline hover:color-darkRed">
            {product.name}
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row mb-6">
          {/* Product Image */}
          <div className="w-full lg:w-1/2">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-1/2 lg:pl-10">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-lg mb-4 font-semibold text-gray-700">
              ${product.price.toFixed(2)}
            </p>

            {/* Add to Cart Button */}
            <Button variant="destructive">Add to Cart</Button>

            {/* Product Description */}
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-2">Product Description</h2>
              <p className="text-gray-600">
                {/* Add dynamic description or other info based on the product */}
                {product.description}
              </p>
            </div>

            {/* Stock left, Size, Colours, Like Button */}
            <div className="mt-2">
              <strong>Available Sizes:</strong>
              {product.sizes.map((size, index) => (
                <span key={index} className="ml-2">
                  {size}
                </span>
              ))}
            </div>

            <div className="mt-2">
              <strong>Available Colours:</strong>
              {product.colours.map((colour, index) => (
                <span key={index} className="ml-2">
                  {colour}
                </span>
              ))}
            </div>

            <div className="mt-2">
              <p className="text-md font-bold mb-2 text-darkRed">
                Stock: {product.stock}
              </p>
            </div>

            <div className="mt-2">
              <p className="text-md font-bold mb-2 text-darkRed">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white bg-opacity-50 hover:bg-opacity-75 transition-colors"
                  // aria-label={product.liked ? "Unlike" : "Like"}
                >
                  {/* <Heart className={`w-5 h-5 ${product.liked ? "text-red-500 fill-current" : "text-gray-600"}`} /> */}
                  <Heart />
                </Button>
              </p>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          {/* Add a carousel or grid of related products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products
              .filter(
                (p) => p.category === product.category && p.id !== product.id
              )
              .map((relatedProduct) => (
                <div key={relatedProduct.id} className="card">
                  <img
                    src={relatedProduct.images[0]}
                    alt={relatedProduct.name}
                  />
                  <h3>{relatedProduct.name}</h3>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
