import { NextResponse } from 'next/server';
import { createConnection } from "@/lib/db";
import { Product } from '@/components/Products';
import { products } from '@/app/productsData';

export async function POST(request: Request) {


  try {
    const { category, id } = await request.json();
    let productItem: Product = {
        id: 0,
        name: '',
        price: 0,
        images: '',
        category: ''
    };

    const connection = await createConnection();
    console.log("Database connection established");

    let selectQuery = "";

    switch (category) {
      case "tops":
        selectQuery = `
          SELECT * FROM top_table WHERE ID = ?;
        `;
        break;
      case "bottoms":
        selectQuery = `
          SELECT * FROM bottom_table WHERE ID = ?;
        `;
        break;
      case "accessories":
        selectQuery = `
          SELECT * FROM accessories_table WHERE ID = ?;
        `;
        break;
      case "others":
        selectQuery = `
          SELECT * FROM others_table WHERE ID = ?;
        `;
        break;
      default:
        throw new Error("Invalid category");
    }

    const [result] = await connection.execute(selectQuery, [id]);
    console.log("Query executed successfully", result);

    if (Array.isArray(result) && result.length > 0) {
       productItem = {
        id: result[0].ID,
        name: result[0].Name, 
        size: result[0].Size,
        price: result[0].Price, 
        quantity: 10, 
        images: ["/images/anni_shorts/annishorts.jpg", "/images/anni_shorts/annishorts.jpg"],
        description: result[0].Description,
        stock: 9,
        sizes: ["XS", "S", "M", "L"],
        colours: ["Black", "Red", "Navy", "Green"],
        disc: "0%",
        promo: false,
        category: category,
        liked: false
      };
    }

    await connection.end();

    return NextResponse.json({ success: true, result: productItem });
  } catch (error) {
    console.error("Error in POST function", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}