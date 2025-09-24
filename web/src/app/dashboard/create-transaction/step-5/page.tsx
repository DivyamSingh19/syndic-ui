"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";


const alternativePlatforms = [
  {
    name: "Razorpay",
    description: "Most reliable platform with excellent support",
    fee: "2.5%",
    time: "2-3 min",
    rating: "9.2",
    successRate: "96%",
  },
  {
    name: "Wise",
    description: "Best rates for international transfers",
    fee: "0.8%",
    time: "1-3 hours",
    rating: "9.1",
    successRate: "94%",
  },
  {
    name: "PayPal",
    description: "Globally accepted with buyer protection",
    fee: "3.2%",
    time: "5-10 min",
    rating: "8.8",
    successRate: "92%",
  },
];

const Step5 = () => {
  const router = useRouter();

  const handleSelectPlatform = (platformName: string) => {
    // In a real application, this would pass the selected platform to the next step
    console.log(`User selected: ${platformName}`);
    // You would navigate back to the payment details page (Step 2) with the new platform pre-selected.
    // router.push("/dashboard/create-payment/step-2?platform=" + platformName);
    router.push("/dashboard/create-transaction/step-2")
  };

  return (
    <div className="flex flex-col items-center p-4 ">
      <Card className="w-full max-w-3xl bg-background">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Choose an Alternative
          </CardTitle>
          <CardDescription>
            The previous transaction failed. Please choose one of the next best
            platforms to complete your payment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {alternativePlatforms.map((platform, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-md shadow-sm"
              >
                <div>
                  <h3 className="text-lg font-medium">{platform.name}</h3>
                  <p className="text-sm text-gray-500">
                    {platform.description}
                  </p>
                </div>
                <Button onClick={() => handleSelectPlatform(platform.name)}>
                  Select
                </Button>
              </div>
            ))}
          </div>
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mt-6 w-full"
          >
            <ChevronLeft size={16} className="mr-2" />
            Go back to previous step
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Step5;
