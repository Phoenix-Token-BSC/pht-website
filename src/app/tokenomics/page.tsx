"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IconType } from "react-icons";
import {
  FaFire,
  FaCoins,
  FaBullhorn,
  FaWater,
  FaGift,
  FaLock,
} from "react-icons/fa";
import { FiCopy } from "react-icons/fi";

// --- Data definitions ---

interface SupplyItem {
  icon: IconType;
  key: "totalSupply" | "circulatingSupply" | "burnedSupply" | "lockedSupply";
  fallback: string;
  label: string;
}

interface TaxItem {
  icon: IconType;
  value: string;
  label: string;
}

interface ExternalLink {
  href: string;
  image: string;
  alt: string;
}

const supplyItems: SupplyItem[] = [
  { icon: FaCoins, key: "totalSupply", fallback: "10M", label: "TOTAL SUPPLY" },
  { icon: FaCoins, key: "circulatingSupply", fallback: "1M", label: "CIRCULATING SUPPLY" },
  { icon: FaFire, key: "burnedSupply", fallback: "1M", label: "BURNT SUPPLY" },
  { icon: FaLock, key: "lockedSupply", fallback: "1M", label: "LOCKED SUPPLY" },
];

const taxItems: TaxItem[] = [
  { icon: FaGift, value: "2%", label: "WKC REWARDS" },
  { icon: FaBullhorn, value: "1%", label: "MARKETING" },
  { icon: FaFire, value: "1%", label: "BURN" },
  { icon: FaWater, value: "1%", label: "LIQUDITY POOL" },
];

const externalLinks: ExternalLink[] = [
  { href: "https://tracker.phoenixtoken.community/bsc/pht", image: "/images/fs.png", alt: "firescreener" },
  { href: "https://dexscreener.com/bsc/0x8a2328b2c8e6a6f56668a0e26081efc250a8d6c0", image: "/images/dexscreener-b.png", alt: "dexscreener" },
  { href: "https://www.dextools.io/app/en/bnb/pair-explorer/0x8a2328b2c8e6a6f56668a0e26081efc250a8d6c0?t=1753809078103", image: "/images/dextools-b.png", alt: "dextools" },
  { href: "https://bscscan.com/token/0x885c99a787be6b41cbf964174c771a9f7ec48e04", image: "/images/bscscan.png", alt: "bscscan" },
];

// --- Component ---

export default function TokenomicsPage() {
  const [supplyData, setSupplyData] = useState<{
    totalSupply: string;
    circulatingSupply: string;
    lockedSupply: string;
    burnedSupply: string;
  } | null>(null);

  useEffect(() => {
    const fetchSupply = async () => {
      try {
        const res = await fetch("/api/fetch-supply");
        if (res.ok) {
          const data = await res.json();
          setSupplyData(data);
        }
      } catch (error) {
        console.error("Error fetching supply data:", error);
      }
    };
    fetchSupply();
  }, []);

  const formatSupply = (value: string | undefined, fallback: string) => {
    if (!value) return fallback;
    const num = parseFloat(value);
    if (isNaN(num)) return fallback;
    if (num >= 1_000_000)
      return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
    return num.toLocaleString();
  };

  const fullAddress = "0x885c99a787BE6b41cbf964174C771A9f7ec48e04";
  const shortAddress = `${fullAddress.slice(0, 10)}...${fullAddress.slice(-10)}`;
  const handleCopy = () => {
    navigator.clipboard.writeText(fullAddress);
    alert("Address copied!");
  };

  return (
    <div className="min-h-screen pt-24 pb-16x">
      <main className="relative">
        <section
          className="py-16 px-8 flex flex-col items-center"
          id="tokenomics"
        >
          <h1 className="text-5xl md:text-6xl text-orange-500 mb-4 text-center font-bold">
            TOKENOMICS
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 ">
            {supplyItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.key} className="flex gap-2 items-center">
                  <Icon className="text-orange-500 text-3xl" />
                  <p className="flex flex-col">
                    <span className="text-3xl">
                      {formatSupply(supplyData?.[item.key], item.fallback)}
                    </span>
                    <span className="text-sm md:text-lg">{item.label}</span>
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-16 flex flex-col items-center" id="taxnomics">
            <h1 className="text-5xl md:text-6xl text-orange-500 mb-4 text-center font-bold">
              TAXNOMICS
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {taxItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex gap-2 items-center">
                    <Icon className="text-orange-500 text-3xl" />
                    <p className="flex flex-col">
                      <span className="text-3xl">{item.value}</span>
                      <span className="text-sm md:text-lg">{item.label}</span>
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="p-4 md:p-8 mt-4 bg-orange-500 text-black border-t-2 border-l-2 border-b-6 border-r-6 rounded-lg">
              <p className="flex items-center gap-2">
                {/* Mobile (hidden on md and up) */}
                <span className="font-bold text-lg md:hidden">
                  {shortAddress}
                </span>

                {/* Desktop (hidden below md) */}
                <span className="font-bold text-sm hidden md:inline md:text-xl">
                  {fullAddress}
                </span>

                <button
                  onClick={handleCopy}
                  className="hover:opacity-70"
                  aria-label="Copy address"
                >
                  <FiCopy size={20} />
                </button>
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 justify-center text-black gap-4 text-xl mt-4">
              {externalLinks.map((link) => (
                <div
                  key={link.alt}
                  className="bg-orange-500 border-t-2 border-l-2 border-r-4 border-b-4 p-2 rounded-md"
                >
                  <a href={link.href}>
                    <div className="flex gap-2 items-center aspect-square justify-center">
                      <Image
                        src={link.image}
                        width={40}
                        height={40}
                        alt={link.alt}
                      />
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
