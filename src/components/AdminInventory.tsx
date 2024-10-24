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
import { SetStateAction, useState } from "react";
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

const initialProducts = [
  {
    images: ["/images/seasonal-black-1.png"],
    name: "Seasonal Tee - Black",
    id: "promo-seasonal-black",
    price: 10.99,
    quantity: 1,
  },
  {
    images: ["/images/seasonal-pink-1.png"],
    name: "Seasonal Tee - Pink",
    id: "promo-seasonal-pink",
    price: 10.99,
    quantity: 1,
  },
];

const AdminInventory = () => {
  const [dataShown, setDataShown] = useState("check");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterUp, setFilterUp] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [newPrice, setNewPrice] = useState("");

  const ITEMS_PER_PAGE = 8;

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  const handleRemoveProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEditPrice = (id: string) => {
    setEditingPriceId(id);
  };

  const handleSavePrice = (id: string) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, price: parseFloat(newPrice) } : product
    );
    setProducts(updatedProducts);
    setEditingPriceId(null);
    setNewPrice("");
  };

  return (
    <div className="w-[1350px] flex flex-col gap-2 p-8">
      {/* Products Table */}
      <div className="p-5 rounded-2xl overflow-hidden border-[1px] border-gray-200 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className="w-[300px]">Item</TableCell>
              <TableCell>Product ID</TableCell>
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
                      src={product.images[0]}
                      className="object-cover aspect-square rounded-md"
                    />
                    <p className="text-xs font-medium">{product.name}</p>
                  </div>
                </TableCell>
                <TableCell className="font-light">{product.id}</TableCell>
                <TableCell className="font-light">
                  {editingPriceId === product.id ? (
                    <div className="flex items-center">
                      <input
                        type="number"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        className="border border-gray-300 rounded p-1 w-20"
                      />
                      <Button
                        onClick={() => handleSavePrice(product.id)}
                        className="h-8 ml-2"
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <span>${product.price.toFixed(2)}</span>
                      <Edit
                        onClick={() => handleEditPrice(product.id)}
                        className="ml-2 w-5 h-5 text-mainBlack cursor-pointer hover:text-muted-foreground"
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-light">
                  <div className="flex items-center pl-2">
                    <PlusCircle
                      onClick={() =>
                        setProducts(
                          products.map((p) =>
                            p.id === product.id
                              ? { ...p, quantity: p.quantity + 1 }
                              : p
                          )
                        )
                      }
                      className="w-5 h-5 text-mainBlack cursor-pointer hover:text-muted-foreground"
                    ></PlusCircle>
                    <span className="mx-2">{product.quantity}</span>
                    <MinusCircle
                      onClick={() =>
                        setProducts(
                          products.map((p) =>
                            p.id === product.id && p.quantity > 0
                              ? { ...p, quantity: p.quantity - 1 }
                              : p
                          )
                        )
                      }
                      className="w-5 h-5 text-mainBlack cursor-pointer hover:text-muted-foreground"
                    />
                  </div>
                </TableCell>
                <TableCell className="text-right font-light text-mainBlack ">
                  <Trash2 onClick={() => handleRemoveProduct(product.id)} className="w-6 h-6 text-mainBlack cursor-pointer hover:text-muted-foreground"/>
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
