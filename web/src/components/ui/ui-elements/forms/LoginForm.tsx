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
interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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
                    className="h-9 sm:h-10 md:h-11 text-sm sm:text-base"
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
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...field}
                    className="h-9 sm:h-10 md:h-11 text-sm sm:text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-9 sm:h-10 md:h-11 text-sm sm:text-base font-medium mt-4 sm:mt-6"
        >
          {isLoading ? (
            <LoaderSpinner message="Logging In..." color="white" />
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
