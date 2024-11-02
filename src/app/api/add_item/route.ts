import { NextResponse } from 'next/server';
import { createConnection } from "@/lib/db";

export async function POST(request: Request) {
  const { name, price, category, quantity, sizes, description, disc, imageurl1, imageurl2 } = await request.json();

  console.log(disc);
  //Validate input fields
  const missingFields = [];
  if (!name) missingFields.push("name");
  if (!price) missingFields.push("price");
  if (!category) missingFields.push("category");
  if (!quantity) missingFields.push("quantity");
  if (!sizes) missingFields.push("sizes");
  if (!description) missingFields.push("description");
  if (!imageurl1) missingFields.push("imageurl");
  if (!imageurl2) missingFields.push("imageurl");

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
    let result;

    // Construct SQL query based on category
    switch (category) {
      case "tops":
        insertQuery = `
          INSERT INTO top_table (Name, Size, Price, Quantity, Image_URL, Description, Discount) 
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        break;
      case "bottom":
        insertQuery = `
          INSERT INTO bottom_table (Name, Size, Price, Quantity, Image_URL, Description, Discount) 
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        break;
      case "accessories":
        insertQuery = `
          INSERT INTO accessories_table (Name, Size, Price, Quantity, Image_URL, Description, Discount) 
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        break;
      case "other":
        insertQuery = `
          INSERT INTO others_table (Name, Size, Price, Quantity, Image_URL, Description, Discount) 
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        break;
      default:
        throw new Error(`Invalid category. Must be one of: ${validCategories.join(", ")}`);
    }

    // Loop through sizes and insert each size as a new row
    for (const size of sizes) {
      const queryParams = [name, size, parseFloat(price), parseInt(quantity), imageurl, description, disc || null];
      [result] = await connection.execute(insertQuery, queryParams);
      console.log(`Inserted size ${size} successfully`, result);
    }
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