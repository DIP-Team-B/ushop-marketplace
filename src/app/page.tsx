"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HomepageCategoryCards from "@/components/HomepageCategoryCard";
import PromoBanner from "@/components/PromoBanner";
import PromoCardCarousel from "@/components/PromoCardCarousel";

export default function Home() {
  const categoryItems = [
    { title: "Tops", id: "tops" },
    { title: "Bottoms", id: "bottoms" },
    { title: "Accessories", id: "accessories" },
    { title: "Others", id: "others" },
  ];

  return (
    <div className="justify-center">
      <Navbar />
      {/* screen size */}
      <div className="screen-size-wrapper w-screen px-40 py-6 gap-4 flex flex-col items-center">
        {/* promotion */}
        <PromoBanner></PromoBanner>

        {/* category cards */}
        <div className="flex flex-col gap-2 w-full items-center pt-6">
          <p className="font-semibold text-xl text-mainBlack">#ShopByMood</p>
          <div className="flex flex-col lg:flex-row p-4 gap-4 bg-secondBG w-full rounded-md items-center">
            {categoryItems.map((item) => (
              <HomepageCategoryCards
                key={item.id}
                title={item.title}
                id={item.id}
              />
            ))}
          </div>
        </div>

        {/* promo */}
        <div className="flex flex-col gap-2 w-full items-center pt-6">
          <div className="flex items-center gap-1">
            <p className="animate-bounce mr-1 font-semibold text-xl text-mainBlack">
              🔥
            </p>
            <p className="font-semibold text-xl text-mainBlack ">SuperDealz</p>
          </div>

          <PromoCardCarousel></PromoCardCarousel>
        </div>
      </div>
      <Footer />
    </div>
  );
}
