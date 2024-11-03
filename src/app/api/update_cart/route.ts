import { NextResponse } from 'next/server';
import { createConnection } from '@/lib/db';  // Assuming you have this helper function for connecting to MySQL

export async function POST(request: Request) {
  try {
    const { id, cartItemId, category, action } = await request.json();

    const connection = await createConnection();
    const retrieve_sql = `
      SELECT * FROM shoppingcart_table
      WHERE shoppingcart_table.ID = ?;
    `;

    const [rows] = await connection.execute(retrieve_sql, [id]);

    if (rows && rows.length > 0 ) {
        //Update Top_list
        if (category === "tops") {
            const update_top_sql = `
            UPDATE shoppingcart_table 
            SET TopList = ?
            WHERE ID = ?;
            `;

            let topList = rows[0].TopList;
            if (action == "add") {
                topList = (topList && topList.length > 0) ? topList + ',' + cartItemId : cartItemId;
            } else {
              const idsArray = topList.split(',').map(id => id.trim()); // Split and trim the IDs
              topList = idsArray.filter((item: number) => item != cartItemId).join(',');
              
            }
            console.log("toplist updated" + topList);

            await connection.execute(update_top_sql, [topList, id]);
        }

        //Update Bottom_list
        if (category === "bottoms") {
            const update_bottom_sql = `
            UPDATE shoppingcart_table 
            SET BottomList = ?
            WHERE ID = ?;
            `;
            
            let bottomList = rows[0].BottomList;
            if (action == "add") {
                bottomList = (bottomList && bottomList.length > 0) ? bottomList + ',' + cartItemId : cartItemId;
            } else {
                const idsArray = bottomList.split(',').map(id => id.trim()); // Split and trim the IDs
                bottomList = idsArray.filter((item: number) => item != cartItemId).join(',');
            }
            console.log("bottomList updated" + bottomList);

            await connection.execute(update_bottom_sql, [bottomList, id]);
        }

        //Update Accessories_list
        if (category === "accessories") {
        const update_accessories_sql = `
            UPDATE shoppingcart_table 
            SET AccessoriesList = ?
            WHERE ID = ?;
        `;
        
        let accessoriesList = rows[0].AccessoriesList;
        if (action == "add") {
            accessoriesList = (accessoriesList && accessoriesList.length > 0) ? accessoriesList + ',' + cartItemId : cartItemId;
        } else {
            const idsArray = accessoriesList.split(',').map(id => id.trim()); // Split and trim the IDs
            accessoriesList = idsArray.filter((item: number) => item != cartItemId).join(',');
        }
        console.log("accessoriesList updated" + accessoriesList);

        await connection.execute(update_accessories_sql, [accessoriesList, id]);
        }

        //Update Others_list
        if (category === "others") {
        const update_others_sql = `
            UPDATE shoppingcart_table 
            SET OthersList = ?
            WHERE ID = ?;
        `;

        let othersList = rows[0].OthersList;
        if (action == "add") {
            othersList = (othersList && othersList.length > 0) ? othersList + ',' + cartItemId : cartItemId;
        } else {
            const idsArray = othersList.split(',').map(id => id.trim()); // Split and trim the IDs
            othersList = idsArray.filter((item: number) => item != cartItemId).join(',');
        }
        console.log("othersList updated" + othersList);

        await connection.execute(update_others_sql, [othersList, id]);
        }
    } else {

        const insert_cart_sql = `
        INSERT INTO shoppingcart_table
        (TopList, BottomList, AccessoriesList, OthersList)
        VALUES (?, ?, ?, ?);`;

        let insertvalue = [];

        switch (category) {
            case "tops":
              insertvalue = [cartItemId, null, null, null];
              break;
            case "bottoms":
              insertvalue = [null, cartItemId, null, null];
              break;
            case "accessories":
              insertvalue = [null, null, cartItemId, null];
              break;
            case "others":
              insertvalue = [null, null, null, cartItemId];
              break;
            default:
              throw new Error("Invalid category");
            }
            
        await connection.execute(insert_cart_sql, insertvalue);
    }

    await connection.end();
    console.log('Proceeding')
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating wishlist:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}