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
            className="w-full max-w-xs sm:max-w-sm h-9 sm:h-10 md:h-11 text-sm sm:text-base font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderSpinner message="Verifying..." color="white" />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OtpForm;
