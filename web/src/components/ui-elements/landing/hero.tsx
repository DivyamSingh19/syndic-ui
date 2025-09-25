"use client";
import { Globe } from "@/components/magic-ui/globe";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* Left Column: Text */}
          <div className="relative z-10 text-center md:text-left pl-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-snug flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-3">
              <span>Say goodbye</span>
              <span className="whitespace-nowrap inline-flex items-baseline gap-3">
                <span className="inline-block">to</span>

                <ContainerTextFlip
                  words={[
                    "delayed",
                    "expensive",
                    "complex",
                    "blocked",
                    "outdated",
                  ]}
                  className="inline-block align-baseline text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text"
                />
              </span>

              <span>transfers forever.</span>
            </h1>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-6">
              {/* Primary CTA */}
              <Button
                asChild
                className="w-full sm:w-auto px-6 py-3 text-base font-semibold rounded-xl shadow-md bg-accent-foreground text-white transition-transform hover:scale-105"
              >
                <a href="#">Get started</a>
              </Button>

              {/* Secondary CTA */}
              <Button
                asChild
                variant="outline"
                className="w-full sm:w-auto px-6 py-3 text-base font-semibold rounded-xl border-2 border-gray-900 dark:border-gray-100 bg-transparent text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-transform hover:scale-105"
              >
                <a href="#">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column Grid Placeholder */}
          <div className="hidden md:block"></div>
        </div>
      </div>

      {/* Desktop Globe */}
      <div className="hidden md:flex absolute top-0 right-0 h-full w-1/2 items-center justify-center">
        <div className="w-full max-w-xl">
          <Globe />
        </div>
      </div>
    </>
  );
}
