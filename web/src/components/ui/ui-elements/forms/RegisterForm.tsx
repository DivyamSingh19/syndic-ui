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
import { registerUser } from "@/lib/api";
import { Eye, EyeOff } from "lucide-react";
import { ArrowRightCircle } from "lucide-react";
interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm<FormData>({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      setIsLoading(true);

      const response = await registerUser({
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
      });

      const data = response.data;
      toast.success("User registered successfully!");
      router.push("/otp");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error in creating account"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 sm:space-y-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm xl:max-w-md mx-auto px-2 sm:px-4"
      >
        <div className="flex flex-col gap-2 sm:gap-4 w-full">
          <div className="flex gap-2 sm:gap-3 md:gap-4">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-sm">First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="James"
                      {...field}
                      className="h-9 sm:h-10 text-sm rounded-3xl px-5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-sm">Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Bond"
                      {...field}
                      className="h-9 sm:h-10 text-sm rounded-3xl px-5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="jamesbond@example.com"
                    {...field}
                    className="h-9 sm:h-10 text-sm rounded-3xl px-5"
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
                <FormLabel className="text-sm">Password</FormLabel>
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
        <div className="flex justify-center items-center">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-1/2 sm:w-2/3 md:w-1/3 h-9 sm:h-10 md:h-11 text-center text-xs sm:text-sm md:text-base lg:text-base font-medium mt-4 sm:mt-6 rounded-3xl bg-gradient-to-r from-[#221d1a] via-[#251f18] to-[#271f1b] text-gray-200 hover:text-white hover:shadow-lg border px-4 sm:px-5 py-1 shadow-sm transition-all duration-200 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          >
            {isLoading ? (
              <LoaderSpinner message="Registering" color="white" />
            ) : (
              <span className="flex items-center gap-4">
                <p className="text-sm">Register</p>
                <ArrowRightCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-orange-400 transform -rotate-45" />
              </span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
