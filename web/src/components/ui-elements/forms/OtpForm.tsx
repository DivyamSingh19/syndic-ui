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
// import { verifyOtp } from "@/lib/api";
// import { resendOtp } from "@/lib/api";
import { ArrowRightCircle } from "lucide-react";

interface FormData {
  pin: string;
}

const OtpForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const form = useForm<FormData>({
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/verify-otp",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // const response = await verifyOtp({
      //   pin: values.pin,
      // });

      toast.success("OTP submitted successfully!");
      router.push("/onboarding/address");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error in submitting OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return; // Prevent multiple clicks during the cooldown

    try {
      setIsResending(true);
      await resendOtp({}); // **Call your resend OTP API**
      toast.success("New OTP sent to your email!");
      setResendTimer(60); // Set a 60-second cooldown

      const interval = setInterval(() => {
        setResendTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to resend OTP");
    } finally {
      setIsResending(false);
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
        <div className="flex flex-col items-center gap-4">
          <div className="text-sm text-gray-500 text-center">
            Didn't receive a code?
            <Button
              type="button"
              variant="link"
              onClick={handleResend}
              disabled={resendTimer > 0 || isResending}
              className="px-1 text-sm"
            >
              {isResending ? (
                <LoaderSpinner message="Sending..." color="white" />
              ) : resendTimer > 0 ? (
                `Resend in ${resendTimer}s`
              ) : (
                "Resend Code"
              )}
            </Button>
          </div>
          <Button type="submit" className="w-1/2" disabled={isLoading}>
            {isLoading ? (
              <LoaderSpinner message="Verifying" color="black" />
            ) : (
              <span className="flex items-center gap-4">Verify</span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OtpForm;
