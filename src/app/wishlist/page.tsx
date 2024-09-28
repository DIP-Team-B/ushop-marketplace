import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Page() {
  
  return (
    <div className='justify-center'>
      <Navbar/>
      <div className="container mx-auto p-6">
        <div className="text-left py-9 pl-16 text-sm text-mainGrey">
          <Link href="./" className="underline hover:color-darkRed">Home</Link> 
          &nbsp;&nbsp;
          &gt; 
          &nbsp;&nbsp;
          <Link href="" className="underline hover:color-darkRed">Your Wishlist</Link> 
        </div>
        <div className="text-left pb-9 pl-16 text-5xl font-bold text-darkRed">Your Wishlist</div>
        <hr />
        
      </div>
      <Footer />
    </div>
  );
};
