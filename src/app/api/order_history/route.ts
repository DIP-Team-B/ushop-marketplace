import { NextResponse } from 'next/server';
import { createConnection } from '@/lib/db';  // Assuming you have this helper function for connecting to MySQL

let InvoiceItems = [];

export async function POST(request: Request) {
    try {
        const { id } = await request.json();
        
        const connection = await createConnection();
        
        const length_sql = `
          SELECT * FROM order_table WHERE Account_ID = ?
        `;
        
        const sql = `
          SELECT 
            order_table.ID AS Invoice,
            top_table.*, 
            SUBSTRING(order_table.Date, 1, 10) AS Date, 
            order_table.Status,
            jt.OrderedQuantity,
            'tops' AS Category,
            CONCAT('tops/', top_table.Image_URL) AS ImageURL
          FROM 
            order_table
          JOIN
            JSON_TABLE(order_table.TopList, '$[*]' 
              COLUMNS (
                TopID INT PATH '$[0]',
                OrderedQuantity VARCHAR(10) PATH '$[1].Q'
              )
            ) AS jt
          JOIN 
            top_table
          ON jt.TopID = top_table.ID
          WHERE 
            order_table.Account_ID = 1

          UNION

          SELECT 
            order_table.ID AS Invoice,
            bottom_table.*, 
            SUBSTRING(order_table.Date, 1, 10) AS Date, 
            order_table.Status,
            jt.OrderedQuantity,
            'bottoms' AS Category,
            CONCAT('bottoms/', bottom_table.Image_URL) AS ImageURL
          FROM 
            order_table
          JOIN
            JSON_TABLE(order_table.BottomList, '$[*]' 
              COLUMNS (
                BottomID INT PATH '$[0]',
                OrderedQuantity VARCHAR(10) PATH '$[1].Q'
              )
            ) AS jt
          JOIN 
            bottom_table
          ON jt.BottomID = bottom_table.ID
          WHERE 
            order_table.Account_ID = 1

          UNION

          SELECT 
            order_table.ID AS Invoice,
            accessories_table.*, 
            SUBSTRING(order_table.Date, 1, 10) AS Date, 
            order_table.Status,
            jt.OrderedQuantity,
            'accessories' AS Category,
            CONCAT('accessories/', accessories_table.Image_URL) AS ImageURL
          FROM 
            order_table
          JOIN
            JSON_TABLE(order_table.AccessoriesList, '$[*]' 
              COLUMNS (
                AccessoriesID INT PATH '$[0]',
                OrderedQuantity VARCHAR(10) PATH '$[1].Q'
              )
            ) AS jt
          JOIN 
            accessories_table
          ON jt.AccessoriesID = accessories_table.ID
          WHERE 
            order_table.Account_ID = 1

          UNION

          SELECT 
            order_table.ID AS Invoice,
            others_table.*, 
            SUBSTRING(order_table.Date, 1, 10) AS Date, 
            order_table.Status,
            jt.OrderedQuantity,
            'others' AS Category,
            CONCAT('others/', others_table.Image_URL) AS ImageURL
          FROM 
            order_table
          JOIN
            JSON_TABLE(order_table.OthersList, '$[*]' 
              COLUMNS (
                OthersID INT PATH '$[0]',
                OrderedQuantity VARCHAR(10) PATH '$[1].Q'
              )
            ) AS jt
          JOIN 
            others_table
          ON jt.OthersID = others_table.ID
          WHERE 
            order_table.Account_ID = 1

          ORDER BY 
            Invoice ASC;
        `;
        const [rows_length] = await connection.execute(length_sql, [id]);
        //console.log(rows_length);
        const [rows] = await connection.execute(sql, []);
        //console.log(rows);

        await connection.end();
      
        if (Array.isArray(rows) && rows.length > 0) {
          InvoiceItems = rows.map((row) => ({
            images: '/images/products/'+[row.ImageURL],
            name: row.Name,
            invoice: 'NTU000'+row.Invoice+row.Category+row.ID,
            category: row.Category,
            id: 'NTU000'+row.Invoice+row.Name,
            date: row.Date,
            status: row.Status,
            quantity: row.OrderedQuantity,
            price: row.Price.toFixed(2),
          }));
        }
        console.log("InvoiceItems data:", InvoiceItems);
        return NextResponse.json(InvoiceItems);
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}