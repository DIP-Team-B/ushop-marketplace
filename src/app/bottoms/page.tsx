"use client";

import { useEffect, useState } from "react";
import Products from "@/components/Products";
import Navbar from "@/components/Navbar";

export default function Page({ searchParams }) {
    const [bottomItems, setBottomItems] = useState([]);
    const { id } = searchParams;  // Fetch the ID from the search params

    useEffect(() => {
      // Fetching data from API endpoint
      const getBottoms = async () => {
        try {
          const response = await fetch(`/api/get_products`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              category: 'bottoms',
            }),
          });
          const data = await response.json();
          // Assuming data is in the format { success: true, count: 5 }
          if (data.success) {
            setBottomItems(data.result); // Extracting the count from the response
          } else {
            console.error(data.error); // Handle error in the response
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      getBottoms();
    }, []);

  return (
    <>
    <Navbar id={id}/>
    <Products title="Bottoms" products={bottomItems} userid={id} />
    </>
  );
}
