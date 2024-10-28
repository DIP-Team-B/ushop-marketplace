"use client"

import { useEffect, useState } from "react";
import Products from "@/components/Products";
import Navbar from "@/components/Navbar";

export default async function Page({ searchParams }) {
    const [accessoryItems, setAccessoryItems] = useState([]);
    const { id } = searchParams;  // Fetch the ID from the search params

    useEffect(() => {
      // Fetching data from API endpoint
      const getAccessorys = async () => {
        try {
          const response = await fetch(`/api/get_products`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              category: 'accessories',
            }),
          });
          const data = await response.json();
          // Assuming data is in the format { success: true, count: 5 }
          if (data.success) {
            setAccessoryItems(data.result); // Extracting the count from the response
          } else {
            console.error(data.error); // Handle error in the response
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      getAccessorys();
    }, []);

  return (
    <>
    <Navbar id={id}/>
    <Products title="Tops" products={accessoryItems} />
    </>
  );
}

