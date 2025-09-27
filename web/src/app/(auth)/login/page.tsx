import { GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "@/components/ui-elements/forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/images/l.png"
          alt="Image"
          width={500}
          height={300}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-center">
          <h1 className="text-5xl font-mono text-white drop-shadow-lg">
           Built On The Best
          </h1>
        </div>
      </div>
    </div>
  );
}
