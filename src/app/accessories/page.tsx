import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";
import { products } from "../productsData";

export default function Page() {
  const accessories = products.filter(product => product.category === "accessories");
 
  return (
    <div className='justify-center'>
        <Navbar/>
        <Products title="Accessories" products={accessories} />
        <Footer />
    </div>
  );
}