import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  sizes: string[];
  colours: string[];
  description: string[],
}

type ProductsProps = {
  title: string;
  products: Product[];
};

const Products: React.FC<ProductsProps> = ({ title, products }) => {
  return (
    <div className="justify-center">
      <div className="text-left py-9 pl-16 text-sm text-mainGrey">
        <Link href="./" className="underline hover:color-darkRed">Home</Link> 
        &nbsp;&nbsp;
        &gt; 
        &nbsp;&nbsp;
        <Link href="" className="underline hover:color-darkRed">{title}</Link> 
      </div>
      <div className="text-left pb-9 pl-16 text-5xl font-bold text-darkRed">{title}</div>
      <hr />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 m-10">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden w-80">
            <Link href={`/${product.category?.toLowerCase()}/${product.id}`}>
            
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover cursor-pointer"
              />
              <CardContent className="p-4">
                <h2 className="font-semibold text-lg mb-2">{product.name}</h2>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                  <Button variant="destructive" size="sm">
                    Add to Cart
                  </Button>
              </div>
                <p className="text-sm mt-2 text-darkRed">
                  Stock left: {product.stock}
                </p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Products;