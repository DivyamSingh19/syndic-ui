"use client";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import CountrySelector from "@/components/ui/ui-elements/selectors/CountrySelector";

// Dynamic import for the map component to avoid SSR errors
const MapComponent = dynamic(() => import("@/components/ui/ui-elements/Map"), {
  ssr: false,
});

interface FormData {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

const LocationForm = () => {
  const router = useRouter();
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [mapPosition, setMapPosition] = useState<[number, number] | null>(null);
  const mapRef = useRef<any>(null);

  const form = useForm<FormData>({
    defaultValues: {
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });

  const reverseGeocode = async (lat: number, lng: number) => {
    setIsGeocoding(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      if (data && data.address) {
        const address = data.address;
        const countryCode = address.country_code?.toLowerCase() || "";
        form.reset({
          address: address.road || "",
          city: address.city || address.town || address.village || "",
          state: address.state || "",
          postalCode: address.postcode || "",
          country: countryCode,
        });
        toast.success("Location found and form filled!");
      } else {
        toast.error("Could not find address for this location.");
      }
    } catch (error) {
      toast.error("Geocoding service failed. Please try again.");
    } finally {
      setIsGeocoding(false);
    }
  };

  const handleUseCurrentLocation = () => {
    if (!("geolocation" in navigator)) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }

    setIsGeocoding(true);
    toast.info("Finding your current location...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setMapPosition([latitude, longitude]);
        if (mapRef.current) {
          mapRef.current.flyTo([latitude, longitude], 13);
        }
        reverseGeocode(latitude, longitude);
      },
      (error) => {
        toast.error(`Geolocation failed: ${error.message}`);
        setIsGeocoding(false);
      }
    );
  };

  const onSubmit = (data: FormData) => {
    console.log("Form data submitted:", data);
    toast.success("Address saved successfully!");
    router.push("/onboarding/platformpin");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Left-hand side: Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-xl">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Where are you located?</h1>
            <p className="text-sm text-gray-500 mt-1">
              This helps us personalize your experience.
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="address"
                rules={{ required: "Street address is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Street Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  rules={{ required: "City is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State/Province (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter State/Province" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="postalCode"
                  rules={{ required: "Postal Code is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Postal Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  rules={{ required: "Country is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <CountrySelector
                        onValueChange={field.onChange}
                        value={field.value}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="w-1/2 h-10 bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Continue
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleUseCurrentLocation}
                  className="w-1/2 h-10 flex items-center gap-2"
                  disabled={isGeocoding}
                >
                  {isGeocoding && <Loader2 className="animate-spin" />}
                  Use current location
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      {/* Right-hand side: Map */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background md:flex">
        <div className="w-full h-full rounded-lg overflow-hidden border shadow-lg">
          <MapComponent
            position={mapPosition}
            isGeocoding={isGeocoding}
            onMapClick={(lat, lng) => {
              setMapPosition([lat, lng]);
              reverseGeocode(lat, lng);
            }}
            mapRef={mapRef}
          />
        </div>
      </div>
    </div>
  );
};

export default LocationForm;
