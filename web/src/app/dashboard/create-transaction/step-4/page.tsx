//@ts-nocheck
"use client";
import React,{useState} from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const Step4 = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const errorMessage = searchParams.get("error");
  const transactionId = searchParams.get("transactionId");

  const [displayMessage, setDisplayMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (status === "success") {
      setIsSuccess(true);
      setDisplayMessage("Your payment has been successfully completed.");
    } else {
      setIsSuccess(false);
      // Use the error message from the URL or a default message
      setDisplayMessage(
        errorMessage || "Your payment could not be completed at this time."
      );
    }
  }, [status, errorMessage]);

  const handleNextStep = () => {
    if (!isSuccess) {
      // If payment failed, navigate to Step 5 to show alternatives
      router.push("/dashboard/create-transaction/step-5");
    } else {
      // If successful, we can navigate to a receipt page or home
      // or simply stay on this page with a "Stop" state as per the diagram
      console.log("Payment successful, process finished.");
      // For now, we'll just stop here as per the flowchart.
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
      {isSuccess ? (
        // UI for successful payment
        <div className="flex flex-col items-center">
          <CheckCircle size={64} className="text-green-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800">
            Payment Successful!
          </h1>
          <p className="mt-2 text-gray-600 max-w-sm">{displayMessage}</p>
          {transactionId && (
            <p className="mt-1 text-sm text-gray-500">
              Transaction ID: {transactionId}
            </p>
          )}
        </div>
      ) : (
        // UI for failed payment
        <div className="flex flex-col items-center">
          <XCircle size={64} className="text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800">Payment Failed</h1>
          <p className="mt-2 text-gray-600 max-w-sm">
            Reason: {displayMessage}
          </p>
          <Button onClick={handleNextStep} className="mt-6 w-full max-w-xs">
            Try a different platform
          </Button>
        </div>
      )}
    </div>
  );
};

export default Step4;