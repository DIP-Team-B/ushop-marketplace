"use client";

import { useRouter } from 'next/navigation';
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart } from "lucide-react"

type Wishlist = {
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
  products: Wishlist[];
};

const Wishlist: React.FC<ProductsProps> = ({ title, products = [] }) => {
  
  const router = useRouter();  // Initialize the router
  // Local state to track the liked status for each product
  const [wishlistProducts, setWishlistProducts] = useState(products);

  // Handler to toggle the liked status
  const handleLikeToggle = (user: number, id: number, category: string) => {
    // Update the wishlistProducts array when a product is liked/unliked
    const updatedProducts = wishlistProducts.map((product) => 
      product.id === id ? { ...product, liked: !product.liked } : product
    );
    setWishlistProducts(updatedProducts);

    router.push(`/wishlist/wishlist_reload?id=${user}&removeItemId=${id}&category=${category}`);
  };

  return (
    <div className="justify-center">
      <div className="text-left py-9 pl-16 text-sm text-mainGrey">
        <Link href="./" className="underline hover:color-darkRed">Home</Link> 
        &nbsp;&nbsp;
        &gt; 
        &nbsp;&nbsp;
        <Link href="" className="underline hover:color-darkRed">{title}</Link> 
      </div>
      <div className="text-left pb-9 pl-16 text-5xl font-bold text-darkRed">{title}</div>
      <hr />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 m-10">
        {wishlistProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden w-80">
            <Link href={`/${product.category?.toLowerCase()}/${product.id}`}>
            
              <img
                src={product.images}
                alt={product.name}
                className="w-full h-80 object-cover cursor-pointer"
              />
            </Link>
            <CardContent className="p-4">
              {/* row 1 */}
              <h2 className="font-semibold text-lg mb-2">{product.name}</h2>
              {/* row 2 */}
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                <Button variant="destructive" size="sm">
                  Add to Cart
                </Button>
              </div>
              
              {/* row 3 */}
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-darkRed">
                  Stock left: {product.stock}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white bg-opacity-50 hover:bg-opacity-75 transition-colors"
                  aria-label={product.liked ? "Unlike" : "Like"}
                  onClick={() => handleLikeToggle(product.user, product.id, product.category)}
                >
                  <Heart className={`w-5 h-5 ${product.liked ? "text-red-500 fill-current" : "text-gray-600"}`} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;