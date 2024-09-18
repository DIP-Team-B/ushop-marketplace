import { use } from "react";
import { products } from "./productsData"; // Import product data (or fetch from API)

type ProductPageProps = {
  params: { id: string };
};

const ProductPage = ({ params }: ProductPageProps) => {
  const productId = params.id;
  
  // Find the product by ID
  const product = products.find((p) => p.id.toString() === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header Section */}
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

          {/* Rating and Reviews */}
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className={`w-5 h-5 ${i < product.rating ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.908 5.902a1 1 0 00.95.69h6.08c.969 0 1.371 1.24.588 1.81l-4.918 3.576a1 1 0 00-.36 1.118l1.908 5.902c.3.921-.755 1.688-1.539 1.118L10 16.092l-4.918 3.576c-.784.57-1.84-.197-1.54-1.118l1.909-5.902a1 1 0 00-.36-1.118L.173 9.329c-.783-.57-.38-1.81.588-1.81h6.08a1 1 0 00.95-.69l1.908-5.902z" />
              </svg>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              ({product.reviews} reviews)
            </span>
          </div>

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
  );
};

export default ProductPage;
