import { NextResponse } from 'next/server';
import { createConnection } from "@/lib/db";
import { Product } from '@/components/Products';

export async function POST(request: Request) {


  try {
    const { category } = await request.json();
    let productList: Product[] = [];

    const connection = await createConnection();
    console.log("Database connection established");

    let selectQuery = "";

    switch (category) {
      case "tops":
        selectQuery = `
          SELECT * FROM top_table;
        `;
        break;
      case "bottoms":
        selectQuery = `
          SELECT * FROM bottom_table 
        `;
        break;
      case "accessories":
        selectQuery = `
          SELECT * FROM accessories_table 
        `;
        break;
      case "others":
        selectQuery = `
          SELECT * FROM others_table 
        `;
        break;
      default:
        throw new Error("Invalid category");
    }

    const [result] = await connection.execute(selectQuery);
    console.log("Query executed successfully", result);

    if (Array.isArray(result) && result.length > 0) {
      productList = result.map((product) => ({
        id: product.ID,
        name: product.Name, 
        size: product.Size,
        price: product.Price, 
        quantity: product.Quantity, 
        images: ['/images/'+[product.Image_URL]],
        desc: product.Description,
        stock: 9,
        sizes: ["XS", "S", "M", "L"],
        colours: ["Black", "Red", "Navy", "Green"],
        description: "Comfortable",
        disc: "0%",
        promo: false,
        category: category,
        liked: false
      }));
    }

    await connection.end();

    return NextResponse.json({ success: true, result: productList });
  } catch (error) {
    console.error("Error in POST function", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}