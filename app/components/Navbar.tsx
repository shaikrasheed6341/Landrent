"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

interface NavItem {
  href: string;
  label: string;
  ariaLabel?: string;
  scroll?: boolean;
}

const navItems: NavItem[] = [
  { href: "/", label: "Home", ariaLabel: "Go to homepage" },
  {
    href: "/#properties", 
    label: "Properties",
    ariaLabel: "Scroll to properties section",
    scroll: true,
  },
  { href: "/contact", label: "Contact", ariaLabel: "Go to contact page" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      setIsOpen(!isOpen);
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-zinc-900 p-4 container flex flex-col md:flex-row justify-between items-center px-6 relative"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="text-white text-sm mb-4 md:mb-0 flex items-center justify-between w-full md:w-auto">
        <motion.span className="cursor-pointer rounded-full">
          <Image
            src="https://zxetkysuahfjolouwpgh.supabase.co/storage/v1/object/public/homerent//Black%20White%20Simple%20Circle%20Leaf%20Frame%20Logo.png"
            alt="Logo"
            width={50}
            height={70}
            className="object-contain rounded-full"
            priority
          />
        </motion.span>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="md:hidden text-white text-lg"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </motion.button>
      </div>

      <motion.div
        initial={false}
        animate={{
          opacity: 1,
          height: isOpen ? "auto" : "auto",
        }}
        className={`md:flex flex-col md:flex-row gap-6 md:mr-10 lg:space-x-10 lg:p-2 items-center w-full md:w-auto mx-2.5 ${
          isOpen ? "flex" : "hidden md:flex"
        }`}
      >
        {navItems.map((item) => (
          <motion.div
            key={item.href}
            whileHover={{ scale: 1.05, x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              href={item.href}
              className="text-white text-sm md:text-base hover:text-gray-300 transition-colors"
              aria-label={item.ariaLabel}
              scroll={item.scroll}
            >
              {item.label}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.nav>
  );
}