import { GalleryVerticalEnd } from "lucide-react";
import { RegisterForm } from "@/components/ui-elements/forms/RegisterForm";
import Image from "next/image"

export default function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/images/r.jpg"
          alt="Image"
          width={500}
          height={300}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-center">
          <h1 className="text-5xl font-mono text-white drop-shadow-lg">
            Start With Excellence
          </h1>
        </div>
      </div>
    </div>
  );
}
