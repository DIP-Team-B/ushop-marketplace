"use client"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";
  import { Card, CardContent } from "@/components/ui/card";
  import { useState } from "react";

const PromoBanner = () => {
    const [isPromoHovered, setPromoHovered] = useState(false);

    return (
        <Carousel
          className="w-full relative"
          onMouseEnter={() => setPromoHovered(true)}
          onMouseLeave={() => setPromoHovered(false)}
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="aspect-[6/1] shadow-none bg-secondBG">
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
          {isPromoHovered && <CarouselPrevious className="absolute left-6 " />}
          {isPromoHovered && <CarouselNext className="absolute right-6" />}
        </Carousel>
    )
}

export default PromoBanner;