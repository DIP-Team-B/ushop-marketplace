"use client"

import { useEffect, useState } from "react";
import Products from "@/components/Products";

export default function Page() {
    const [accessoryItems, setAccessoryItems] = useState([]);

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
    <Products title="Tops" products={accessoryItems} />
  );
}

