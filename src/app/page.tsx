import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HomepageCategoryCards from "@/components/HomepageCategoryCard";
import Image from "next/image";

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
      {/* Category Cards */}
      {/* <div className="flex p-4 gap-4 bg-secondBG w-screen">
        {categoryItems.map((item, index) => (
          <HomepageCategoryCards
            key={index}
            title={item.title}
            id={item.id}
          />
        ))}
        
      </div> */}
      {/* screen size */}
      <div className="screen-size-wrapper w-screen px-40 py-8 gap-6 flex flex-col">
        {/* promotion */}

        {/* category cards */}
        <div className="flex flex-col gap-3 items-center">
          <p className="font-semibold text-xl">#ShopByMood</p>
        </div>
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
      <Footer />
    </div>
  );
}
