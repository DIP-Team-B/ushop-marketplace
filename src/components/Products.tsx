import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button";

type Product = {
    id: number;
    name: string;
    price: number;
    rating: number;
    reviews: number;
    image: string;
}

type ProductsProps = {
    title: string;
    products: Product[];
};

const Products: React.FC<ProductsProps> = ({ title, products }) => {
    return (
        <div className="justify-center">
            <div className="text-center p-5 text-2xl font-bold text-darkRed">{title}</div>
            <hr />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 m-10">
                {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                    <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                    />
                <CardContent className="p-4">
                <h2 className="font-semibold text-lg mb-2">{product.name}</h2>
                <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-4 h-4 ${
                            i < product.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                        />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">({product.reviews} reviews)</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                    <Button variant="outline" size="sm">
                    Add to Cart
                    </Button>
                </div>
                </CardContent>
            </Card>
            ))}
        </div>
    </div>
  );
}

export default Products;