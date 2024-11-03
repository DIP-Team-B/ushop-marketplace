import { NextResponse } from 'next/server';
import { createConnection } from "@/lib/db";
import { Product } from '@/components/Products';

export async function POST(request: Request) {

  try {
    const { id } = await request.json();
    let cartList: Product[] = [];

    const connection = await createConnection();
    console.log("Database connection established");

    const retrieve_sql = `
      SELECT * FROM shoppingcart_table
      WHERE shoppingcart_table.ID = ?;
    `;

    const [rows] = await connection.execute(retrieve_sql, [id]);
    if (rows && rows.length > 0 ) {
        let topList = rows[0].TopList;
        let bottomList = rows[0].BottomList;
        let accessoriesList = rows[0].AccessoriesList;
        let othersList = rows[0].OthersList;
        
        if (topList && topList.length > 0) {

            const idsArray = topList.split(',').map(id => id.trim()); // Split and trim the IDs
            // Create placeholders based on the number of IDs
            const placeholders = idsArray.map(() => '?').join(', ');

            let selectQuery = `
            SELECT * 
            FROM top_table
            WHERE ID IN (${placeholders});
            `;

            const [tops] = await connection.execute(selectQuery, idsArray);
            if (Array.isArray(tops) && tops.length > 0) {
                tops.forEach((product) => {
                    cartList.push({
                        id: product.ID,
                        name: product.Name, 
                        size: product.Size,
                        price: product.Price, 
                        quantity: 10, 
                        images: ["/images/anni_shorts/annishorts.jpg"],
                        stock: 9,
                        sizes: ["XS", "S", "M", "L"],
                        colours: ["Black", "Red", "Navy", "Green"],
                        description: product.Description,
                        disc: "0%",
                        promo: false,
                        category: 'tops',
                        liked: false,
                        count: idsArray.filter(id => id == product.ID).length
                    });
                }); 
            }
        }

        if (bottomList && bottomList.length > 0) {

            const idsArray = bottomList.split(',').map(id => id.trim()); // Split and trim the IDs
            // Create placeholders based on the number of IDs
            const placeholders = idsArray.map(() => '?').join(', ');

            let selectQuery = `
            SELECT * 
            FROM bottom_table
            WHERE ID IN (${placeholders});
            `;

            const [bottoms] = await connection.execute(selectQuery, idsArray);
            if (Array.isArray(bottoms) && bottoms.length > 0) {
                bottoms.forEach((product) => {
                    cartList.push({
                        id: product.ID,
                        name: product.Name, 
                        size: product.Size,
                        price: product.Price, 
                        quantity: 10, 
                        images: ["/images/anni_shorts/annishorts.jpg"],
                        stock: 9,
                        sizes: ["XS", "S", "M", "L"],
                        colours: ["Black", "Red", "Navy", "Green"],
                        description: product.Description,
                        disc: "0%",
                        promo: false,
                        category: 'bottoms',
                        liked: false,
                        count: idsArray.filter(id => id == product.ID).length
                    });
                }); 
            }
        }

        if (accessoriesList && accessoriesList.length > 0) {

            const idsArray = accessoriesList.split(',').map(id => id.trim()); // Split and trim the IDs
            // Create placeholders based on the number of IDs
            const placeholders = idsArray.map(() => '?').join(', ');

            let selectQuery = `
            SELECT * 
            FROM accessories_table
            WHERE ID in (${placeholders});
            `;

            const [accessories] = await connection.execute(selectQuery, idsArray);
            if (Array.isArray(accessories) && accessories.length > 0) {
                accessories.forEach((product) => {
                    cartList.push({
                        id: product.ID,
                        name: product.Name, 
                        size: product.Size,
                        price: product.Price, 
                        quantity: 10, 
                        images: ["/images/anni_shorts/annishorts.jpg"],
                        stock: 9,
                        sizes: ["XS", "S", "M", "L"],
                        colours: ["Black", "Red", "Navy", "Green"],
                        description: product.Description,
                        disc: "0%",
                        promo: false,
                        category: 'accessories',
                        liked: false,
                        count: idsArray.filter(id => id == product.ID).length
                    });
                }); 
            }
        }

        if (othersList && othersList.length > 0) {

            const idsArray = othersList.split(',').map(id => id.trim()); // Split and trim the IDs
            // Create placeholders based on the number of IDs
            const placeholders = idsArray.map(() => '?').join(', ');

            let selectQuery = `
            SELECT * 
            FROM others_table
            WHERE ID in (${placeholders});
            `;

            const [others] = await connection.execute(selectQuery, idsArray);
            if (Array.isArray(others) && others.length > 0) {
                others.forEach((product) => {
                    cartList.push({
                        id: product.ID,
                        name: product.Name, 
                        size: product.Size,
                        price: product.Price, 
                        quantity: 10, 
                        images: ["/images/anni_shorts/annishorts.jpg"],
                        stock: 9,
                        sizes: ["XS", "S", "M", "L"],
                        colours: ["Black", "Red", "Navy", "Green"],
                        description: product.Description,
                        disc: "0%",
                        promo: false,
                        category: 'others',
                        liked: false,
                        count: idsArray.filter(id => id == product.ID).length
                    });
                }); 
            }
        }
    }

    await connection.end();

    return NextResponse.json({ success: true, result: cartList });
  } catch (error) {
    console.error("Error in POST function", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}