import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { products } from "../productsData";
import ProductCards from "@/components/ProductCards";
import Link from "next/link";

export default function Page() {
  const filteredProducts = products.filter(
    (product) => product.category === "Others"
  );

  return (
    <div className="justify-center">
      <Navbar />
      <div className="w-[1350px] px-40 gap-4 flex flex-col py-6">
        <div className="text-left text-sm text-mainGrey">
          <Link href="./" className="underline hover:color-darkRed">
            Home
          </Link>
          &nbsp;&nbsp; &gt; &nbsp;&nbsp;
          <Link href="" className="underline hover:color-darkRed">
            Others
          </Link>
        </div>
        <div className="text-left text-5xl font-bold text-darkRed">
          Others
        </div>
      </div>

      <hr />
      <div className="screen-size-wrapper w-[1350px] px-40 py-6 gap-2 grid grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCards
            key={product.id}
            name={product.name}
            id={product.id}
            images={product.images}
            price={product.price}
            disc={product.disc}
            category={product.category}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}
