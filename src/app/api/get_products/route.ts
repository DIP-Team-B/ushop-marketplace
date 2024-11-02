import { NextResponse } from 'next/server';
import { createConnection } from "@/lib/db";
import { Product } from '@/components/Products';

export async function POST(request: Request) {


  try {
    const { id, category, role } = await request.json();
    let productList: Product[] = [];

    const connection = await createConnection();
    console.log("Database connection established");

    let selectQuery = "";

    switch (category) {
      case "tops":
        selectQuery = `
          SELECT 
            top_table.ID AS ProductID,
            top_table.*,
            'tops' AS Category,
            favourite_table.ID AS userID,
          CASE 
            WHEN JSON_CONTAINS(favourite_table.TopList, CAST(top_table.ID AS JSON), '$') THEN true
            ELSE false 
          END AS liked
          FROM 
            top_table
          LEFT JOIN 
		      	favourite_table 
		      ON 
			      favourite_table.ID = ?;
        `;
        break;
      case "bottoms":
        selectQuery = `
          SELECT 
            bottom_table.ID AS ProductID,
            bottom_table.*,
            'bottoms' AS Category,
            favourite_table.ID AS userID,
          CASE 
            WHEN JSON_CONTAINS(favourite_table.BottomList, CAST(bottom_table.ID AS JSON), '$') THEN true
            ELSE false 
          END AS liked 
          FROM 
            bottom_table
          LEFT JOIN 
		      	favourite_table 
		      ON 
		      	favourite_table.ID = ?; 
        `;
        break;
      case "accessories":
        selectQuery = `
          SELECT 
            accessories_table.ID AS ProductID,
            accessories_table.*, 
            'accessories' AS Category,
            favourite_table.ID AS userID,
          CASE 
            WHEN JSON_CONTAINS(favourite_table.AccessoriesList, CAST(accessories_table.ID AS JSON), '$') THEN true
            ELSE false 
          END AS liked  
          FROM 
            accessories_table
          LEFT JOIN 
			      favourite_table 
		      ON 
			      favourite_table.ID = ?
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

    const [result] = await connection.execute(selectQuery,[id]);
    console.log("Query executed successfully", result);

    if(role){
      if (Array.isArray(result) && result.length > 0) {
        productList = result.map((product) => ({
          id: product.ID,
          name: product.Name + " " + product.Size, 
          size: product.Size,
          price: product.Price, 
          quantity: product.Quantity, 
          images: JSON.parse(product.Image_URL),
          desc: product.Description,
          sizes: product.Size,
          description: "Comfortable",
          disc: product.Discount,
          promo: false,
          category: category,
          liked: product.liked
        }));
      }
    }
    else {
      if (Array.isArray(result) && result.length > 0) {
        productList = result.map((product) => ({
          id: product.ID,
          name: product.Name, 
          size: product.Size,
          price: product.Price, 
          quantity: product.Quantity, 
          images: JSON.parse(product.Image_URL),
          desc: product.Description,
          sizes: product.Size,
          description: "Comfortable",
          disc: '0%',
          promo: false,
          category: category,
          liked: product.liked
        }));
      }
    }
      

    await connection.end();

    return NextResponse.json({ success: true, result: productList });
  } catch (error) {
    console.error("Error in POST function", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}