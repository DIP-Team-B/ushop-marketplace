"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from "@/lib/validators/account-credentials-validator";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const onSubmit = ({
    email,
    password,
    password2,
  }: TAuthCredentialsValidator) => {
    console.log("submitted");
  };

  return (
    <>
      <div className="w-full h-screen z-10">
        <div className="flex flex-col items-center w-full py-56">
          <div className="flex flex-col items-center gap-8 w-[500px]">
            <h1 className="font-bold text-3xl">Sign Up</h1>
            <form
              className="grid gap-6 w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col items-start gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  placeholder="you@example.com"
                  className={cn(
                    { "focus-visible:ring-mainBlack": true },
                    "w-full h-10"
                  )}
                ></Input>
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="flex flex-col items-start gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  {...register("password")}
                  placeholder="Password"
                  className={cn(
                    { "focus-visible:ring-mainBlack": true },
                    "w-full h-10"
                  )}
                ></Input>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>
              <div className="flex flex-col items-start gap-2">
                <Label htmlFor="password2">Confirm Password</Label>
                <Input
                  {...register("password2")}
                  placeholder="Password"
                  className={cn(
                    { "focus-visible:ring-mainBlack": true },
                    "w-full h-10"
                  )}
                ></Input>
                {errors.password2 && (
                  <p className="text-red-500 text-sm">{errors.password2?.message}</p>
                )}
              </div>
              <Button className="w-full h-10" type="submit">Sign Up</Button>
            </form>
            {/* <div className="flex gap-3 w-full items-center">
              <div className="bg-mainBlack h-[1px] w-full"></div>
              <p className="font-bold text-md">or</p>
              <div className="bg-mainBlack h-[1px] w-full"></div>
            </div>
            <Link href="/log-in" className="w-full h-10">
              <Button className="w-full h-10" variant="outline">
                Continue as Guest
              </Button>
            </Link> */}
            <Link
              className={buttonVariants({ variant: "link" })}
              href="/log-in"
            >
              Have an account? Log in!
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
