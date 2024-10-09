import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";
import { products } from "../productsData";

export default function Page() {
  return (
    <div className='justify-center'>
        <Navbar/>
        <Products title="All Products" products={products} />;
        <Footer />
    </div>
  );
}