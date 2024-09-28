// app/products/[id]/page.tsx
import { use } from "react";
import { products } from "../productsData"; // Import product data (or fetch from API)
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

type ProductPageProps = {
  params: { id: string };
};

const ProductPage = ({ params }: ProductPageProps) => {
  const productId = params.id;
  
  // Find the product by ID
  const product = products.find((p) => p.id.toString() === productId);

  if (!product) {
    return <div>
        <Navbar />
        Product not found
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
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
            Add to Cart
          </button>

          {/* Additional Product Information */}
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Product Description</h2>
            <p className="text-gray-600">
              {/* Add dynamic description or other info based on the product */}
              This is a detailed description of {product.name}, providing insight into the quality and features.
            </p>
          </div>
        </div>
      </div>

      {/* Related Products Section (Optional) */}
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