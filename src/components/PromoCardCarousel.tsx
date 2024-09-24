"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PromoCards from "./PromoCard";

const PromoCardCarousel = () => {
  return (
    <Carousel className="w-full relative">
      <CarouselContent >
        {Array.from({ length: 18 }).map((_, index) => (
          <CarouselItem key={index} className="pl-6">
            <div className="p-1">
              <PromoCards
                name="Seasonal Tee - Black Neon"
                price={10}
                image1="seasonal-black-1"
                image2="seasonal-black-2"
                disc="5%"
                id={`promo-${index}`}
              ></PromoCards>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-6 bg-opacity-15" />
      <CarouselNext className="absolute right-6 bg-opacity-15" />
    </Carousel>
  );
};

export default PromoCardCarousel;
