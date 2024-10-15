import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { products } from "../productsData";
import ProductCards from "@/components/ProductCards";
import Link from "next/link";

export default function Page() {

  return (
    <div className="justify-center z-10">
      <Navbar />
      <div className="px-40 gap-4 flex flex-col py-6 relative z-10 top-[148px]">
        <div className="text-left text-sm text-mainGrey">
          <Link href="./" className="underline hover:color-darkRed">
            Home
          </Link>
          &nbsp;&nbsp; &gt; &nbsp;&nbsp;
          <Link href="" className="underline hover:color-darkRed">
            All Products
          </Link>
        </div>
        <div className="text-left text-5xl font-bold text-darkRed">
          All Products
        </div>
      </div>

      <hr />
      <div className="screen-size-wrapper w-full px-40 py-36 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:space-x-5">        {products.map((product) => (
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
