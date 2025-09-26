import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Flag,
  XCircle,
  Lightbulb,
  Heart,
  ShieldCheck,
  Zap,
  Euro,
  Eye,
  Users,
  Rocket,
} from "lucide-react";

export function AboutSection() {
  return (
    <section className="bg-gray-50 dark:bg-black py-16 sm:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Syndic
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mx-auto max-w-2xl">
            At Syndic, we're on a mission to revolutionize global payments. We
            understand the challenges of traditional cross-border transactions:
            high costs, slow processing times, and a lack of transparency.
            That's why we've built a platform that prioritizes speed,
            affordability, and clarity.
          </p>
        </div>

        {/* Sections using Shadcn Card component */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Flag className="text-indigo-600 dark:text-indigo-400 mr-3 h-6 w-6" />
                Mission Statement
              </CardTitle>
            </CardHeader>
            <CardContent>
              To simplify and democratize cross-border payments for everyone,
              everywhere. We are committed to building a transparent, efficient,
              and secure financial network that connects the world.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <XCircle className="text-red-600 dark:text-red-400 mr-3 h-6 w-6" />
                The Problem We Solve
              </CardTitle>
            </CardHeader>
            <CardContent>
              Sending money across borders is often a frustrating experience.
              Traditional methods involve complex processes, multiple
              intermediaries, and hidden fees. This results in delays,
              unexpected costs, and a lack of control over your funds.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="text-green-600 dark:text-green-400 mr-3 h-6 w-6" />
                Our Solution
              </CardTitle>
            </CardHeader>
            <CardContent>
              Syndic offers a modern approach to global payments. Our
              intelligent routing system finds the most efficient path for your
              money, ensuring fast and cost-effective transfers. We operate
              24/7, so you can send and receive funds anytime, anywhere. Our
              transparent fee structure means no surprises, and our real-time
              tracking keeps you informed every step of the way.
            </CardContent>
          </Card>
        </div>

        {/* Core Values Section */}
        <div className="mt-12">
          <div className="flex items-center mb-6">
            <Heart className="text-pink-600 dark:text-pink-400 mr-3 h-6 w-6" />
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Core Values
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <ShieldCheck className="text-blue-500 mr-3 h-5 w-5" />
                  Trust & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                We prioritize the safety of your funds with robust security
                measures and compliance protocols.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Zap className="text-yellow-500 mr-3 h-5 w-5" />
                  Speed & Efficiency
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                Our platform is designed for speed, ensuring your payments
                arrive quickly and reliably.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Euro className="text-green-500 mr-3 h-5 w-5" />
                  Affordability
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                We offer competitive exchange rates and low fees, saving you
                money on every transaction.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Eye className="text-purple-500 mr-3 h-5 w-5" />
                  Transparency
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                We believe in clear and honest communication, providing full
                visibility into your payment journey.
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Final Sections */}
        <div className="space-y-8 mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="text-yellow-600 dark:text-yellow-400 mr-3 h-6 w-6" />
                Who We Serve
              </CardTitle>
            </CardHeader>
            <CardContent>
              Our platform caters to a diverse range of users, including migrant
              workers sending remittances home, small businesses paying
              international suppliers, and enterprises managing global payroll.
              We're committed to providing tailored solutions for each segment.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Rocket className="text-teal-600 dark:text-teal-400 mr-3 h-6 w-6" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              We envision a world where financial borders are seamless, and
              money moves freely and efficiently. We're constantly innovating
              and expanding our services to make this vision a reality. Join us
              in reshaping the future of money movement.
            </CardContent>
          </Card>
        </div>

        {/* Call to Action Button */}
        <div className="text-center mt-12">
          <Button size="lg">Get Started with Syndic</Button>
        </div>
      </div>
    </section>
  );
}
