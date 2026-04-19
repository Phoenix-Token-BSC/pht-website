"use client";

import React from "react";

// --- Data definitions ---

interface RoadmapPhase {
  number: string;
  quarter: string;
  side: "left" | "right";
  items: string[];
}

const roadmapPhases: RoadmapPhase[] = [
  {
    number: "01",
    quarter: "Q1 2025",
    side: "left",
    items: [
      "Meme & Thread Contests",
      "Phoenix Tracker Launch",
      "New partnerships with other memes",
      "Resuregence Foundation website release",
    ],
  },
  {
    number: "02",
    quarter: "Q2 2025",
    side: "right",
    items: [
      "FireScreener Beta Release",
      "Charity Aids",
      "Events Sponsorships",
      "More partnerships",
    ],
  },
  {
    number: "03",
    quarter: "Q3 2025",
    side: "left",
    items: [
      "Listing on CoinGecko",
      "More Events Sponsorship",
      "Charity Aids",
      "FireScreener v1 Release",
    ],
  },
  {
    number: "04",
    quarter: "Q4 2025",
    side: "right",
    items: [
      "FireScreener v4 Release",
      "Partnerships with local companies",
      "Onboarding of charity organizations",
      "Agent Pyronix Beta Release",
      "2026 Roadmap Release",
    ],
  },
];

// --- Component ---

export default function RoadmapPage() {
  return (
    <div className="min-h-screen py-32">
      <main className="relative">
        <section
          id="roadmap"
          className="md:py-24 px-4 md:px-16 relative overflow-hidden"
        >
          {/* Background AI Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)
              `,
                backgroundSize: "50px 50px",
              }}
            ></div>
          </div>

          {/* Floating AI Particles */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-500 rounded-full animate-pulse opacity-60"></div>
            <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-orange-400 rounded-full animate-pulse opacity-40 delay-1000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-orange-300 rounded-full animate-pulse opacity-50 delay-2000"></div>
            <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-orange-600 rounded-full animate-pulse opacity-30 delay-3000"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 mb-4 tracking-wider">
                ROADMAP
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"></div>
              <p className="text-neutral-300 mt-6 mx-auto">
                Our journey to revolutionize the blockchain ecosystem through
                AI-meme innovation
              </p>
            </div>

            {/* Roadmap Timeline */}
            <div className="relative">
              {/* Central Timeline Line - Desktop */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-500 via-orange-400 to-orange-500 rounded-full hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-b from-orange-500 via-orange-400 to-orange-500 rounded-full animate-pulse"></div>
              </div>

              {/* Mobile Timeline Line */}
              <div className="absolute left-4 top-0 w-1 h-full bg-gradient-to-b from-orange-500 via-orange-400 to-orange-500 rounded-full md:hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-orange-500 via-orange-400 to-orange-500 rounded-full animate-pulse"></div>
              </div>

              {roadmapPhases.map((phase, idx) => {
                const isLast = idx === roadmapPhases.length - 1;

                return (
                  <div key={phase.number} className={`relative ${isLast ? "" : "mb-16 md:mb-24"}`}>
                    <div className="flex flex-col md:flex-row items-center">
                      {/* Mobile Node */}
                      <div className="absolute left-4 transform -translate-x-1/2 w-6 h-6 bg-orange-500 rounded-full border-4 border-neutral-900 shadow-lg shadow-orange-500/50 md:hidden animate-pulse"></div>

                      {/* Left Spacer (Desktop) - for right-side phases */}
                      {phase.side === "right" && (
                        <div className="hidden md:block md:w-1/2"></div>
                      )}

                      {/* Desktop Center Node */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-orange-500 rounded-full border-4 border-neutral-900 shadow-lg shadow-orange-500/50 hidden md:block animate-pulse"></div>

                      {/* Content */}
                      <div
                        className={`w-full md:w-1/2 ${
                          phase.side === "left"
                            ? "md:pr-12 pl-12 md:pl-0"
                            : "pl-12 md:pl-12"
                        }`}
                      >
                        <div className="bg-gradient-to-br from-neutral-900/80 to-black/80 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-6 md:p-8 shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:scale-105 group min-h-[200px]">
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mr-4 group-hover:rotate-12 transition-transform duration-300">
                              <span className="text-white font-bold text-xl">
                                {phase.number}
                              </span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-orange-400">
                              {phase.quarter}
                            </h3>
                          </div>
                          <ul className="space-y-2 text-neutral-300 text-sm md:text-base">
                            {phase.items.map((item) => (
                              <li key={item} className="flex items-center">
                                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Right Spacer (Desktop) - for left-side phases */}
                      {phase.side === "left" && (
                        <div className="hidden md:block md:w-1/2"></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
