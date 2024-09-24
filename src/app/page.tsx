import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HomepageCategoryCards from "@/components/HomepageCategoryCard";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

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
      <div className="screen-size-wrapper w-screen px-40 py-8 gap-6 flex flex-col items-center">
        {/* promotion */}
        <Carousel className="w-full h-64 relative">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="h-64">
                    <CardContent className="flex w-full h-full items-center justify-center p-6">
                      <span className="text-4xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-6" />
          <CarouselNext className="absolute right-6" />
        </Carousel>

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
      </div>
      <Footer />
    </div>
  );
}
