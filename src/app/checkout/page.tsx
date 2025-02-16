"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ArrowLeft, Container, Trash, Truck, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const checkoutItems = [
  {
    id: "promo-seasonal-black",
    name: "Seasonal Tee - Black",
    price: 10.99,
    category: "Tops",
    images: ["/images/seasonal-black-1.png", "/images/seasonal-black-2.png"],
    stock: 20, // Adjust as needed
    sizes: ["XS", "S", "M", "L"],
    colours: ["Black"],
    description: "Comfortable Seasonal Tee in Black",
    promo: true,
    disc: "5%",
  },
  {
    id: "promo-os-blue",
    name: "Oversized - Blue",
    price: 10.99,
    category: "Tops",
    images: ["/images/os-blue-1.png", "/images/os-blue-2.png"],
    stock: 10, // Adjust as needed
    sizes: ["M", "L", "XL"],
    colours: ["Blue"],
    description: "Comfortable Oversized Tee in Blue",
    promo: true,
    disc: "5%",
  },
];

const imageGeneratorNum = Math.floor(Math.random() * 6) + 1;

function totalPrice(items: any) {
  return items
    .reduce(
      (total: number, item: { promo: any; disc: string; price: number }) => {
        let discount = 0;

        // Calculate discount if promo is true and discount exists
        if (item.promo && item.disc) {
          const discountValue = parseFloat(item.disc) / 100;
          discount = item.price * discountValue;
        }

        // Subtract discount from price and add to total
        const finalPrice = item.price - discount;
        return total + finalPrice;
      },
      0
    )
    .toFixed(2); // Rounds the total to 2 decimal places for currency
}

const Page = () => {
    const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    // Get the height of the navbar dynamically
    const navbarElement = document.querySelector("nav");
    if (navbarElement) {
      setNavbarHeight(navbarElement.offsetHeight);
    }
  }, []);

  return (
    <div className="justify-center flex flex-col h-screen">
        <div className="flex w-full bg-gray-50">
          
          {/* left side */}
          <div className="w-7/12 min-h-max flex items-center justify-center overflow-hidden">
            <img
              src={`/images/checkout.svg`}
              className="w-8/12"
              alt="checkout"
            ></img>
          </div>
          {/* right side */}

        <div className={`relative w-5/12 text-mainBlack bg-mainWhite shadow-sm m-4 rounded-2xl overflow-hidden border-[1px] border-gray-100`}>
          <ScrollArea className="absolute z-0 mt-16 flex flex-col px-8 h-[calc(100%-185px)]">
            <div className="flex flex-col gap-2 pt-3">
              {checkoutItems.length > 0 ? (
                <div className=" ">
                  {checkoutItems.map((product) => (
                    <div className="relative">
                      <Link
                        href={`/${product.category?.toLowerCase()}/${
                          product.id
                        }`}
                        className="flex gap-3 w-full py-3 bg-mainWhite border-b-[1px] border-gray-100 cursor-pointer"
                      >
                        <Image
                          src={product.images[0]}
                          alt="product image"
                          width={80}
                          height={80}
                          className="aspect-square object-cover rounded-sm"
                        ></Image>
                        <div className="flex items-center justify-between w-full gap-4">
                          <div className="flex flex-col justify-between h-full w-[170px] ">
                            <div className="flex flex-col gap-1 overflow-hidden">
                              <p className="font-medium text-sm">
                                {product.name}
                              </p>
                              <p className="font-light text-xs text-muted-foreground truncate overflow-hidden ">
                                {product.description}
                              </p>
                            </div>

                            <div className="flex gap-2 items-center">
                              <p
                                className={`${
                                  product.disc === "0%"
                                    ? "text-mainBlack"
                                    : "text-primaryRed-600"
                                } font-semibold text-lg`}
                              >
                                ${product.price.toFixed(2)}
                              </p>
                              {product.disc === "0%" ? null : (
                                <div className="text-xs text-primaryRed-600 border-primaryRed-600 border-[1px] rounded-[2px] flex items-center justify-center h-4 w-9">
                                  -{product.disc}
                                </div>
                              )}
                              <p className="text-xs text-muted-foreground">
                                x 1
                              </p>
                            </div>
                          </div>
                          <XIcon className="w-4 h-4 mr-1 opacity-0"></XIcon>
                        </div>
                      </Link>
                      <XIcon className="absolute w-4 h-4 right-4 top-[calc(50%-8px)]"></XIcon>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col gap-5 items-center justify-center">
                  <Image
                    width="240"
                    height="300"
                    src="/images/empty-cart.svg"
                    alt="empty-cart"
                  ></Image>
                  <div className="flex flex-col gap-1 items-center mb-20">
                    <h3 className="font-semibold text-lg">
                      Your cart is empty
                    </h3>
                    <p className="text-muted-foreground text-center text-sm">
                      Whoops! Nothing to show here yet.
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full pt-3 pb-5">
              <h3 className="text-mainBlack text-md font-semibold">
                Shipping Options
              </h3>
              <div className="flex gap-4 w-full p-4 items-center text-mainBlack border-[1px] rounded-md overflow-hidden bg-green-100 border-green-400">
                <Container className="w-5 h-5"></Container>
                <div className="flex justify-between items-center w-full cursor-pointer">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">Pickup in store</p>
                    <p className="text-xs text-muted-foreground">
                      Pickup in 2 days time
                    </p>
                  </div>
                  <p className="font-semibold text-green-900">Free</p>
                </div>
              </div>
              <div className="flex gap-4 w-full p-4 items-center text-gray-400 rounded-md overflow-hidden bg-gray-200">
                <Truck className="w-5 h-5"></Truck>
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">Delivery</p>
                    <p className="text-xs ">
                      Sorry, this service is not supported now
                    </p>
                  </div>
                  <p className="font-semibold">-</p>
                </div>
              </div>
            </div>
          </ScrollArea>
          <div className="absolute top-0 z-10 flex gap-3 items-center borden-b-[1px] shadow-sm w-full px-4 h-16">
            <Link href="./">
              <ArrowLeft className="w-6 h-6"></ArrowLeft>
            </Link>
            <h1 className="text-2xl text-mainBlack font-bold">Checkout</h1>
          </div>
          <div className="absolute bottom-0 z-20 w-full px-8 py-8 bg-mainWhite border-t-[1px] flex items-center justify-between">
            <div className="flex flex-col text-mainBlack">
              <p className="font-normal">Total Price</p>
              <h2 className="font-bold text-2xl">
                ${totalPrice(checkoutItems)}
              </h2>
            </div>
            <Link href="/pay"><Button className="py-6 px-5 rounded-full">Agree and Pay</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
