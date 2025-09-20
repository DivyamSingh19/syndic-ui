//@ts-nocheck
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoaderSpinner from "./LoaderSpinner";

interface FormData {
  pin: string;
}

const OtpForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "",
        {
          pin: values.pin,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      toast.success("OTP submitted successfully!");
      router.push("/");
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message || "Error in submitting OTP");
    }
  };
 return (
   <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
       <FormField
         control={form.control}
         name="pin"
         render={({ field }) => (
           <FormItem className="space-y-5">
             <FormControl>
               <div className="flex justify-center">
                 <InputOTP maxLength={6} {...field}>
                   <InputOTPGroup>
                     <InputOTPSlot index={0} />
                     <InputOTPSlot index={1} />
                     <InputOTPSlot index={2} />
                     <InputOTPSlot index={3} />
                     <InputOTPSlot index={4} />
                     <InputOTPSlot index={5} />
                   </InputOTPGroup>
                 </InputOTP>
               </div>
             </FormControl>
             <FormMessage />
           </FormItem>
         )}
       />
       <Button type="submit" className="w-full max-w-sm text-md" disabled={isLoading}>
         {isLoading ? (
           <LoaderSpinner message="Verifying..." color="white" />
         ) : (
           "Submit"
         )}
       </Button>
     </form>
   </Form>
 );
};

export default OtpForm;
