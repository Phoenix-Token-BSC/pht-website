import React from "react";
import Image from "next/image";

const phtlogo = "/images/logo_blank.png";

export const Footer = () => {
  return (
    <footer className="text-sm flex flex-col md:flex-row gap-20 bg-gradient-to-b from-orange-200 to-orange-400 px-8 py-24 text-black md:items-top">
      <div className="md:w-[40%]">
        <div className="">
          <div className="flex gap-2 pb-2 items-center">
            <Image src={phtlogo} alt="Phoenix logo" width={50} height={50} />
            <h2 className="font-bold text-2xl" style={{letterSpacing: "-2px"}}>Phoenix Token</h2>
          </div>
          <p className="text-sm md:text-md">
            Safeguarding Communities through the best AI technology and
            Empowering Individuals through the Phoenix nature of resilience and
            transformation.
          </p>
        </div>
      </div>
      <div className="">
        <h2 className="uppercase text-lg md:text-xl font-bold pb-4">
          Utilities
        </h2>
        <a href="https://firescreener.com" className="block mb-2 text-sm md:text-lg uppercase hover:underline">FireScreener</a>
        <a href="https://www.resurgencefoundation.org" className="block mb-2 text-sm md:text-lg uppercase hover:underline">Resurgence Foundation</a>
        <a href="#" className="block mb-2 text-sm md:text-lg uppercase hover:underline">Agent Pyronix</a>
        <a href="#" className="block mb-2 text-sm md:text-lg uppercase hover:underline">Phoenix Swap</a>
      </div>

      <div className="">
        <h2 className="uppercase text-lg md:text-xl font-bold pb-4">
          Follow us
        </h2>
        <a href="https://t.me/PhoenixToken0" className="block mb-2 text-sm md:text-lg uppercase hover:underline">Telegram</a>
        <a href="https://x.com/PhoenixToken0" className="block mb-2 text-sm md:text-lg uppercase hover:underline">Twitter</a>
        <a href="https://medium.com/@phoenixtoken" className="block mb-2 text-sm md:text-lg uppercase hover:underline">Medium</a>
        <a href="#" className="block mb-2 text-sm md:text-lg uppercase hover:underline">Warpcaster</a>
      </div>

      <div className="">
        <h2 className="uppercase text-lg md:text-xl font-bold pb-4">OTHERS</h2>
        <a href="/memes" className="block mb-2 text-sm md:text-lg uppercase hover:underline">Meme Assets</a>
        <a href="https://pancakeswap.finance/swap?outputCurrency=0x885c99a787BE6b41cbf964174C771A9f7ec48e04" className="block mb-2 text-sm md:text-lg uppercase hover:underline">
          PANCAKESWAP
        </a>
        <a href="https://flooz.xyz/swap?tokenAddress=0x885c99a787be6b41cbf964174c771a9f7ec48e04&network=bsc&utm_source=Telegram&utm_medium=swap-CTA&utm_campaign=BuyWizardBot" className="block mb-2 text-sm md:text-lg uppercase hover:underline">
          BUY WITH FIAT
        </a>
        {/* <FlipLink href="#">Instagram</FlipLink> */}
      </div>
    </footer>
  );
};

