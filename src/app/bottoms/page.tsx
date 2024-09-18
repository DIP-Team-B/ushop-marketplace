import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";
import { products } from "../productsData";

export default function Page() {
  const bottoms = products.filter(product => product.category === "bottoms");

  return (
    <div className='justify-center'>
        <Navbar/>
        <Products title="Bottoms" products={bottoms} />;
        <Footer />
    </div>
  );
}