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
      name: "Lanyard",
      price: 19.90,
      rating: 4,
      reviews: 120,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "Crew Socks",
      price: 50.00,
      rating: 5,
      reviews: 85,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      name: "Long Socks",
      price: 25.00,
      rating: 3,
      reviews: 56,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      name: "Plain Cap",
      price: 12.00,
      rating: 4,
      reviews: 210,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      name: "NTU Cap",
      price: 10.00,
      rating: 5,
      reviews: 178,
      image: "/placeholder.svg?height=200&width=300",
    },
    ]