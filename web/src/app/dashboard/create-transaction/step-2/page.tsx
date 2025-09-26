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

// ... (Platform interface and platforms array remain the same) ...

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
    // This new wrapper centers everything within the page's content area.
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Select the Best Route
        </h1>
        <p className="text-muted-foreground mt-2">
          We've found the best routes for your transaction. Review the details
          and proceed.
        </p>
      </div>

      {/* Your original component is placed inside the centering wrapper */}
      <div className="p-6 bg-card/80 border border-border/50 rounded-2xl w-full max-w-3xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Route Name</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {platforms.map((platform) => (
              <TableRow key={platform.name}>
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>{platform.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {platform.description}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{platform.fee}</TableCell>
                <TableCell>{platform.time}</TableCell>
                <TableCell className="text-right">
                  <Dialog
                    onOpenChange={(open) => {
                      setSelectedPlatform(open ? platform : null);
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline">Select</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-card/90 backdrop-blur-xl border-border/50">
                      {selectedPlatform && (
                        <>
                          <DialogHeader>
                            <DialogTitle>
                              {selectedPlatform.name} Route Details
                            </DialogTitle>
                            <DialogDescription>
                              A summary of the selected route.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-3 py-4 text-sm">
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground">
                                Fee:
                              </span>
                              <span>{selectedPlatform.fee}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground">
                                Est. Time:
                              </span>
                              <span>{selectedPlatform.time}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground">
                                Success Rate:
                              </span>
                              <span>{selectedPlatform.successRate}</span>
                            </div>
                            <div className="border-t border-border/50 pt-3 mt-2 grid gap-3">
                              <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">
                                  Gas Fees:
                                </span>
                                <span>{selectedPlatform.gasFees}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">
                                  Routing Fees:
                                </span>
                                <span>{selectedPlatform.routingFees}</span>
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
    </div>
  );
};

export default Step2;
