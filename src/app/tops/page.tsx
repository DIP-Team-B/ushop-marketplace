import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";

export default function Page() {
  return (
    <div className='justify-center'>
        <Navbar/>
        <Products title="Tops" products={products} />
        <Footer />
    </div>
  );
}


const products = [
    {
      id: 1,
      name: "Jersey Tee",
      price: 19.90,
      rating: 4,
      reviews: 120,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "Varsity Jacket",
      price: 50.00,
      rating: 5,
      reviews: 85,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      name: "Crew-Neck Sweatshirt",
      price: 25.00,
      rating: 3,
      reviews: 56,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      name: "Anniversary Tee",
      price: 12.00,
      rating: 4,
      reviews: 210,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      name: "Anniversary Sweatshirt",
      price: 10.00,
      rating: 5,
      reviews: 178,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      name: "V-Neck Sweatshirt",
      price: 29.00,
      rating: 4,
      reviews: 92,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 7,
      name: "Seasonal Tees",
      price: 12.00,
      rating: 3,
      reviews: 45,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 8,
      name: "Fest Shirts",
      price: 25.00,
      rating: 4,
      reviews: 67,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]