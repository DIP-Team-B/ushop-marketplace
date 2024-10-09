import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Wishlist from "@/components/Wishlist";
import { createConnection } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

// Fetch wishlist items directly in the component
const fetchWishlistItems = async (id: string): Promise<WishlistItem[]> => {
  let wishlistItems: WishlistItem[] = [];
  
  try {
    const connection = await createConnection();

    const length_sql = `
      SELECT * FROM favourite_table WHERE ID = ?
    `;

    const sql = `
      SELECT top_table.*
      FROM top_table
      JOIN favourite_table
      ON JSON_CONTAINS(favourite_table.TopList, CAST(top_table.ID AS JSON), '$')
      WHERE favourite_table.ID = ?
      UNION
      SELECT bottom_table.*
      FROM bottom_table
      JOIN favourite_table
      ON JSON_CONTAINS(favourite_table.BottomList, CAST(bottom_table.ID AS JSON), '$')
      WHERE favourite_table.ID = ?
      UNION
      SELECT accessories_table.*
      FROM accessories_table
      JOIN favourite_table
      ON JSON_CONTAINS(favourite_table.AccessoriesList, CAST(accessories_table.ID AS JSON), '$')
      WHERE favourite_table.ID = ?
      UNION
      SELECT others_table.*
      FROM others_table
      JOIN favourite_table
      ON JSON_CONTAINS(favourite_table.OthersList, CAST(others_table.ID AS JSON), '$')
      WHERE favourite_table.ID = ?;
    `;
    const [rows_length] = await connection.execute(length_sql, [id]);

    const [rows] = await connection.execute(sql, [id, id, id, id]);

    await connection.end();

    let num: number = 0;
    if (Array.isArray(rows) && rows.length > 0) {
      while (num < rows.length) {
        const row = rows[num] as RowDataPacket; // Type assertion to RowDataPacket
        //Top List
        if (num < (rows_length[0].TopList.length-1)/2) {
          row.Image_URL = 'tops/' + row.Image_URL ;
          row.category = 'tops';
        }
        //Bottom List
        else if (num >= (rows_length[0].TopList.length-1)/2 && 
        num < (rows_length[0].TopList.length-1)/2 +(rows_length[0].BottomList.length-1)/2) {
          row.Image_URL = 'bottoms/' + row.Image_URL ;
          row.category = 'bottoms';
        }
        //Accessories List
        else if (num >= (rows_length[0].TopList.length-1)/2 +(rows_length[0].BottomList.length-1)/2 && 
        num < (rows_length[0].TopList.length-1)/2 +(rows_length[0].BottomList.length-1)/2 +(rows_length[0].AccessoriesList.length-1)/2) {
          row.Image_URL = 'accessories/' + row.Image_URL ;
          row.category = 'accessories';
        }
        //Others List
        else if (num >= (rows_length[0].TopList.length-1)/2 +(rows_length[0].BottomList.length-1)/2 +(rows_length[0].AccessoriesList.length-1)/2 && 
        num < (rows_length[0].TopList.length-1)/2 +(rows_length[0].BottomList.length-1)/2 +(rows_length[0].AccessoriesList.length-1)/2 +(rows_length[0].OthersList.length-1)/2) {
          row.Image_URL = 'others/' + row.Image_URL ;
          row.category = 'others';
        }
        num++;
      }
    }
    //console.log("Updated Rows data:", rows);

    if (Array.isArray(rows) && rows.length > 0) {
      wishlistItems = rows.map((row) => ({
        user: id,
        id: row.ID,
        name: row.Name,
        price: row.Price,
        images: '/images/products/'+[row.Image_URL],
        category: row.category,
        stock: row.Quantity,
        liked: true,
      }));
    }
    //console.log("WishList data:", wishlistItems);
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return wishlistItems;
};

export default async function Page({ searchParams }) {
  console.log("GetServerSideProps triggered with context:", searchParams);
  const { id } = searchParams;  // Fetch the ID from the search params

  const wishlistItems = await fetchWishlistItems(id);
  return (
    <div className='justify-center'>
      <Navbar/>
      <div className="container mx-auto p-6">
        <Wishlist title="Your Wishlist" products={wishlistItems} />
        <hr />
        
      </div>
      <Footer />
    </div>
  );
};
