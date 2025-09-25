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
import LoaderSpinner from "../LoaderSpinner";
import CountrySelector from "../selectors/CountrySelector";
import PhoneCodeSelector from "../selectors/PhoneCodeSelector";
import { Textarea } from "@/components/ui/textarea";
import { editProfile } from "@/lib/api";
import PlatformSelector from "../selectors/PlatformSelector";
import PlatformPin from "../pins/PlatformPin";
import axios from "axios";
interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  country: string;
  address: string;
  platformPin: number;
}

const EditProfileForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      platformPin: "",
      phoneNumber: "",
      country: "",
      address: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      setIsLoading(true);
      const response = await editProfile({
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        platformPin: values.password,
        phoneNumber: values.tel,
        country: values.country,
        address: values.address,
      });
      const data = response.data;
      toast.success("Profile updated successfully!");
      router.push("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error updating profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-lg mx-auto px-4 "
      >
        <div className="flex flex-col gap-2 sm:gap-4 w-full">
          <div className="flex gap-4">
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
                      className="h-10 text-sm px-5"
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
                      className="h-10 text-sm px-5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4">
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
                      className="h-10 text-sm px-5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="platformPin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Platform Pin</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="******"
                      {...field}
                      className="h-10 text-sm px-5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Mobile Number</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <PhoneCodeSelector />
                      <Input
                        type="tel"
                        placeholder="9876543210"
                        {...field}
                        className="h-10 text-sm px-5 flex-1"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-sm">Country</FormLabel>
                  <FormControl>
                    <CountrySelector {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-sm">Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter your address" id="message-3" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={isLoading}
            className="flex justify-center items-center w-1/3 h-10 text-sm sm:text-base font-medium mt-6 bg-primary text-gray-200 hover:text-white hover:shadow-lg border shadow-sm transition-all duration-200"
          >
            {isLoading ? (
              <LoaderSpinner message="Updating" color="white" />
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditProfileForm;
