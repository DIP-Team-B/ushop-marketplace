import { NextResponse } from 'next/server';
import { createConnection } from "c:/ushop-marketplace/src/lib/db";

export async function POST(request: Request) {
  const { name, price, category, quantity, sizes, description, promo, disc, imageurl } = await request.json();

  // Validate input fields
  const missingFields = [];
  if (!name) missingFields.push("name");
  if (!price) missingFields.push("price");
  if (!category) missingFields.push("category");
  if (!quantity) missingFields.push("quantity");
  if (!sizes) missingFields.push("sizes");
  if (!description) missingFields.push("description");
  if (!imageurl) missingFields.push("imageurl");

  if (missingFields.length > 0) {
    console.error("Missing required fields:", missingFields.join(", "));
    return NextResponse.json({ success: false, error: `Missing required fields: ${missingFields.join(", ")}` }, { status: 400 });
  }

  // Validate category
  const validCategories = ['tops', 'bottom', 'accessories', 'other'];
  if (!validCategories.includes(category)) {
    console.error("Invalid category:", category);
    return NextResponse.json({ success: false, error: `Invalid category. Must be one of: ${validCategories.join(", ")}` }, { status: 400 });
  }

  let connection; // Declare connection here

  try {
    connection = await createConnection(); // Initialize connection
    console.log("Database connection established");

    let insertQuery = "";
    let queryParams = [];

    // Construct SQL query based on category
    switch (category) {
      case "tops":
        insertQuery = `
          INSERT INTO top_table (Name, Size, Price, Quantity, Image_URL, Description, Promo, Discount) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        queryParams = [name, sizes.join(","), parseFloat(price), parseInt(quantity), imageurl, description, promo || null, disc || null];
        break;
      case "bottom":
        insertQuery = `
          INSERT INTO bottom_table (Name, Size, Price, Quantity, Image_URL, Description, Promo, Discount) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        queryParams = [name, sizes.join(","), parseFloat(price), parseInt(quantity), imageurl, description, promo || null, disc || null];
        break;
      case "accessories":
        insertQuery = `
          INSERT INTO accessories_table (Name, Size, Price, Quantity, Image_URL, Description, Promo, Discount) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        queryParams = [name, sizes.join(","), parseFloat(price), parseInt(quantity), imageurl, description, promo || null, disc || null];
        break;
      case "other":
        insertQuery = `
          INSERT INTO others_table (Name, Size, Price, Quantity, Image_URL, Description, Promo, Discount) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        queryParams = [name, sizes.join(","), parseFloat(price), parseInt(quantity), imageurl, description, promo || null, disc || null];
        break;
      default:
        throw new Error(`Invalid category. Must be one of: ${validCategories.join(", ")}`);
    }

    // Execute the query
    const [result] = await connection.execute(insertQuery, queryParams);
    console.log("Query executed successfully", result);

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Error in POST function", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  } finally {
    if (connection) {
      connection.end(); // Close connection if it was established
    }
  }
}