import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

interface LogoRolodexProps {
  items: React.ReactNode[];
}

interface LogoItemProps {
  children: React.ReactNode;
  className?: string;
}

export const DivOrigami = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-24">
        <h1 className="text-5xl text-center md:text-7xl font-bold text-orange-500 mb-8">OUR PARTNERS</h1>
      <LogoRolodex
        items={[
          <LogoItem key={1} className="bg-black text-neutral-900">
            <Image src="/images/token-logos/wkc.png" alt="wikicat coin" width={300} height={300} className="w-full h-full" />
          </LogoItem>,
          <LogoItem key={2} className="bg-black text-neutral-900">
            <Image src="/images/token-logos/dtg.jpg" alt="defi tiger token" width={300} height={300} className="w-full h-full" />
          </LogoItem>,
          <LogoItem key={3} className="bg-black text-neutral-900">
            <Image src="/images/token-logos/war.png" alt="water rabbit token" width={300} height={300} className="w-full h-full" />
          </LogoItem>,
          <LogoItem key={4} className="bg-black text-black">
           <Image src="/images/token-logos/ocicat.png" alt="ocicat token" width={300} height={300} className="w-full h-full" />
          </LogoItem>,
          <LogoItem key={5} className="bg-black text-neutral-900">
            <Image src="/images/token-logos/yukan.png" alt="yukan token" width={300} height={300} className="w-full h-full" />
          </LogoItem>,
          <LogoItem key={6} className="bg-black text-neutral-900">
            <Image src="/images/token-logos/nene.png" alt="nene token" width={300} height={300} className="w-full h-full" />
          </LogoItem>,
          <LogoItem key={7} className="bg-black text-neutral-900">
            <Image src="/images/token-logos/btcdragon.png" alt="btcragon token" width={300} height={300} className="w-full h-full" />
          </LogoItem>,
          <LogoItem key={8} className="bg-black text-neutral-900">
            <Image src="/images/token-logos/twc.jpg" alt="tiwi ecosystem" width={300} height={300} className="w-full h-full" />
          </LogoItem>,
          <LogoItem key={8} className="bg-black text-neutral-900">
            <Image src="/images/token-logos/bengcat.webp" alt="tiwi ecosystem" width={300} height={300} className="w-full h-full" />
          </LogoItem>,
          <LogoItem key={9} className="bg-black text-neutral-900">
            <Image src="/images/luminous-partner.jpg" alt="tiwi ecosystem" width={300} height={300} className="w-full h-full" />
          </LogoItem>,
          <LogoItem key={10} className="bg-black text-neutral-900">
            <Image src="/images/zuba-partner.png" alt="tiwi ecosystem" width={300} height={300} className="w-full h-full" />
          </LogoItem>,
        ]}
      />
    </section>
  );
};

const DELAY_IN_MS = 2500;
const TRANSITION_DURATION_IN_SECS = 1.5;

const LogoRolodex: React.FC<LogoRolodexProps> = ({ items }) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((pv) => pv + 1);
    }, DELAY_IN_MS);

    return () => {
      clearInterval(intervalRef.current || undefined);
    };
  }, []);

  return (
    <div
      style={{
        transform: "rotateY(-20deg)",
        transformStyle: "preserve-3d",
      }}
      className="relative z-0 h-60 w-60 md:h-80 md:w-80 shrink-0 rounded-xl border border-neutral-700 bg-neutral-800"
    >
      <AnimatePresence mode="sync">
        <motion.div
          style={{
            y: "-50%",
            x: "-50%",
            clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
            zIndex: -index,
            backfaceVisibility: "hidden",
          }}
          key={index}
          transition={{
            duration: TRANSITION_DURATION_IN_SECS,
            ease: "easeInOut",
          }}
          initial={{ rotateX: "0deg" }}
          animate={{ rotateX: "0deg" }}
          exit={{ rotateX: "-180deg" }}
          className="absolute left-1/2 top-1/2"
        >
          {items[index % items.length]}
        </motion.div>
        <motion.div
          style={{
            y: "-50%",
            x: "-50%",
            clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
            zIndex: index,
            backfaceVisibility: "hidden",
          }}
          key={(index + 1) * 2}
          initial={{ rotateX: "180deg" }}
          animate={{ rotateX: "0deg" }}
          exit={{ rotateX: "0deg" }}
          transition={{
            duration: TRANSITION_DURATION_IN_SECS,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2"
        >
          {items[index % items.length]}
        </motion.div>
      </AnimatePresence>

      <hr
        style={{
          transform: "translateZ(1px)",
        }}
        className="absolute left-0 right-0 top-1/2 z-[999999999] -translate-y-1/2 border-t-2 border-neutral-800"
      />
    </div>
  );
};

const LogoItem: React.FC<LogoItemProps> = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        "grid h-52 w-52 md:h-72 md:w-72 place-content-center rounded-lg bg-neutral-700 text-6xl text-neutral-50",
        className
      )}
    >
      {children}
    </div>
  );
};