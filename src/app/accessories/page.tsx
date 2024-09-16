import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";

export default function Page() {
  return (
    <div className='justify-center'>
        <Navbar/>
        <Products title="Accessories" products={products} />
        <Footer />
    </div>
  );
}


const products = [
    {
      id: 1,
      name: "Ergonomic Desk Chair",
      price: 199.99,
      rating: 4,
      reviews: 120,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "Wireless Noise-Canceling Headphones",
      price: 249.99,
      rating: 5,
      reviews: 85,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      name: "Smart Home Security Camera",
      price: 129.99,
      rating: 3,
      reviews: 56,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      name: "Portable Bluetooth Speaker",
      price: 79.99,
      rating: 4,
      reviews: 210,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      name: "4K Ultra HD Smart TV",
      price: 699.99,
      rating: 5,
      reviews: 178,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      name: "Stainless Steel Water Bottle",
      price: 24.99,
      rating: 4,
      reviews: 92,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 7,
      name: "Wireless Charging Pad",
      price: 39.99,
      rating: 3,
      reviews: 45,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 8,
      name: "Electric Coffee Grinder",
      price: 49.99,
      rating: 4,
      reviews: 67,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]