import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";
import { products } from "../productsData";

export default function Page() {
  const others = products.filter(product => product.category === "others");

  return (
    <div className='justify-center'>
        <Navbar/>
        <Products title="Others" products={others} />
        <Footer />
    </div>
  );
}