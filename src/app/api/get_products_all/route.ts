import { NextResponse } from 'next/server';
import { createConnection } from "@/lib/db";
import { Product } from '@/components/Products';
import { products } from '@/app/productsData';

export async function POST(request: Request) {


  try {
    const { id } = await request.json();
    let productsList = [];

    const connection = await createConnection();
    console.log("Database connection established");

    const sql = `
        SELECT *,
        'tops' AS Category,
        CASE 
            WHEN JSON_CONTAINS(favourite_table.TopList, CAST(top_table.ID AS JSON), '$') THEN true
            ELSE false 
        END AS liked
        FROM 
            top_table
        LEFT JOIN 
            favourite_table 
        ON 
            favourite_table.ID = ?

        UNION

        SELECT *,
        'bottoms' AS Category,
        CASE 
            WHEN JSON_CONTAINS(favourite_table.BottomList, CAST(bottom_table.ID AS JSON), '$') THEN true
            ELSE false 
        END AS liked 
        FROM 
            bottom_table
        LEFT JOIN 
            favourite_table 
        ON 
            favourite_table.ID = ?

        UNION

        SELECT *, 
        'accessories' AS Category,
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

        UNION

        SELECT *, 
        'others' AS Category,
        CASE 
            WHEN JSON_CONTAINS(favourite_table.OthersList, CAST(others_table.ID AS JSON), '$') THEN true
            ELSE false 
        END AS liked
        FROM 
            others_table
        LEFT JOIN 
            favourite_table 
        ON 
            favourite_table.ID = ?;
    `;

    const [result] = await connection.execute(sql, [id,id,id,id]);
    await connection.end();
    console.log("Query executed successfully", result);

    if (Array.isArray(result) && result.length > 0) {
        productsList = result.map(item => ({
            id: item.ID,
            name: item.Name, 
            size: item.Size,
            price: item.Price, 
            images: ["/images/anni_shorts/annishorts.jpg", "/images/anni_shorts/annishorts.jpg"],
            description: item.Description,
            stock: item.Quantity,
            disc: "0%",
            promo: false,
            category: item.Category,
            liked: item.liked
        }));
    }

    console.log(productsList);

    return NextResponse.json({ success: true, result: productsList });
  } catch (error) {
    console.error("Error in POST function", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}