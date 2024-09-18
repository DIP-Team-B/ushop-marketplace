import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";

export default function Page() {
  return (
    <div className='justify-center'>
        <Navbar/>
        <Products title="Bottoms" products={products} />
        <Footer />
    </div>
  );
}


const products = [
    {
      id: 1,
      name: "Jersey Shorts",
      price: 19.90,
      rating: 4,
      reviews: 120,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "Varsity Shorts",
      price: 50.00,
      rating: 5,
      reviews: 85,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      name: "Dri-fit Shorts",
      price: 25.00,
      rating: 3,
      reviews: 56,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      name: "Anniversary Shorts",
      price: 12.00,
      rating: 4,
      reviews: 210,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      name: "Seasonal Shorts",
      price: 12.00,
      rating: 3,
      reviews: 45,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]