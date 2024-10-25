"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  RotateCcw,
  Edit,
  Trash2,
  PlusCircle,
  MinusCircle,
} from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
} from "@/components/ui/table";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Product {
  id: number;
  Name: string;
  Price: number;
  Quantity: number;
  Image_URL: string;
  table: string;
}

const AdminInventory = () => {
  const [dataShown, setDataShown] = useState("top");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterUp, setFilterUp] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingPrice, setEditingPrice] = useState<{ [key: number]: boolean }>({});
  const [newPrice, setNewPrice] = useState<{ [key: number]: string }>({});
  const [editingQuantity, setEditingQuantity] = useState<{ [key: number]: boolean }>({});
  const [newQuantity, setNewQuantity] = useState<{ [key: number]: string }>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Added error message state

  const ITEMS_PER_PAGE = 8;

  const totalPages = Math.ceil((products as Product[]).length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = Array.isArray(products) ? products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  ) : [];

  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await fetch(`/api/inventory?table=${dataShown}`);
            const data = await response.json();
            if (data.success) {
                const parsedProducts = data.data.map((product: any) => ({
                    ...product,
                    Price: parseFloat(product.Price), // Ensure Price is a number
                }));
                setProducts(parsedProducts);
            } else {
                console.error('Error fetching products:', data.error);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    fetchProducts();
  }, [dataShown]);

  const handlePageChange = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  const handleRemoveProduct = async (id: number, table: string) => {
    try {
        const response = await fetch('/api/inventory', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, table }),
        });
        const result = await response.json();
        if (result.success) {
            setProducts(products.filter((product) => product.id !== id));
        } else {
            console.error('Error removing product:', result.error);
        }
    } catch (error) {
        console.error('Error removing product:', error);
    }
};

  const handleEditPrice = (id: number) => {
      setEditingPrice({ ...editingPrice, [id]: true });
      const productToEdit = products.find((p) => p.id === id);
      if (productToEdit) {
          setNewPrice({ ...newPrice, [id]: productToEdit.Price.toString() });
      }
  };

  const handleSavePrice = async (id: number, table: string) => {
    try {
        const newPriceValue = parseFloat(newPrice[id]);
        if (isNaN(newPriceValue)) {
            setErrorMessage('Invalid price value');
            return;
        }

        const productToUpdate = products.find((p) => p.id === id);
        if (!productToUpdate) {
            setErrorMessage('Product not found');
            return;
        }

        const updatedData = {
            Price: newPriceValue,
            Quantity: productToUpdate.Quantity,
        };

        console.log('Updating product:', id, 'in table:', table);
        console.log('New price:', newPriceValue, 'New quantity:', productToUpdate.Quantity);
        console.log('Request payload:', { id, table, product: updatedData });

        const response = await fetch('/api/inventory', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify({ id, table, product: updatedData }),
        });

        

        const result = await response.json();
        console.log('Response:', result);
        if (result.success) {
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === id ? { ...product, Price: newPriceValue } : product
                )
            );
        } else {
            setErrorMessage('Error updating product: ' + result.error);
        }

        setEditingPrice({ ...editingPrice, [id]: false });
        setNewPrice({ ...newPrice, [id]: "" });
    } catch (error: unknown) {
        if (error instanceof Error) {
            setErrorMessage('Error updating price: ' + error.message);
        } else {
            setErrorMessage('An unexpected error occurred');
        }
    }
  };

  const handleEditQuantity = (id: number) => {
      setEditingQuantity({ ...editingQuantity, [id]: true });
      const productToEdit = products.find((p) => p.id === id);
      if (productToEdit) {
          setNewQuantity({ ...newQuantity, [id]: productToEdit.Quantity.toString() });
      }
  };

  const handleSaveQuantity = async (id: number, table: string) => {
    try {
        const newQuantityValue = parseInt(newQuantity[id], 10);
        if (isNaN(newQuantityValue)) {
            setErrorMessage('Invalid quantity value');
            return;
        }

        const productToUpdate = products.find((p) => p.id === id);
        if (!productToUpdate) {
            setErrorMessage('Product not found');
            return;
        }

        const updatedData = {
            Price: productToUpdate.Price,
            Quantity: newQuantityValue,
        };

        console.log('Updating product:', id, 'in table:', table);
        console.log('New price:', productToUpdate.Price, 'New quantity:', newQuantityValue);
        console.log('Request payload:', { id, table, product: updatedData });

        const response = await fetch('/api/inventory', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify({ id, table, product: updatedData }),
        });

        

        const result = await response.json();
        console.log('Response:', result);
        if (result.success) {
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === id ? { ...product, Quantity: newQuantityValue } : product
                )
            );
        } else {
            setErrorMessage('Error updating product: ' + result.error);
        }

        setEditingQuantity({ ...editingQuantity, [id]: false });
        setNewQuantity({ ...newQuantity, [id]: "" });
    } catch (error: unknown) {
        if (error instanceof Error) {
            setErrorMessage('Error updating quantity: ' + error.message);
        } else {
            setErrorMessage('An unexpected error occurred');
        }
    }
  };

  const handleQuantityChange = (id: number, change: number) => {
    setProducts((prevProducts) =>
        prevProducts.map((product) =>
            product.id === id ? { ...product, Quantity: product.Quantity + change } : product
        )
    );
};

  // Render the error message
  {errorMessage && <div className="text-red-500">{errorMessage}</div>}
  
  return (
    <div className="w-[1350px] flex flex-col gap-2 p-8">
      {/* Category Toggle */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="mb-4">
            {dataShown.charAt(0).toUpperCase() + dataShown.slice(1)}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setDataShown("top")}>Top</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDataShown("bottom")}>Bottom</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDataShown("accessories")}>Accessories</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDataShown("others")}>Others</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Products Table */}
      <div className="p-5 rounded-2xl overflow-hidden border-[1px] border-gray-200 shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell className="w-[300px]">Item</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Total Quantity</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="flex gap-2 items-center">
                  <Image
                    width={48}
                    height={48}
                    alt="image"
                    src={`/images/${product.Image_URL}`}
                    className="object-cover aspect-square rounded-md"
                  />
                  <p className="text-xs font-medium">{product.Name}</p>
                </div>
              </TableCell>
              <TableCell className="font-light">
                {editingPrice[product.id] ? (
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={newPrice[product.id] || ""}
                      onChange={(e) => setNewPrice({ ...newPrice, [product.id]: e.target.value })}
                      className="border border-gray-300 rounded p-1 w-20"
                    />
                    <Button
                      onClick={() => handleSavePrice(product.id, product.table)}
                      className="h-8 ml-2"
                    >
                      Save
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span>${typeof product.Price === 'number' ? product.Price.toFixed(2) : 'N/A'}</span>
                    <Edit
                      onClick={() => handleEditPrice(product.id)}
                      className="ml-2 w-5 h-5 text-mainBlack cursor-pointer hover:text-muted-foreground"
                    />
                  </div>
                )}
              </TableCell>
              <TableCell className="font-light">
                {editingQuantity[product.id] ? (
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={newQuantity[product.id] || ""}
                      onChange={(e) => setNewQuantity({ ...newQuantity, [product.id]: e.target.value })}
                      className="border border-gray-300 rounded p-1 w-20"
                    />
                    <Button
                      onClick={() => handleSaveQuantity(product.id, product.table)}
                      className="h-8 ml-2"
                    >
                      Save
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center pl-2">
                    <span>{product.Quantity}</span>
                    <Edit
                      onClick={() => handleEditQuantity(product.id)}
                      className="ml-2 w-5 h-5 text-mainBlack cursor-pointer hover:text-muted-foreground"
                    />
                  </div>
                )}
              </TableCell>
              <TableCell className="text-right font-light text-mainBlack ">
                <Trash2 onClick={() => handleRemoveProduct(product.id, product.table)} className="w-6 h-6 text-mainBlack cursor-pointer hover:text-muted-foreground"/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              {currentPage === 1 ? null : (
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  aria-disabled={currentPage === 1}
                />
              )}
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            {totalPages > 3 && <PaginationEllipsis />}
            <PaginationItem>
              {currentPage === totalPages ? null : (
                <PaginationNext
                  href="#"
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default AdminInventory;
