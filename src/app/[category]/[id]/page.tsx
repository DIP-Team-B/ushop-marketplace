// app/products/[id]/page.tsx
import { use, useState } from "react";
import { products } from "../../productsData"; // Import product data (or fetch from API)
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type ProductPageProps = {
  params: { category: string; id: string };
};

const ProductPage = ({ params }: ProductPageProps) => {
  const productId = params.id;
  const productCat = params.category;
  
  // Find the product by ID
  const product = products.find(
    (p) => p.id.toString() === productId && p.category?.toLowerCase() === productCat
  );
  // const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  // const [selectedColour, setSelectedColour] = useState(product.colours[0]);

  if (!product) {
    return <div>
        <Navbar />
        <div className="justify-center text-center text-mainGrey p-10">
          <h1>Product not found</h1>
        </div>
        <Footer />
        </div>;
  }

  return (
    <>
    <Navbar /> 
    <div className="container mx-auto p-6">
      {/* Header Section */}
      <div className="text-left py-9 pl-16 text-sm text-mainGrey">
        <Link href="./" className="underline hover:color-darkRed">Home</Link> 
        &nbsp;&nbsp;
        &gt; 
        &nbsp;&nbsp;
        <Link href={`/${product.category?.toLowerCase()}`} className="underline hover:color-darkRed">{product.category}</Link> 
        &nbsp;&nbsp;
        &gt; 
        &nbsp;&nbsp;
        <Link href="#" className="underline hover:color-darkRed">{product.name}</Link> 
      </div>
      <div className="flex flex-col lg:flex-row mb-6">
        {/* Product Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={product.image}
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

          {/* Product Information */}
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Product Description</h2>
            <p className="text-gray-600">
              {/* Add dynamic description or other info based on the product */}
              {product.description}
            </p>
          </div>

          {/* Stock left, Size, Colours */}
          <div className="mt-2">
            <strong>Available Sizes:</strong> 
            {product.sizes.map((size, index) => (
              <span key={index} className="ml-2">{size}</span>
            ))}
          </div>

          {/* Display colours */}
          <div className="mt-2">
            <strong>Available Colours:</strong> 
            {product.colours.map((colour, index) => (
              <span key={index} className="ml-2">{colour}</span>
            ))}
          </div>
          
          <div className="mt-2">
            <p className="text-md font-bold mb-2 text-darkRed">Stock: {product.stock}</p>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        {/* Add a carousel or grid of related products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products
            .filter((p) => p.category === product.category && p.id !== product.id)
            .map((relatedProduct) => (
              <div key={relatedProduct.id} className="card">
                <img src={relatedProduct.image} alt={relatedProduct.name} />
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