//@ts-nocheck
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InitializeTransaction from "@/components/ui-elements/buttons/initializeTransaction";

interface Platform {
  name: string;
  description: string;
  fee: string;
  time: string;
  rating: string;
  successRate: string;
  gasFees: string;
  routingFees: string;
  methods: string;
  isRecommended?: boolean;
  isPopular?: boolean;
  isLowestFee?: boolean;
}

const platforms: Platform[] = [
  {
    name: "PhonePe",
    description: "Fastest processing time with high success rate",
    fee: "1.8%",
    time: "1-2 min",
    rating: "9.5",
    successRate: "98%",
    gasFees: "$0.50",
    routingFees: "$0.20",
    methods: "UPI, Debit Card, Credit Card",
    isRecommended: true,
  },
  {
    name: "Razorpay",
    description: "Most reliable platform with excellent support",
    fee: "2.5%",
    time: "2-3 min",
    rating: "9.2",
    successRate: "96%",
    gasFees: "$0.80",
    routingFees: "$0.30",
    methods: "Net Banking, Debit Card, Credit Card",
    isPopular: true,
  },
  {
    name: "Wise",
    description: "Best rates for international transfers",
    fee: "0.8%",
    time: "1-3 hours",
    rating: "9.1",
    successRate: "94%",
    gasFees: "$0.10",
    routingFees: "$0.15",
    methods: "Bank Transfer",
    isLowestFee: true,
  },
];

const Step2 = () => {
  const router = useRouter();
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null
  );

  const handleInitializeTransaction = async () => {
    router.push("/dashboard/create-transaction/step-3");
  };

  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Route Names</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {platforms.map((platform) => (
            <TableRow key={platform.name}>
              <TableCell className="font-medium">{platform.name}</TableCell>
              <TableCell className="text-right">
                <Dialog
                  onOpenChange={(open) => {
                    if (open) {
                      setSelectedPlatform(platform);
                    } else {
                      setSelectedPlatform(null);
                    }
                  }}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline">Select</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    {/* The content below will be shown in the dialog */}
                    {selectedPlatform && (
                      <>
                        <DialogHeader>
                          <DialogTitle>
                            {selectedPlatform.name} Route Details
                          </DialogTitle>
                          <DialogDescription>
                            A summary of the selected route and its associated
                            fees.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          {/* Platform Details */}
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Platform:</span>
                            <span>{selectedPlatform.name}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Fee:</span>
                            <span>{selectedPlatform.fee}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Time:</span>
                            <span>{selectedPlatform.time}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Rating:</span>
                            <span>{selectedPlatform.rating} ⭐</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Success Rate:</span>
                            <span>{selectedPlatform.successRate}</span>
                          </div>

                          {/* Fee Breakdown */}
                          <div className="border-t pt-4">
                            <h4 className="font-bold text-lg mb-2">
                              Fee Breakdown
                            </h4>
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Gas Fees:</span>
                              <span>{selectedPlatform.gasFees}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Routing Fees:</span>
                              <span>{selectedPlatform.routingFees}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Methods:</span>
                              <span className="text-right">
                                {selectedPlatform.methods}
                              </span>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <InitializeTransaction
                            onClick={handleInitializeTransaction}
                          />
                        </DialogFooter>
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Step2;
