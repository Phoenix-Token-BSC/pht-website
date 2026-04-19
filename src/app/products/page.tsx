"use client";

import React from "react";
import Image from "next/image";

// --- Data definitions ---

interface ProductLink {
  label: string;
  href: string;
}

interface Product {
  name: string;
  description: string;
  image?: string;
  imageAlt?: string;
  imageClass?: string;
  links: ProductLink[];
}

const products: Product[] = [
  {
    name: "FireScreener",
    description:
      "Born from a meme, fueled by purpose, our token tracking platform delivers a blazing dashboard to monitor and analyze tokens across blockchains. Track real-time token burns, chart market trends, and unlock AI-driven insights.",
    image: "/images/firescreener.jpg",
    imageAlt: "FireScreener",
    imageClass: "object-contain w-16 h-16 md:w-36 md:h-36 rounded-md",
    links: [{ label: "Visit FireScreener", href: "https://firescreener.com" }],
  },
  {
    name: "Resurgence Foundation",
    description:
      "Our mission is to empower individuals by providing them with the resources, opportunities, and support they need to thrive. We are committed to making meaningful charity donations to organizations that create positive change in communities worldwide.",
    image: "/images/rflogo.png",
    imageAlt: "Resurgence Foundation Logo",
    imageClass:
      "object-contain w-16 h-16 md:w-36 md:h-36 rounded-2xl bg-white/30 shadow-lg",
    links: [
      {
        label: "Check us out",
        href: "https://www.resurgencefoundation.org",
      },
    ],
  },
  {
    name: "Agent Pyronix",
    description:
      "Pyronix stands as a robust and essential tool for anyone involved in the blockchain space. By leveraging advanced AI technologies, it ensures that the blockchain ecosystem remains secure, transparent, and reliable. Whether you are an investor, developer, or enthusiast, Agent Pyronix is your go-to guardian for navigating the complexities of the blockchain world with confidence.",
    links: [
      { label: "Join Waitlist", href: "#" },
      { label: "Learn more", href: "#" },
    ],
  },
  {
    name: "Phoenix Swap",
    description:
      "Phoenix SWAP is revolutionizing the decentralized exchange landscape by integrating advanced AI technologies and cross-chain capabilities. Experience faster, more secure, and highly flexible trading with Phoenix DEX. Whether you are an experienced trader or just starting, Phoenix DEX offers the tools and features you need to succeed in the world of decentralized finance.",
    links: [{ label: "Coming soon", href: "#" }],
  },
];

// --- Component ---

export default function ProductsPage() {
  return (
    <div className="min-h-screen py-32">
      <main className="relative">
        <section
          id="products"
          className="min-h-screen bg-black/25 flex flex-col w-full px-4 md:px-16 py-8 md:py-16 lg:py-24"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-orange-500 mb-6 md:mb-8 tracking-wider text-center">
            PRODUCTS IN DEVELOPMENTS
          </h1>

          <div className="flex flex-col gap-6 md:gap-8 w-full max-w-5xl mx-auto">
            {products.map((product) => (
              <div
                key={product.name}
                className="flex flex-col md:flex-row md:items-center border-2 border-orange-200/60 rounded-3xl px-4 py-6 md:p-5 shadow-2xl backdrop-blur-xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white rounded-3xl pointer-events-none" />

                {/* Image + mobile title */}
                <div
                  className={`flex items-center gap-3 mb-3 md:mb-0 relative z-10 ${
                    product.image
                      ? "md:w-1/3 md:min-w-[140px] md:max-w-[200px] flex-shrink-0"
                      : "w-full md:w-auto"
                  }`}
                >
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={product.imageAlt || product.name}
                      width={200}
                      height={200}
                      className={product.imageClass}
                    />
                  )}
                  <h2 className="text-base sm:text-lg font-bold text-black md:hidden">
                    {product.name}
                  </h2>
                </div>

                {/* Description + links */}
                <div className="flex-1 flex flex-col relative z-10 text-black md:ml-4 lg:ml-6">
                  <h2 className="hidden md:block text-lg lg:text-xl xl:text-2xl font-bold mb-2 lg:mb-3 text-left">
                    {product.name}
                  </h2>
                  <p className="text-xs sm:text-sm md:text-sm lg:text-sm leading-relaxed max-w-2xl text-left mb-3">
                    {product.description}
                  </p>
                  <div className="flex justify-start gap-2">
                    {product.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 md:px-4 md:py-2 bg-red-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-all text-xs md:text-sm"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
