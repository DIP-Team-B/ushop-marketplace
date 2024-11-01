"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  ChevronDown,
  Minus,
  MinusCircle,
  Plus,
  PlusCircle,
  RotateCcw,
} from "lucide-react";
import { SetStateAction, useState, useEffect } from "react";
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
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { products } from "../productsData";
import AdminInventory from "@/components/AdminInventory";
import { useRouter } from 'next/navigation';

interface Invoice {
  images: string[];
  name: string;
  invoice: string;
  category: string;
  id: string;
  date: string;
  status: string;
  quantity: number;
  price: number;
}

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
  const router = useRouter();
  const [isAdmin, setAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (email === adminEmail && password === adminPassword) {
      setAdmin(true);
      router.push("/admin_CheckOrder");
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
  const [invoices, setInvoices] = useState<Invoice[]>([]); // Initialize with an empty array
  const [isPromo, setPromo] = useState(false);

  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/check_order');
        const result = await response.json();
        console.log(result);
        if (result.success) {
          console.log(result.data);
          setInvoices(result.data);
        } else {
          alert("Failed to fetch orders: " + result.error);
        }
      } catch (error: any) {
        alert("Error: " + error.message);
      }
    };

    fetchOrders();
  }, []);

  // Handle status update
  const handleStatusChange = async (invoiceNum: string, newStatus: string) => {
    try {
      const response = await fetch('/api/check_order', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ invoice: invoiceNum, status: newStatus }),
      });

      const result = await response.json();
      if (result.success) {
        setInvoices((prevInvoices) =>
          prevInvoices.map((invoice) =>
            invoice.invoice === invoiceNum
              ? { ...invoice, status: newStatus }
              : invoice
          )
        );
        window.location.reload(); // Refresh the page
      } else {
        alert("Failed to update order status: " + result.error);
      }
    } catch (error: any) {
      alert("Error: " + error.message);
    }
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
    .filter((invoice) => invoice.date) // Ensure date property exists
    .sort((a, b) => {
      return filterUp
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date);
    });

  const totalPages = Math.ceil(filteredInvoices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedInvoices = filteredInvoices.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  const [counter, setCounter] = useState(10);

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [disc, setDisc] = useState("");

  // State for image files
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [image1, setImage1] = useState<File | null>(null);

  // Handle size checkbox changes
  const handleSizeChange = (size: string) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter((s) => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  const handleSubmit = async (
    productName: string, 
    price: string, 
    category: string,
    counter: number,
    sizes: string[],
    imageURL: string | null,
    description: string,
    isPromo: boolean,
    disc: string
  ) => {
    if (!imageURL) {
      alert("Image URL is required");
      return;
    }

    const newProduct = {
      name: productName,
      price: parseFloat(price),
      category: category,
      quantity: counter,
      sizes: sizes,
      imageurl: imageURL,
      description: description,
      promo: isPromo,
      disc: isPromo ? disc : "0%",
    };

    try {
      const response = await fetch('/api/add_item', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const result = await response.json();
      if (result.success) {
        alert("Product added successfully!");
        // Optionally clear form fields after successful submission
        setProductName("");
        setPrice("");
        setCategory("");
        setCounter(10);
        setDescription("");
        setSizes([]);
        setPromo(false);
        setDisc("");
        setImage1(null);
        setImageURL(null);
      } else {
        alert("Failed to add product: " + result.error);
      }
    } catch (error: any) {
      alert("Error: " + error.message);
    }
  };

  // Reset the promo switch when the product is added or the page is refreshed
  useEffect(() => {
    setPromo(false);
  }, [invoices]);

  return (
    <div className="flex justify-center flex-col text-mainBlack">
        <div className="w-[1350px]">
          <div className="flex flex-col items-center w-full py-40">
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
    </div>
  );
};

export default Page;