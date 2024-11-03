import { NextResponse } from 'next/server';
import { createConnection } from '@/lib/db';  // Assuming you have this helper function for connecting to MySQL
import { Product } from '@/components/Products';

export async function POST(request: Request) {
  try {
    const { orderItems, paymentDetail, collectionMode, cartId } = await request.json();

    const connection = await createConnection();

    let topList = "";
    let bottomList = "";
    let accessoriesList = "";
    let othersList = "";

    if (orderItems && orderItems.length > 0) {
        orderItems.forEach(async (product: Product) => {
            switch(product.category) {
                case "tops": 
                    topList = (topList.length > 0) ? topList + ',' + product.id.toString() : product.id.toString();
                    let update_top_sql = `
                    WITH current_quantity AS (
                    SELECT Quantity FROM top_table WHERE ID = ?
                    )
                    UPDATE top_table
                    SET Quantity = (SELECT Quantity FROM current_quantity) - ?
                    WHERE ID = ?;
                    `;

                    await connection.execute(update_top_sql, [product.count, product.id, product.id]);
                    break;
                case "bottoms": 
                    bottomList = (bottomList.length > 0) ? bottomList + ',' + product.id.toString() : product.id.toString();
                    let update_bottom_sql = `
                    WITH current_quantity AS (
                    SELECT Quantity FROM bottom_table WHERE ID = ?
                    )
                    UPDATE bottom_table
                    SET Quantity = (SELECT Quantity FROM current_quantity) - ?
                    WHERE ID = ?;
                    `;

                    await connection.execute(update_bottom_sql, [product.count, product.id, product.id]);
                    break;
                case "accessories": 
                    accessoriesList = (accessoriesList.length > 0) ? accessoriesList + ',' + product.id.toString() : product.id.toString();
                    let update_accessories_sql = `
                    WITH current_quantity AS (
                    SELECT Quantity FROM accessories_table WHERE ID = ?
                    )
                    UPDATE accessories_table
                    SET Quantity = (SELECT Quantity FROM current_quantity) - ?
                    WHERE ID = ?;
                    `;

                    await connection.execute(update_accessories_sql, [product.count, product.id, product.id]);

                    break;
                case "others": 
                    othersList = (othersList.length > 0) ? othersList + ',' + product.id.toString() : product.id.toString();
                    let update_others_sql = `
                    WITH current_quantity AS (
                    SELECT Quantity FROM others_table WHERE ID = ?
                    )
                    UPDATE others_table
                    SET Quantity = (SELECT Quantity FROM current_quantity) - ?
                    WHERE ID = ?;
                    `;

                    await connection.execute(update_others_sql, [product.count, product.id, product.id]);
                    break;
                default:
                    throw new Error("Invalid category");
            }
        });
    }
    
    const insert_order_sql = `
        INSERT INTO order_table
        (TopList, BottomList, AccessoriesList, OthersList, PaymentDetail, CollectionMode)
        VALUES (?, ?, ?, ?, ?, ?);`;

    await connection.execute(insert_order_sql, [topList, bottomList, accessoriesList, othersList, paymentDetail, collectionMode]);

    const update_shoppingcart_sql = `
        DELETE from shoppingcart_table 
        where ID = ?;
    `;

    await connection.execute(update_shoppingcart_sql, [cartId]);

    await connection.end();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating wishlist:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}