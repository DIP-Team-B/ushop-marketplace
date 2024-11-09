import { NextResponse } from 'next/server';
import { createConnection } from "@/lib/db";
import { Product } from '@/components/Products';
import { products } from '@/app/productsData';

export async function POST(request: Request) {


  try {
    const { id, role } = await request.json();
    //console.log(id);
    let productsList = [];
    let disc = "";
    console.log(id);

    //console.log(disc);

    const connection = await createConnection();
    console.log("Database connection established");
    
    if(id === "") {
        const sql = `
        SELECT 
            top_table.ID AS ProductID,
            top_table.*,
            'tops' AS Category
        FROM 
            top_table

        UNION

        SELECT 
            bottom_table.ID AS ProductID,
            bottom_table.*,
            'bottoms' AS Category
        FROM 
            bottom_table

        UNION

        SELECT 
            accessories_table.ID AS ProductID,
            accessories_table.*, 
            'accessories' AS Category
        FROM 
            accessories_table

        UNION

        SELECT 
            others_table.ID AS ProductID,
            others_table.*, 
            'others' AS Category
        FROM 
            others_table;
        `;

        const [result] = await connection.execute(sql, []);
        await connection.end();
        //console.log("Query executed successfully", result);
        if(role) {
            if (Array.isArray(result) && result.length > 0) {
                productsList = result.map(item => ({
                    id: item.ProductID,
                    name: item.Name, 
                    size: item.Size,
                    price: item.Price, 
                    images: JSON.parse(item.Image_URL),
                    description: item.Description,
                    quantity: item.Quantity,
                    disc: item.Discount,
                    promo: false,
                    category: item.Category,
                    liked: item.liked,
                    userID: id,
                }));
            }
        }
        else {
            if (Array.isArray(result) && result.length > 0) {
                productsList = result.map(item => ({
                    id: item.ProductID,
                    name: item.Name, 
                    size: item.Size,
                    price: item.Price, 
                    images: JSON.parse(item.Image_URL),
                    description: item.Description,
                    quantity: item.Quantity,
                    disc: "0%",
                    promo: false,
                    category: item.Category,
                    liked: item.liked,
                    userID: id,
                }));
            }
        }
    }
    else {
        const sql = `
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
			favourite_table.ID = ?

        UNION

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
			favourite_table.ID = ?

        UNION

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

        UNION

        SELECT 
            others_table.ID AS ProductID,
            others_table.*, 
            'others' AS Category,
             favourite_table.ID AS userID,
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
        //console.log("Query executed successfully", result);
        if(role) {
            if (Array.isArray(result) && result.length > 0) {
                productsList = result.map(item => ({
                    id: item.ProductID,
                    name: item.Name, 
                    size: item.Size,
                    price: item.Price, 
                    images: JSON.parse(item.Image_URL),
                    description: item.Description,
                    quantity: item.Quantity,
                    disc: item.Discount,
                    promo: false,
                    category: item.Category,
                    liked: item.liked,
                    userID: id,
                }));
            }
        }
        else {
            if (Array.isArray(result) && result.length > 0) {
                productsList = result.map(item => ({
                    id: item.ProductID,
                    name: item.Name, 
                    size: item.Size,
                    price: item.Price, 
                    images: JSON.parse(item.Image_URL),
                    description: item.Description,
                    quantity: item.Quantity,
                    disc: "0%",
                    promo: false,
                    category: item.Category,
                    liked: item.liked,
                    userID: id,
                }));
            }
        }
    }
    
    //console.log(productsList);

    return NextResponse.json({ success: true, result: productsList });
  } catch (error) {
    console.error("Error in POST function", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}