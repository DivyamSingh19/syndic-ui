import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Wallet from "@/components/ui-elements/buttons/wallet";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="flex w-full items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-4">
        {/* Sidebar toggle (mobile-first) */}
        <SidebarTrigger className="-ml-1" />

        {/* Separator only visible from sm+ */}
        <Separator
          orientation="vertical"
          className="mx-2 hidden h-6 sm:block"
        />

        {/* Responsive title */}
        <h1
          className={cn(
            "truncate font-semibold tracking-tight",
            "text-lg sm:text-xl md:text-2xl lg:text-3xl"
          )}
        >
          Welcome Morpheus
        </h1>

        {/* Right section */}
        <div className="ml-auto flex items-center gap-2">
          <Wallet />
        </div>
      </div>
    </header>
  );
}
