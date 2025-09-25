"use client";
import { Globe } from "@/components/magic-ui/globe";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";

export function HeroSection() {
  return (
    <>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* Left Column: Text */}
          <div className="relative z-10 text-center md:text-left pl-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-snug flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-3">
              <span>Say goodbye to</span>

              <span className="inline-block bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
                <ContainerTextFlip
                  words={["delayed", "expensive", "complex", "blocked","outdated"]}
                />
              </span>

              <span>transfers forever.</span>
            </h1>

            <p className="mt-6 text-lg leading-8 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text md:bg-none md:text-gray-600 md:dark:text-gray-300">
              The way money was always meant to move.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 md:justify-start">
              {/* Added subtle hover animations to buttons */}
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-transform hover:scale-105"
              >
                Get started
              </a>
              <a
                href="#"
                className="text-sm font-semibold shadow-sm bg-black border border-neutral-50 rounded-md px-3.5 py-2.5 text-gray-900 dark:text-white transition-transform hover:scale-105"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          {/* Right Column Grid Placeholder */}
          <div className="hidden md:block"></div>
        </div>
      </div>

      {/* Desktop Globe (Absolute Positioning) */}
      <div className="hidden md:flex absolute top-0 right-0 h-full w-1/2 items-center justify-center">
        <div className="w-full max-w-xl">
          <Globe />
        </div>
      </div>

      {/* Mobile Globe (In-flow) */}
      <div className="md:hidden mt-12 container mx-auto px-4">
        <div className="w-full max-w-md mx-auto">
          <Globe />
        </div>
      </div>
    </>
  );
}
