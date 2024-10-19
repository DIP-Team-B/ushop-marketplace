"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login submitted:", email, password);
    alert("Login submitted:"+ email+ password)

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        if (response.ok) {
          if(data.success == true)
          {
            console.log("Login successful", data);
            router.push("/"); 
          }
          else{
            console.log("Login unsuccessful", data);
            alert("Invalid email or password.");
          }
        } else {
          console.error("Login failed", data.message);
        }
      } else {
        const text = await response.text();
        console.error("Unexpected response format", text);
      }
    } catch (error) {
      console.error("Error submitting login form", error);
    }
  };

  return (
    <div>
      <div className="w-full h-screen">
        <Navbar></Navbar>
        <div className="flex flex-col items-center w-full py-40">
          <div className="flex flex-col items-center gap-8 w-[500px]">
            <h1 className="font-bold text-3xl">Log In as Guest</h1>
            <form className="grid gap-6 w-full" onSubmit={onSubmit}>
              <div className="flex flex-col items-start gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={cn(
                    { "focus-visible:ring-mainBlack": true },
                    "w-full h-10"
                  )}
                ></Input>
              </div>
              <div className="flex flex-col items-start gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  className={cn(
                    { "focus-visible:ring-mainBlack": true },
                    "w-full h-10"
                  )}
                ></Input>
              </div>
              <Button type="submit" className="w-full h-10" >Log In</Button>
            </form>
            
            <div className="flex gap-3 w-full items-center">
              <div className="bg-mainBlack h-[1px] w-full"></div>
              <p className="font-bold text-md">or</p>
              <div className="bg-mainBlack h-[1px] w-full"></div>
            </div>
            <Link href="/log-in-member" className="w-full h-10">
              <Button className="w-full h-10" variant="outline">
                Continue as Student/Staff
              </Button>
            </Link>
            <Link
              className={buttonVariants({ variant: "link" })}
              href="/sign-up"
            >
              Don't have an account? Sign Up!
            </Link>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Page;
