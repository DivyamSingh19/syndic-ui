"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoaderSpinner from "@/components/ui-elements/LoaderSpinner";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const RP = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showOldPin, setShowOldPin] = useState(false);
  const [showNewPin, setShowNewPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [formData, setFormData] = useState({
    oldPin: "",
    newPin: "",
    confirmPin: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Only allow numeric input and limit to 6 digits
    const numericValue = value.replace(/\D/g, "").slice(0, 6);
    setFormData((prev) => ({
      ...prev,
      [name]: numericValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!formData.oldPin || !formData.newPin || !formData.confirmPin) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.newPin !== formData.confirmPin) {
      toast.error("New PIN and confirmation PIN do not match");
      return;
    }

    if (formData.newPin.length < 4) {
      toast.error("PIN must be at least 4 digits");
      return;
    }

    if (formData.oldPin === formData.newPin) {
      toast.error("New PIN must be different from old PIN");
      return;
    }

    setIsLoading(true);

    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/reset-pin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPin: formData.oldPin,
          newPin: formData.newPin,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("PIN reset successfully!");
        // Navigate to the specified route
        router.push("/dashboard/create-transactions/step-3");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to reset PIN");
      }
    } catch (error) {
      console.error("Reset PIN error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="flex flex-col items-center p-8 bg-card/80  shadow-lg rounded-lg max-w-sm mx-auto">
        <Shield size={48} className="text-indigo-600 mb-4" />

        <h2 className="mb-2 text-2xl font-bold text-gray-100">
          Reset Your Platform PIN
        </h2>
        <p className="mb-6 text-sm text-gray-500 text-center">
          Just a few steps to get you back on track.
        </p>

        <form className="space-y-4 w-full" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type={showOldPin ? "text" : "password"}
              name="oldPin"
              placeholder="Old PIN"
              value={formData.oldPin}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 py-2 pl-4 pr-12 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              required
              maxLength={6}
            />
            <span
              className="absolute inset-y-0 right-4 flex cursor-pointer items-center"
              onClick={() => setShowOldPin(!showOldPin)}
            >
              {showOldPin ? (
                <EyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500" />
              )}
            </span>
          </div>

          <div className="relative">
            <input
              type={showNewPin ? "text" : "password"}
              name="newPin"
              placeholder="New PIN"
              value={formData.newPin}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 py-2 pl-4 pr-12 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              required
              maxLength={6}
            />
            <span
              className="absolute inset-y-0 right-4 flex cursor-pointer items-center"
              onClick={() => setShowNewPin(!showNewPin)}
            >
              {showNewPin ? (
                <EyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500" />
              )}
            </span>
          </div>

          <div className="relative">
            <input
              type={showConfirmPin ? "text" : "password"}
              name="confirmPin"
              placeholder="Confirm New PIN"
              value={formData.confirmPin}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 py-2 pl-4 pr-12 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              required
              maxLength={6}
            />
            <span
              className="absolute inset-y-0 right-4 flex cursor-pointer items-center"
              onClick={() => setShowConfirmPin(!showConfirmPin)}
            >
              {showConfirmPin ? (
                <EyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500" />
              )}
            </span>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none disabled:bg-blue-400"
          >
            {isLoading ? (
              <LoaderSpinner message="Resetting PIN" color="white" />
            ) : (
              "Reset PIN"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RP;
