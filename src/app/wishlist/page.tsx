import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Wishlist from "@/components/Wishlist";
import { createConnection } from '@/lib/db';

// Define an interface for the wishlist item
interface wishlistItems {
  id: number;         // Assuming ID is a number
  name: string;       // Assuming name is a string
  price: number;      // Assuming price is a number
  images: string;     // Assuming image is a string (or array of strings if multiple images)
  category: string;   // Assuming category is a string
  stock: number;      // Assuming stock is a number
}

// Fetch wishlist items directly in the component
const fetchWishlistItems = async (id: string): Promise<WishlistItem[]> => {
  let wishlistItems: WishlistItem[] = [];
  
  try {
    const connection = await createConnection();

    const sql = `
      SELECT top_table.*
      FROM top_table
      JOIN favourite_table
      ON JSON_CONTAINS(favourite_table.TopList, CAST(top_table.ID AS JSON), '$')
      WHERE favourite_table.ID = ?;
    `;
    const [rows] = await connection.execute(sql, [id]);

    // Log the data for debugging
    console.log("Rows data:", rows);

    await connection.end();

    if (Array.isArray(rows) && rows.length > 0) {
      wishlistItems = rows.map((row) => ({
        id: row.ID,
        name: row.Name,
        price: row.Price,
        images: '/images/products/tops/'+[row.Image_URL],
        category: 'tops',
        stock: row.Quantity,
      }));
    }
    console.log("WishList data:", wishlistItems);
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

