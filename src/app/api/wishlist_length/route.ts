import { NextResponse } from 'next/server';
import { createConnection } from '@/lib/db';  // Assuming you have this helper function for connecting to MySQL

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    const connection = await createConnection();

    const retrieve_sql = `
      SELECT * FROM favourite_table
      WHERE ID = ?;
    `;

    const [rows] = await connection.execute(retrieve_sql, [id]);

     // If no rows are returned, handle it
     if (rows.length === 0) {
        await connection.end();
        return NextResponse.json({ success: false, message: 'No records found' });
    }

    const topLength = rows[0].TopList ? (rows[0].TopList.length - 1) / 2 : 0;
    const bottomLength = rows[0].BottomList ? (rows[0].BottomList.length - 1) / 2 : 0;
    const accessoriesLength = rows[0].AccessoriesList ? (rows[0].AccessoriesList.length - 1) / 2 : 0;
    const othersLength = rows[0].OthersList ? (rows[0].OthersList.length - 1) / 2 : 0;

    const length = topLength + bottomLength + accessoriesLength + othersLength;
    console.log(length);
    await connection.end();

    return NextResponse.json({ 
        success: true, 
        count: length
    });
  } catch (error) {
    console.error("Error fetching order list:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}