"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { SetStateAction, useState } from "react";
import { products } from "../productsData";
import AdminCheck from "@/components/AdminCheck";
import AdminUpload from "@/components/AdminUpload";
import AdminInventory from "@/components/AdminInventory";

const initialInvoice = [
  {
    images: ["/images/seasonal-black-1.png", "/images/seasonal-black-2.png"],
    name: "Seasonal Tee - Black",
    invoice: "N7UU5001",
    category: "Tops",
    id: "promo-seasonal-black",
    date: "2024-01-01",
    status: "Confirmed",
    quantity: 1,
    price: 10.99,
  },
  {
    images: ["/images/seasonal-pink-1.png", "/images/seasonal-pink-2.png"],
    name: "Seasonal Tee - Pink",
    invoice: "N7UU5002",
    category: "Tops",
    id: "promo-seasonal-pink",
    date: "2024-01-02",
    status: "Pending",
    quantity: 1,
    price: 10.99,
  },
  {
    images: ["/images/seasonal-black-1.png", "/images/seasonal-black-2.png"],
    name: "Seasonal Tee - Black",
    invoice: "N7UU5003",
    category: "Tops",
    id: "promo-seasonal-black",
    date: "2024-02-01",
    status: "Cancelled",
    quantity: 1,
    price: 10.99,
  },
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const adminEmail = "admin@gmail.com";
const adminPassword = "admin12345678";

const statusOptions = ["All", "Pending", "Confirmed", "Cancelled"];

const ITEMS_PER_PAGE = 8;

const Page = () => {
  const [isAdmin, setAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (email === adminEmail && password === adminPassword) {
      setAdmin(true);
    } else {
      alert("Invalid email or password");
    }
  };

  const [dataShown, setDataShown] = useState("check");

  const [Month, setMonth] = useState("Month");
  const [Year, setYear] = useState("Year");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterUp, setFilterUp] = useState(false);
  const [invoices, setInvoices] = useState(initialInvoice);
  const [isPromo, setPromo] = useState(false);

  // Handle status update
  const handleStatusChange = (invoiceNum: string, newStatus: string) => {
    setInvoices((prevInvoices) =>
      prevInvoices.map((invoice) =>
        invoice.invoice === invoiceNum
          ? { ...invoice, status: newStatus }
          : invoice
      )
    );
  };

  // Filter and sort the invoices based on the selected month, year, status, and sorting order.
  const filteredInvoices = invoices
    .filter((invoice) => {
      const invoiceDate = new Date(invoice.date);
      const selectedMonthIndex = months.indexOf(Month);
      const selectedYear = parseInt(Year, 10);

      const matchesMonth =
        Month === "Month" || invoiceDate.getMonth() === selectedMonthIndex;
      const matchesYear =
        Year === "Year" || invoiceDate.getFullYear() === selectedYear;
      const matchesStatus =
        statusFilter === "All" || invoice.status === statusFilter;

      return matchesMonth && matchesYear && matchesStatus;
    })
    .sort((a, b) => {
      return filterUp
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date);
    });
  const [counter, setCounter] = useState(10);

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [disc, setDisc] = useState("");
  const [colours, setColours] = useState<string[]>([]);

  // State for image files
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [image3, setImage3] = useState<File | null>(null);

  const [newProducts, setNewProducts] = useState(products);

  // Handle size checkbox changes
  const handleSizeChange = (size: string) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter((s) => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  // Handle form submission
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Create new product object
    const newProduct = {
      id: newProducts.length + 1, // Increment the id
      name: productName,
      price: parseFloat(price), // Convert price to a number
      category: category,
      stock: counter,
      sizes: sizes,
      colours: colours,
      description: description,
      promo: isPromo,
      disc: isPromo ? disc : "0%",
      images: [
        image1
          ? URL.createObjectURL(image1)
          : "/placeholder.svg?height=200&width=300",
        image2
          ? URL.createObjectURL(image2)
          : "/placeholder.svg?height=200&width=300",
        image3
          ? URL.createObjectURL(image3)
          : "/placeholder.svg?height=200&width=300",
      ], // Use URL.createObjectURL to generate a preview
    };

    // Append new product to the products array
    setNewProducts([...newProducts, newProduct]);

    // Optionally clear form fields after submission
    setProductName("");
    setPrice("");
    setCategory("");
    setCounter(10);
    setDescription("");
    setSizes([]);
    setPromo(false);
    setDisc("");
    setImage1(null);
    setImage2(null);
    setImage3(null);
  };

  return (
    <div className="flex justify-center flex-col text-mainBlack">
      {!isAdmin ? (
        <div className="w-full">
          <div className="flex flex-col items-center w-full py-56">
            <div className="flex flex-col items-center gap-8 w-[500px]">
              <h1 className="font-bold text-3xl">Admin Log In</h1>
              <form className="grid gap-6 w-full" onSubmit={handleLogin}>
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn(
                      { "focus-visible:ring-mainBlack": true },
                      "w-full h-10"
                    )}
                  />
                </div>
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={cn(
                      { "focus-visible:ring-mainBlack": true },
                      "w-full h-10"
                    )}
                  />
                </div>
                <Button type="submit" className="w-full h-10 mt-2">
                  Log In
                </Button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col gap-4 p-8 w-full items-center py-48">
            <div className="flex justify-between items-center w-full">
              <Button variant="link" className="opacity-0">
                Log out
              </Button>
              <div className="flex gap-1 items-center p-2 rounded-full border-[1px] overflow-hidden border-gray-200">
                <div
                  className={`py-2 px-4 rounded-full cursor-pointer ${
                    dataShown === "check" && "bg-mainBlack text-mainWhite"
                  } ${dataShown !== "check" && "bg-gray-100 text-mainBlack"}`}
                  onClick={() => setDataShown("check")}
                >
                  Check orders
                </div>
                <div
                  className={`py-2 px-4 rounded-full cursor-pointer ${
                    dataShown === "upload" && "bg-mainBlack text-mainWhite"
                  } ${dataShown !== "upload" && "bg-gray-100 text-mainBlack"}`}
                  onClick={() => setDataShown("upload")}
                >
                  Upload product
                </div>
                <div
                  className={`py-2 px-4 rounded-full cursor-pointer ${
                    dataShown === "inventory" && "bg-mainBlack text-mainWhite"
                  } ${
                    dataShown !== "inventory" && "bg-gray-100 text-mainBlack"
                  }`}
                  onClick={() => setDataShown("inventory")}
                >
                  Inventory
                </div>
              </div>
              <Button variant="link" onClick={() => setAdmin(false)}>
                Log out
              </Button>
            </div>
            {dataShown === "check" && <AdminCheck/>
            }
            {dataShown === "upload" && <AdminUpload/>}
            {dataShown === "inventory" && <AdminInventory/>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
