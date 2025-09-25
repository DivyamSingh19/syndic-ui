"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoaderSpinner from "@/components/ui/ui-elements/LoaderSpinner";
import { loginUser } from "@/lib/api";
import { toast } from "sonner";


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
        const response = await axios.post(
              "http://localhost:4000/api/v1/auth/login",
              formData,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
      // const response = await loginUser({
      //   email: formData.email,
      //   password: formData.password,
      // });

      const data = response.data;
      toast.success("User logged in successfully!");
      router.push("/dashboard");
      console.log("Login successful, would redirect to dashboard");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Error logging into account"
      );
    } finally {
      setIsLoading(false);
    }
  };

   const handleRegister = () => {
     router.push("/register");
   };


  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <LoaderSpinner message="Logging In" color="black" />
          ) : (
            <span className="flex items-center gap-4">Login</span>
          )}
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?
        <a
          href="#"
          className="underline underline-offset-4"
          onClick={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          Register
        </a>
      </div>
    </form>
  );
}
