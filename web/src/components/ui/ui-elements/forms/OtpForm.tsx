//@ts-nocheck
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
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
import LoaderSpinner from "../LoaderSpinner";
import { verifyOtp } from "@/lib/api";
import { ArrowRightCircle } from "lucide-react";
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
      const response = await verifyOtp({
        pin: values.pin,
      });

      const data = response.data;
      toast.success("OTP submitted successfully!");
      router.push("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error in submitting OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-6 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
      >
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem className="space-y-3 sm:space-y-5">
              <FormControl>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    {...field}
                    className="text-sm sm:text-base"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={0}
                        className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
                      />
                      <InputOTPSlot
                        index={1}
                        className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
                      />
                      <InputOTPSlot
                        index={2}
                        className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
                      />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={3}
                        className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
                      />
                      <InputOTPSlot
                        index={4}
                        className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
                      />
                      <InputOTPSlot
                        index={5}
                        className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button
            type="submit"
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
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderSpinner message="Verifying" color="white" />
            ) : (
              <span className="flex items-center gap-4">
                <p className="text-sm">Submit</p>
                <ArrowRightCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-orange-400 transform -rotate-45" />
              </span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OtpForm;
