"use client"

import { useEffect, useState } from "react";
import Products from "@/components/Products";

export default function Page() {
    const [topItems, setTopItems] = useState([]);

    useEffect(() => {
      // Fetching data from API endpoint
      const getTops = async () => {
        try {
          const response = await fetch(`/api/get_products`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              category: 'tops'
            }),
          });
          const data = await response.json();
          // Assuming data is in the format { success: true, count: 5 }
          if (data.success) {
            setTopItems(data.result); // Extracting the count from the response
          } else {
            console.error(data.error); // Handle error in the response
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      getTops();
    }, []);

  return (
    <Products title="Tops" products={topItems} />
  );


  
}
