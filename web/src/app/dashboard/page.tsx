"use client";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";

export default function Dashboard() {
  return (
    <div className=" p-6">
      <h1 className="text-2xl font-semibold mb-4">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SectionCards />
        <ChartAreaInteractive />
      </div>
    </div>
  );
}
