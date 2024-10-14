"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PromoCards from "./PromoCard";
import { products } from "@/app/productsData";

// const promoItems = [
//   {
//     name: "Seasonal Tee - Black",
//     price: 10.99,
//     image2: "seasonal-black-1",
//     image1: "seasonal-black-2",
//     disc: "5%",
//     id: "promo-seasonal-black",
//   },
//   {
//     name: "Cap",
//     price: 10.99,
//     image2: "cap-1",
//     image1: "cap-2",
//     disc: "5%",
//     id: "promo-cap",
//   },
//   {
//     name: "Crew Neck - Blue",
//     price: 10.99,
//     image2: "crewnecks-blue-1",
//     image1: "crewnecks-blue-2",
//     disc: "5%",
//     id: "promo-crewnecks-blue",
//   },
//   {
//     name: "Crew Neck - Beige",
//     price: 10.99,
//     image2: "crewnecks-beige-1",
//     image1: "crewnecks-beige-2",
//     disc: "5%",
//     id: "promo-crewnecks-beige",
//   },
//   {
//     name: "Oversized - Blue",
//     price: 10.99,
//     image2: "os-blue-1",
//     image1: "os-blue-2",
//     disc: "5%",
//     id: "promo-os-blue",
//   },
//   {
//     name: "Oversized - Beige",
//     price: 10.99,
//     image2: "os-beige-1",
//     image1: "os-beige-2",
//     disc: "5%",
//     id: "promo-os-beige",
//   },
//   {
//     name: "V Neck - Blue",
//     price: 10.99,
//     image2: "vneck-blue-1",
//     image1: "vneck-blue-2",
//     disc: "5%",
//     id: "promo-vneck-blue",
//   },
//   {
//     name: "V Neck - Beige",
//     price: 10.99,
//     image2: "vneck-beige-1",
//     image1: "vneck-beige-2",
//     disc: "5%",
//     id: "promo-vneck-beige",
//   },
//   {
//     name: "Varsity",
//     price: 10.99,
//     image2: "varsity-1",
//     image1: "varsity-2",
//     disc: "5%",
//     id: "promo-varsity",
//   },
//   {
//     name: "Seasonal Tee - Pink",
//     price: 10.99,
//     image2: "seasonal-pink-1",
//     image1: "seasonal-pink-2",
//     disc: "5%",
//     id: "promo-seasonal-pink",
//   },
//   {
//     name: "Seasonal Tee - Purple",
//     price: 10.99,
//     image2: "seasonal-purple-1",
//     image1: "seasonal-purple-2",
//     disc: "5%",
//     id: "promo-seasonal-purple",
//   },
//   {
//     name: "Socks",
//     price: 10.99,
//     image2: "socks-1",
//     image1: "socks-2",
//     disc: "5%",
//     id: "promo-socks",
//   },
  
// ];

const PromoCardCarousel = () => {
  const promoItems = products.filter((item) => Boolean(item.promo));
  return (
    <Carousel className="w-full relative px-0">
      <CarouselContent className="px-0 -ml-4 ">
        {promoItems.map((item) => (
          <CarouselItem key={item.id} className="basis-1/8 pl-4">
            <PromoCards
              name={item.name}
              price={item.price}
              images={item.images}
              disc={item.disc}
              id={item.id}
              category={item.category}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="bg-opacity-15" />
      <CarouselNext className="bg-opacity-15" />
    </Carousel>
  );
};

export default PromoCardCarousel;
