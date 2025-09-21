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
interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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
                      className="h-9 sm:h-10 text-sm"
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
                      className="h-9 sm:h-10 text-sm"
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
                    className="h-9 sm:h-10 text-sm"
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
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...field}
                    className="h-9 sm:h-10 text-sm"
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
          className="w-full h-9 sm:h-10 text-sm font-medium mt-4 sm:mt-6"
        >
          {isLoading ? (
            <LoaderSpinner message="Registering..." color="white" />
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
