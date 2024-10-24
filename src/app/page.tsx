"use client";

import HomepageCategoryCards from "@/components/HomepageCategoryCard";
import PromoBanner from "@/components/PromoBanner";
import PromoCardCarousel from "@/components/PromoCardCarousel";
import { products } from "./productsData";
import ProductCards from "@/components/ProductCards";
import { useState } from "react";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const [email, setUserEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setUserRole] = useState("");
  const [id, setUserId] = useState("");
  


  // Function to retrieve the username from the JWT token stored in the cookie
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('/api/session');  // Call the API route to get user data
      const data = await response.json();

      if (data.success) {
        setUserEmail(data.user.email)
        setUsername(data.user.username);  // Set the username from the response
        setUserRole(data.user.role);
        setUserId(data.user.id);
       ;

      }
    };

    fetchUser();
  }, []);

  const categoryItems = [
    { title: "Tops", id: "tops" },
    { title: "Bottoms", id: "bottoms" },
    { title: "Accessories", id: "accessories" },
    { title: "Others", id: "others" },
  ];

  const [visibleRows, setVisibleRows] = useState(3);
  const productsPerRow = 4;
  const visibleProducts = visibleRows * productsPerRow;

  const handleShowMore = () => {
    setVisibleRows((prevRows) => prevRows + 3);
  };

  return (
    <>
      {/* screen size */}
      <div className="w-full px-40 py-6 gap-4 flex flex-col items-center relative z-10 top-[148px]">
        {/* promotion */}
        <PromoBanner />

        {/* category cards */}
        <div className="flex flex-col gap-2 w-full items-center pt-6">
          <p className="font-semibold text-xl text-mainBlack">#ShopByMood</p>
          <div className="flex flex-col lg:flex-row p-4 gap-4 bg-secondBG w-full rounded-md items-center">
            {categoryItems.map((item) => (
              <HomepageCategoryCards key={item.id} title={item.title} id={item.id} />
            ))}
          </div>
        </div>

        {/* promo */}
        <div className="flex flex-col gap-2 w-[1350px] px-40 items-center pt-6">
          <div className="flex items-center gap-1">
            <p className="animate-bounce mr-1 font-semibold text-xl text-mainBlack">
              🔥
            </p>
            <p className="font-semibold text-xl text-mainBlack">SuperDealz</p>
          </div>

          <PromoCardCarousel />
        </div>

        {/* show all items */}
        <div className="flex flex-col gap-2 w-full items-center pt-6 mb-[150px]">
          <p className="font-semibold text-xl text-mainBlack ">
            Find Your Style!
          </p>

          <div className="screen-size-wrapper w-[1350px] px-40 py-6 gap-2 grid grid-cols-4">
            {products.slice(0, visibleProducts).map((product) => (
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
          {visibleProducts < products.length && (
            <div
              className="flex items-center justify-center"
              onClick={handleShowMore}
            >
              <div className="flex w-16 h-16 items-center justify-center cursor-pointer m-8">
                <ArrowDown className="text-mainBlack animate-bounce-slow"></ArrowDown>
                <Image
                  src="/icons/circular-show-more.svg"
                  width={64}
                  height={64}
                  alt="show more"
                  className="absolute animate-spin-slow"
                ></Image>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
