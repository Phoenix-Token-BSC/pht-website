"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { DivOrigami } from "@/components/Partners";
import { IconType } from "react-icons";
import {
  FaFire,
  FaCoins,
  FaBullhorn,
  FaWater,
  FaGift,
  FaCalendarAlt,
  FaUser,
  FaLock,
} from "react-icons/fa";

import Link from "next/link";
import { FiCopy } from "react-icons/fi";
import { NewsService, NewsArticle } from "@/services/news.service";

// --- Data definitions ---

interface FeatureCard {
  image: string;
  alt: string;
  title: string;
  subtitle: string;
}

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

interface ProductSlide {
  name: string;
  description: string;
  image?: string;
  imageAlt?: string;
  imageClass?: string;
  links: { label: string; href: string }[];
}

interface RoadmapPhase {
  number: string;
  quarter: string;
  side: "left" | "right";
  items: string[];
}

interface FAQItem {
  question: string;
  answer: string;
}

const featureCards: FeatureCard[] = [
  { image: "/images/burn.png", alt: "PHT Token Burn", title: "BURN", subtitle: "HAPPENS EVERYTIME" },
  { image: "/images/ownership.png", alt: "PHT Token Ownership Renounced", title: "OWNERSHIP", subtitle: "RENOUNCED" },
  { image: "/images/lp-lock.png", alt: "PHT Token Liquidity Locked", title: "LIQUIDITY", subtitle: "LOCKED" },
];

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

const productSlides: ProductSlide[] = [
  {
    name: "FireScreener",
    description: "Born from a meme, fueled by purpose, our token tracking platform delivers a blazing dashboard to monitor and analyze tokens across blockchains. Track real-time token burns, chart market trends, and unlock AI-driven insights.",
    image: "/images/firescreener.jpg",
    imageAlt: "FireScreener",
    imageClass: "object-contain w-18 h-18 md:w-36 md:h-36 rounded-md",
    links: [{ label: "Visit FireScreener", href: "https://firescreener.com" }],
  },
  {
    name: "Resurgence Foundation",
    description: "Our mission is to empower individuals by providing them with the resources, opportunities, and support they need to thrive. We are committed to making meaningful charity donations to organizations that create positive change in communities worldwide.",
    image: "/images/rflogo.png",
    imageAlt: "Resurgence Foundation Logo",
    imageClass: "object-contain w-18 h-18 md:w-36 md:h-36 rounded-2xl bg-white/30 shadow-lg",
    links: [{ label: "Check us out", href: "https://www.resurgencefoundation.org" }],
  },
  {
    name: "Agent Pyronix",
    description: "Pyronix stands as a robust and essential tool for anyone involved in the blockchain space. By leveraging advanced AI technologies, it ensures that the blockchain ecosystem remains secure, transparent, and reliable. Whether you are an investor, developer, or enthusiast, Agent Pyronix is your go-to guardian for navigating the complexities of the blockchain world with confidence.",
    links: [{ label: "Join Waitlist", href: "#" }, { label: "Learn more", href: "#" }],
  },
  {
    name: "Phoenix Swap",
    description: "Phoenix SWAP is revolutionizing the decentralized exchange landscape by integrating advanced AI technologies and cross-chain capabilities. Experience faster, more secure, and highly flexible trading with Phoenix DEX. Whether you are an experienced trader or just starting, Phoenix DEX offers the tools and features you need to succeed in the world of decentralized finance.",
    links: [{ label: "Coming soon", href: "#" }],
  },
];

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

const brandImages = [
  "/images/brand-images/01.jpg",
  "/images/brand-images/02.jpg",
  "/images/brand-images/03.jpg",
  "/images/brand-images/04.jpg",
  "/images/brand-images/05.jpg",
  "/images/brand-images/06.jpg",
  "/images/brand-images/07.jpg",
  "/images/brand-images/08.jpg",
  "/images/brand-images/09.jpg",
  "/images/brand-images/10.jpg",
  "/images/brand-images/11.jpg",
  "/images/brand-images/12.jpg",
];

const faqItems: FAQItem[] = [
  {
    question: "What is Phoenix Token (PHT)?",
    answer: "A Community Owned project created for the Ordinary Man (everyone), from the ashes of the Phoenix\u2019s myth of resilence and transformation.",
  },
  {
    question: "How can I buy Phoenix Token?",
    answer: "You can purchase Phoenix Token through various decentralized exchanges (DEXs) and centralized exchanges where PHT is listed. Always ensure you\u2019re using official contract addresses and trusted platforms. Check our official website for the latest exchange listings.",
  },
  {
    question: "What is the total supply of PHT?",
    answer: "Phoenix Token has a total supply of 10 million tokens. We\u2019ve implemented a deflationary mechanism with regular burns, including an initial burn of 1 million tokens. This helps maintain scarcity and potential value appreciation over time.",
  },
  {
    question: "Why are we pushing for Artificial Intelligence?",
    answer: "We believe that Artificial Intelligence (AI) has the transformative potential to revolutionize the development and modeling of Blockchain security. By leveraging AI technologies, we can enhance the robustness and efficiency of blockchain systems, ensuring more secure and resilient networks.",
  },
  {
    question: "What do I earn for holding PHT?",
    answer: "You get rewarded in WikiCat Coin (WKC) for holding PHT. The more you hold, the more WKC you earn.",
  },
  {
    question: "What is the tax distribution?",
    answer: "The tax distribution is as follows: 2% WikiCat Coin (WKC), 1% Marketing, 1% Liquidity, 1% Buyback and Burn.",
  },
  {
    question: "What makes Phoenix Token different?",
    answer: "Phoenix Token stands out through its comprehensive AI-powered ecosystem, combining meme culture with serious utility. Our unique features include advanced token analytics, AI-driven trading insights, cross-chain capabilities, and a strong focus on community governance and charitable initiatives.",
  },
  {
    question: "How can I stay updated with Phoenix Token?",
    answer: "Follow our official social media channels, join our community on Telegram, and follow us on X (formerly Twitter). We regularly share updates about new features, partnerships, roadmap progress, and important announcements across all our platforms.",
  },
  {
    question: "How can I contribute to the growth of the project?",
    answer: "Spread awareness of the Phoenix Token Project by sharing its vision of resilience and transformation to family and friends, on social media, blogs, or forums to grow the community and bring in more ordinary people.",
  },
];

// --- Component ---

export default function Home() {
  // FAQ state management
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Carousel state for 'OUR PRODUCTS' section
  const [activeSlide, setActiveSlide] = React.useState(0);
  const carouselRef = React.useRef<HTMLDivElement>(null);

  // Supply data state
  const [supplyData, setSupplyData] = useState<{
    totalSupply: string;
    circulatingSupply: string;
    lockedSupply: string;
    burnedSupply: string;
  } | null>(null);

  // News state
  const [blogs, setBlogs] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const allBlogs = await NewsService.getPublished();
        setBlogs(allBlogs.slice(0, 4));
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

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

  // Scroll to slide when indicator is clicked
  const scrollToSlide = (idx: number) => {
    if (carouselRef.current) {
      const slide = carouselRef.current.children[idx] as HTMLElement;
      if (slide) {
        slide.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
    setActiveSlide(idx);
  };

  const fullAddress = "0x885c99a787BE6b41cbf964174C771A9f7ec48e04";
  const shortAddress = `${fullAddress.slice(0, 10)}...${fullAddress.slice(-10)}`;
  const handleCopy = () => {
    navigator.clipboard.writeText(fullAddress);
    alert("Address copied!");
  };

  // Update active slide on scroll
  const handleScroll = () => {
    if (carouselRef.current) {
      const children = Array.from(
        carouselRef.current.children,
      ) as HTMLElement[];
      const scrollLeft = carouselRef.current.scrollLeft;
      const slideWidth = children[0]?.offsetWidth || 1;
      const idx = Math.round(scrollLeft / slideWidth);
      setActiveSlide(idx);
    }
  };

  return (
    <div className="min-h-screen">
     
      <main className="relative">
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
          {/* Background Text */}
          <div className="absolute inset-0 flex items-start pt-48 justify-center z-0">
            <h2 className="text-center font-bold opacity-5 select-none pointer-events-none whitespace-nowrap text-slate-200 leading-none">
              <span className="block text-[20vw] xs:text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[12vw] xl:text-[10vw] 2xl:text-[8vw]">
                THE ORDINARY
              </span>
              <span className="block text-[20vw] xs:text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[12vw] xl:text-[10vw] 2xl:text-[8vw] mt-[-0.2em]">
                MAN&apos;S TOKEN
              </span>
            </h2>
          </div>

          {/* Main Content Container */}
          <div className="relative z-10 h-screen flex flex-col justify-end pb-0">
            {/* Character Image with Action Buttons above */}
            <div className="relative flex justify-center">
              <div className="relative flex flex-col items-center">
                <Image
                  src="/images/landing-meme.png"
                  alt="PHT fight meme mascot"
                  width={2000}
                  height={2000}
                  priority
                  className="h-[70vh] md:h-[70vh] w-auto object-bottom drop-shadow-2xl"
                />
                <div className="absolute bottom-0  mb-16 flex items-center justify-center">
                  <a
                    href="https://pancakeswap.finance/swap?outputCurrency=0x885c99a787BE6b41cbf964174C771A9f7ec48e04"
                    className="px-4 py-2 md:px-8 bg-gradient-to-b from-red-500 to-red-700 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-all mr-4"
                  >
                    Buy Now
                  </a>
                  <a
                    href="/whitepaper.pdf"
                    className="px-4 py-2 md:px-8 border-2 bg-white text-neutral-800 font-bold rounded-xl shadow-lg hover:scale-105 transition-all"
                  >
                    Check Whitepaper
                  </a>
                </div>
                {/* Glow effect behind character */}
                <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 via-transparent to-transparent blur-3xl -z-10 scale-110" />
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-600 rounded-full animate-pulse opacity-60" />
            <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-orange-500 rounded-full animate-pulse opacity-40 delay-1000" />
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse opacity-50 delay-2000" />
            <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-pulse opacity-30 delay-3000" />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/20 pointer-events-none" />
        </section>

        {/* about section */}
        <section className="px-4 mx-4 md:mx-16 py-16 md:py-24" id="about">
          <div className="px-4 md:px-12 py-8 md:py-8 border border-orange-500 rounded-xl p-4">
            <h1 className="text-4xl md:text-5xl text-orange-500 font-bold text-center mb-8">
              ABOUT PHOENIX TOKEN
            </h1>
            <p className="text-md md:text-lg text-center text-neutral-300">
              Phoenix Token was born from the idea that crypto should belong to
              everyone, not just whales and insiders. We rise from the ashes
              stronger every time. We combine unbreakable community resilience,
              meaningful charity work, and relentless product development to
              create something different:
              <span className="block text-orange-500 font-bold text-xl">
                THE ORDINARY MAN'S TOKEN
              </span>
            </p>
          </div>
        </section>

        {/* Feature cards section */}
        <section className="px-4 md:px-16 py-16">
          <h1 className="text-4xl md:text-6xl text-orange-500 font-bold mb-8">
            THE FIRST TRUE MEME+AI TOKEN
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featureCards.map((card) => (
              <div key={card.title} className="flex flex-col gap-2 bg-neutral-300 border border-orange-500 p-2 rounded-2xl">
                <Image
                  src={card.image}
                  alt={card.alt}
                  width={500}
                  height={500}
                  className="rounded-2xl"
                />
                <p className="flex flex-col text-neutral-900">
                  <span className="text-2xl font-bold">{card.title}</span>
                  <span className="text-md">{card.subtitle}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="partners">
          <DivOrigami />
        </section>

        {/* Tokenomics section */}
        <section
          className="py-16 px-8 flex flex-col items-center"
          id="tokenomics"
        >
          <h1 className="text-5xl md:text-6xl text-orange-500 mb-4 text-center font-bold">
            TOKENOMICS
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
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

          <div className="mt-8 flex flex-col items-center" id="tokenomics">
            <h1 className="text-5xl md:text-6xl text-orange-500 mb-4 text-center font-bold">
              TAXNOMICS
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
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

        {/* Products section */}
        <section
          id="products"
          className="min-h-screen bg-black/25 flex flex-col w-full max-w-full overflow-x-hidden px-4 md:px-16 py-4 md:py-16 lg:py-24"
        >
          <div className="flex-1 flex flex-col justify-center items-center w-full max-w-full">
            <div className="flex flex-col w-full max-w-full h-full">
              <h1 className="text-4xl md:text-5xl font-extrabold text-orange-500 mb-6 md:mb-8 tracking-wider text-center">
                PRODUCTS IN DEVELOPMENTS
              </h1>
              {/* Carousel */}
              <div className="relative flex flex-col flex-1 w-full max-w-full">
                <div
                  ref={carouselRef}
                  className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 items-stretch w-full max-w-full hide-scrollbar"
                  style={{
                    scrollBehavior: "smooth",
                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
                    touchAction: "pan-x",
                    minHeight: "250px",
                    maxHeight: "350px",
                  }}
                  onScroll={handleScroll}
                  aria-live="polite"
                >
                  {productSlides.map((product) => (
                    <div
                      key={product.name}
                      className="w-full min-w-full flex-shrink-0 h-full flex flex-col justify-start items-center md:flex-row md:items-center border-2 border-orange-200/60 rounded-3xl px-4 py-8 md:p-4 lg:p-5 shadow-2xl snap-center transition-all duration-300 backdrop-blur-xl bg-opacity-80 relative overflow-hidden bg-white text-black"
                    >
                      <div className="absolute inset-0 bg-white rounded-3xl pointer-events-none" />

                      {/* Mobile: Image and Title */}
                      <div aria-hidden="false" className="flex items-center gap-3 mb-3 md:hidden relative z-10 w-full">
                        {product.image && (
                          <div className="rounded-xl flex items-center justify-center flex-shrink-0">
                            <Image
                              src={product.image}
                              alt={product.imageAlt || product.name}
                              width={200}
                              height={200}
                              className={product.imageClass || "object-contain w-18 h-18 rounded-md"}
                            />
                          </div>
                        )}
                        <h2 className="text-base sm:text-lg font-bold text-black">
                          {product.name}
                        </h2>
                      </div>

                      {/* Desktop: Product Logo */}
                      {product.image && (
                        <div aria-hidden="true" className="hidden md:flex rounded-xl items-center justify-center relative z-10 md:w-1/3 md:min-w-[140px] md:max-w-[180px] lg:max-w-[200px] flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.imageAlt || product.name}
                            width={200}
                            height={200}
                            className={`object-contain w-20 h-20 md:w-36 md:h-36 ${product.imageClass?.includes("rounded-2xl") ? "rounded-2xl bg-white/30 shadow-lg" : "rounded-md"}`}
                          />
                        </div>
                      )}

                      <div className="flex-1 flex flex-col relative z-10 text-black md:ml-4 lg:ml-6">
                        <h2 className="hidden md:block text-lg lg:text-xl xl:text-2xl font-bold mb-2 lg:mb-3 text-left">
                          {product.name}
                        </h2>
                        <p className="text-xs sm:text-sm md:text-sm lg:text-sm leading-relaxed max-w-2xl text-left mb-2 lg:mb-3">
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
                {/* Slide Indicators */}
                <div className="flex justify-center items-center gap-3 md:gap-4 mt-4 md:mt-6 pb-2 md:pb-4">
                  {productSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => scrollToSlide(idx)}
                      className={`w-16 md:w-20 h-3 md:h-4 rounded-full transition-all duration-300 focus:outline-none border-2 border-orange-300/60 shadow ${activeSlide === idx ? "bg-white/90 scale-110" : "bg-gray-700/60"}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap section */}
        <section
          id="roadmap"
          className="py-16 md:py-24 px-4 md:px-16 bg-[#150000] relative overflow-hidden"
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
                      <div aria-hidden="false" className="absolute left-4 transform -translate-x-1/2 w-6 h-6 bg-orange-500 rounded-full border-4 border-neutral-900 shadow-lg shadow-orange-500/50 md:hidden animate-pulse"></div>

                      {/* Left Spacer (Desktop) - for right-side phases */}
                      {phase.side === "right" && (
                        <div aria-hidden="false" className="hidden md:block md:w-1/2"></div>
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

        {/* Blog section */}
        <section
          id="blog"
          className="py-16 md:py-24 px-4 md:px-16 bg-[#0a0000] relative overflow-hidden"
        >
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 mb-4 tracking-wider uppercase">
                Blog & News
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"></div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
              </div>
            ) : blogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {blogs.map((blog) => (
                  <Link
                    key={blog.id}
                    href={`/blog/${blog.slug}`}
                    className="group flex flex-col bg-neutral-900/50 backdrop-blur-xl border border-orange-500/20 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="aspect-[16/9] relative overflow-hidden">
                      <Image
                        src={blog.imageUrl || "/images/website_pfp.png"}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 bg-orange-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
                        {blog.category || "News"}
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 text-neutral-400 text-[10px] mb-3">
                        <span className="flex items-center gap-1">
                          <FaCalendarAlt className="text-orange-500" />
                          {new Date(blog.publishedAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaUser className="text-orange-500" />
                          {blog.author.name || "Admin"}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-orange-400 transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-neutral-400 text-xs line-clamp-3 mb-4 flex-1">
                        {blog.excerpt}
                      </p>
                      <span className="text-orange-500 text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More <span>→</span>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-neutral-400">No articles found.</p>
              </div>
            )}

            <div className="text-center">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-all text-sm uppercase tracking-widest"
              >
                View More News
              </Link>
            </div>
          </div>
        </section>

        {/* Brand assets section */}
        <section className="py-16 md:py-24 px-4 md:px-16 bg-white text-black relative overflow-hidden">
          <style
            dangerouslySetInnerHTML={{
              __html: `
              @keyframes scroll-horizontal {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .auto-scroll {
                animation: scroll-horizontal 20s linear infinite;
              }
            `,
            }}
          />

          <div id="meme-assets" className="relative z-10 max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12 md:mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 mb-4 tracking-wider">
                MEME ASSETS
              </h1>

              <p className="max-w-3xl mx-auto leading-relaxed mb-4">
                Explore our comprehensive collection of brand assets, logos, and
                visual elements. Download high-quality resources for your
                projects and partnerships with Phoenix Token.
              </p>
              <Link
                href="/memes"
                className="text-white rounded-xl px-4 py-2 md:text:xl font-bold bg-gradient-to-b from-orange-600 to-red-600"
              >
                GET THEM HERE
              </Link>
            </div>

            {/* Auto-scrolling Image Gallery */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-neutral-800/50 to-neutral-900/50 backdrop-blur-sm border border-orange-500/20 p-6 md:p-8">
              <div className="flex space-x-6 md:space-x-8 auto-scroll">
                {brandImages.map((src, idx) => (
                  <div
                    key={idx}
                    className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-xl border border-orange-500/30 group hover:scale-105 transition-transform duration-300 overflow-hidden"
                  >
                    <Image
                      src={src}
                      alt={`meme ${idx + 1}`}
                      width={160}
                      height={160}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <section className="py-16 md:py-24 px-4 md:px-16 relative overflow-hidden">
          {/* Background AI Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)
              `,
                backgroundSize: "40px 40px",
              }}
            ></div>
          </div>

          {/* Floating AI Particles */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-orange-400 rounded-full animate-pulse opacity-40"></div>
            <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse opacity-30 delay-1000"></div>
            <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-orange-300 rounded-full animate-pulse opacity-50 delay-2000"></div>
            <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-orange-600 rounded-full animate-pulse opacity-20 delay-3000"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12 md:mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 mb-4 tracking-wider">
                FAQ
              </h1>
              <p className="text-neutral-300 max-w-2xl mx-auto leading-relaxed">
                Find answers to the most commonly asked questions about Phoenix
                Token and our ecosystem.
              </p>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4 md:space-y-6">
              {faqItems.map((faq, idx) => (
                <div
                  key={idx}
                  className={`transition-all duration-300 ${openFAQ === idx ? "transform scale-[1.02]" : ""}`}
                >
                  <div
                    className={`bg-gradient-to-br from-neutral-900/80 to-black/80 backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-300 ${
                      openFAQ === idx
                        ? "border-orange-500/60 shadow-lg shadow-orange-500/20"
                        : "border-orange-500/20 hover:border-orange-500/40"
                    }`}
                  >
                    <button
                      onClick={() => toggleFAQ(idx)}
                      className={`w-full px-6 md:px-8 py-6 md:py-8 text-left flex items-center justify-between transition-all duration-300 ${
                        openFAQ === idx
                          ? "bg-orange-500/10"
                          : "hover:bg-orange-500/5"
                      }`}
                    >
                      <h3 className="text-sm md:text-lg font-bold text-orange-400 pr-4">
                        {faq.question}
                      </h3>
                      <div
                        className={`flex-shrink-0 w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          openFAQ === idx
                            ? "bg-orange-500/40 rotate-45"
                            : "hover:bg-orange-500/30"
                        }`}
                      >
                        <span className="text-orange-500 text-xl font-bold">
                          +
                        </span>
                      </div>
                    </button>
                    <div
                      className={`transition-all duration-300 ease-in-out ${
                        openFAQ === idx
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      } overflow-hidden`}
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8">
                        <div className="border-t border-orange-500/20 pt-6">
                          <p className="text-sm text-neutral-300 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
