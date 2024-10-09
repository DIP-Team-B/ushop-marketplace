import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";
import { products } from "../productsData";

export default function Page() {
  const tops = products.filter(product => product.category === "Tops");

  return (
    <div className='justify-center'>
        <Navbar/>
        <Products title="Tops" products={tops} />
        <Footer />
    </div>
  );
}
