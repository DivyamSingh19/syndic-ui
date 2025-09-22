//@ts-nocheck
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoaderSpinner from "../LoaderSpinner";
import { loginUser } from "@/lib/api";
import { Eye, EyeOff } from "lucide-react";
import { ArrowRightCircle } from "lucide-react";
interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      setIsLoading(true);
      const response = await loginUser({
        email: values.email,
        password: values.password,
      });

      const data = response.data;
      toast.success("User Logged successfully!");
      router.push("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error in logging account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 sm:space-y-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto px-2 sm:px-4"
      >
        <div className="flex flex-col gap-3 sm:gap-4 w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="jamesbond@example.com"
                    {...field}
                    className="h-9 sm:h-10 md:h-11 text-sm sm:text-base rounded-3xl px-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...field}
                      className="h-9 sm:h-10 text-sm rounded-3xl px-5 pr-12"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-7 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-center">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-1/2 sm:w-2/3 md:w-1/3 lg:w-1/4 
    h-9 sm:h-10 md:h-11 lg:h-11
    text-xs sm:text-sm md:text-base lg:text-base
    font-medium mt-4 sm:mt-6
    rounded-3xl 
    bg-gradient-to-r from-[#221d1a] via-[#251f18] to-[#271f1b] 
    text-gray-200 hover:text-white hover:shadow-lg
    border px-4 sm:px-5 py-1 shadow-sm
    transition-all duration-200
    disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50
    focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          >
            {isLoading ? (
              <LoaderSpinner message="Logging In" color="white" />
            ) : (
              <span className="flex items-center gap-4">
                <p className="text-sm">Login</p>
                <ArrowRightCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-orange-400 transform -rotate-45" />
              </span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;

// #251f18 #221d1a #271f1b