import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";

export default function Page() {
  return (
    <div className='justify-center'>
        <Navbar/>
        <Products title="All Products" products={products} />
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
    {
        id: 6,
        name: "Jersey Tee",
        price: 19.90,
        rating: 4,
        reviews: 120,
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 7,
        name: "Varsity Jacket",
        price: 50.00,
        rating: 5,
        reviews: 85,
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 8,
        name: "Crew-Neck Sweatshirt",
        price: 25.00,
        rating: 3,
        reviews: 56,
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 9,
        name: "Anniversary Tee",
        price: 12.00,
        rating: 4,
        reviews: 210,
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 10,
        name: "Anniversary Sweatshirt",
        price: 10.00,
        rating: 5,
        reviews: 178,
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 11,
        name: "V-Neck Sweatshirt",
        price: 29.00,
        rating: 4,
        reviews: 92,
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 12,
        name: "Seasonal Tees",
        price: 12.00,
        rating: 3,
        reviews: 45,
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 13,
        name: "Fest Shirts",
        price: 25.00,
        rating: 4,
        reviews: 67,
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 14,
        name: "Lanyard",
        price: 19.90,
        rating: 4,
        reviews: 120,
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 15,
        name: "Crew Socks",
        price: 50.00,
        rating: 5,
        reviews: 85,
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 16,
        name: "Long Socks",
        price: 25.00,
        rating: 3,
        reviews: 56,
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 17,
        name: "Plain Cap",
        price: 12.00,
        rating: 4,
        reviews: 210,
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 18,
        name: "NTU Cap",
        price: 10.00,
        rating: 5,
        reviews: 178,
        image: "/placeholder.svg?height=200&width=300",
      },
  ]