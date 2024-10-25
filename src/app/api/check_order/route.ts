import { NextResponse } from 'next/server';
import { createConnection } from "c:/ushop-marketplace/src/lib/db";

export async function GET(request: Request) {
  let connection;

  try {
    connection = await createConnection();
    console.log("Database connection established");

    const [rows] = await connection.execute("SELECT * FROM order_table");
    console.log("Orders fetched successfully", rows);

    return NextResponse.json({ success: true, data: rows });
  } catch (error: any) {
    console.error("Error in GET function", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  } finally {
    if (connection) {
      connection.end();
    }
  }
}

export async function PUT(request: Request) {
  const { invoice, status } = await request.json();

  if (!invoice || !status) {
    return NextResponse.json({ success: false, error: "Invoice and status are required" }, { status: 400 });
  }

  let connection;

  try {
    connection = await createConnection();
    console.log("Database connection established");

    const [result] = await connection.execute(
      "UPDATE order_table SET Status = ? WHERE Invoice = ?",
      [status, invoice]
    );
    console.log("Order status updated successfully", result);

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Error in PUT function", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  } finally {
    if (connection) {
      connection.end();
    }
  }
}