"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface NavItem {
  label: string;
  href: string;
  isLogo?: boolean;
}

const Header: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: 'About', href: '#about' },
    { label: 'Partners', href: '#partners' },
    { label: 'Tokenomics', href: '#tokenomics' },
    { label: 'DogeMOB', href: '/', isLogo: true },
    { label: 'Products', href: '#products' },
    { label: 'Blog', href: '/blog' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'Buy Now', href: 'https://pancakeswap.finance/swap?outputCurrency=0x885c99a787BE6b41cbf964174C771A9f7ec48e04' },
  ];

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 mt-4 mx-4 md:mx-8 rounded-b-3xl"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 py-4 rounded-2xl bg-black/30 backdrop-blur-xl shadow-xl">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            {navItems.filter(item => item.isLogo).map((item) => (
              <motion.div
                key={item.label}
                className="mx-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="flex items-center space-x-2">
                  <Link href="/" className="w-10 h-10 flex items-center justify-center">
                    <Image src="/images/logo_new_blank.png" alt="logo image" width={50} height={50} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.filter(item => !item.isLogo).map((item, index) => (
              <motion.div
                key={item.label}
                className="relative"
                onHoverStart={() => setHoveredItem(item.label)}
                onHoverEnd={() => setHoveredItem(null)}
              >
                <motion.a
                  href={item.href}
                  className="relative block px-8 py-3 text-sm font-medium text-slate-300 hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Rounded hexagonal background */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 120 48"
                  >
                    <defs>
                      <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={hoveredItem === item.label ? '#8B5CF6' : 'transparent'} />
                        <stop offset="100%" stopColor={hoveredItem === item.label ? '#A855F7' : 'transparent'} />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d="M20 24 Q20 14 30 14 L90 14 Q100 14 100 24 Q100 34 90 34 L30 34 Q20 34 20 24 Z"
                      fill="white"
                      stroke={hoveredItem === item.label ? '#A855F7' : '#64748B'}
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.8 }}
                    />
                  </svg>
                  {/* Text content with proper padding */}
                  <span className="relative text-black z-10 px-4 py-2 block text-center">{item.label}</span>
                  {/* Hover glow effect */}
                  {hoveredItem === item.label && (
                    <motion.div
                      className="absolute inset-0 bg-red-500 rounded-xl blur-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.a>
              </motion.div>
            ))}
          </div>
          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <motion.rect y="6" width="24" height="2" rx="1" fill="red" />
              <motion.rect y="11" width="24" height="2" rx="1" fill="red" />
              <motion.rect y="16" width="24" height="2" rx="1" fill="red  " />
            </svg>
          </button>
        </nav>
      </div>

      {/* Mobile Fullscreen Menu Overlay */}
      <motion.div
        className={`fixed inset-0 min-h-screen z-50 bg-red-950 flex items-center justify-center md:hidden ${menuOpen ? '' : 'pointer-events-none'}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={menuOpen ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <button
          className="absolute top-6 right-6 p-2 rounded-full bg-red-950 text-white"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <line x1="6" y1="6" x2="18" y2="18" stroke="#fff" strokeWidth="2" />
            <line x1="18" y1="6" x2="6" y2="18" stroke="#fff" strokeWidth="2" />
          </svg>
        </button>
        <div className="flex flex-col items-center justify-center w-full h-full space-y-6">
          {navItems.filter(item => !item.isLogo).map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="relative block px-12 py-4 text-xl font-bold text-slate-200 hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMenuOpen(false)}
            >
              <span className="relative z-10">{item.label}</span>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Animated AI-inspired glowing background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-24 bg-gradient-to-r from-red-500/30 via-red-400/20 to-red-500/30 rounded-b-full blur-2xl"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-16 bg-gradient-to-r from-red-500/20 via-red-400/20 to-red-700/20 rounded-t-full blur-2xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>
    </motion.header>
  );
};

export default Header;