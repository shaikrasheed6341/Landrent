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
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-[#eeeeea] p-4 container flex flex-col md:flex-row justify-between items-center px-6 relative shadow-2xl backdrop-blur-sm bg-opacity-90"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="text-ivory-100 text-sm mb-4 md:mb-0 flex items-center justify-between w-full md:w-auto">
        <motion.span className="cursor-pointer rounded-full">
          <Image
            src="https://zxetkysuahfjolouwpgh.supabase.co/storage/v1/object/public/homerent//Black%20White%20Simple%20Circle%20Leaf%20Frame%20Logo.png"
            alt="Logo"
            width={50}
            height={70}
            className="object-contain rounded-full border-3 border-gold-400 shadow-md"
            priority
          />
        </motion.span>
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.1 }}
          className="md:hidden text-black-900 font-semibold text-lg"
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
          opacity: isOpen ? 1 : 1,
          height: isOpen ? "auto" : "auto",
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
        className={`md:flex flex-col md:flex-row gap-6 md:mr-12 lg:space-x-12 lg:p-3 items-center w-full md:w-auto mx-3 font-sans text-lg ${
          isOpen ? "flex" : "hidden md:flex"
        }`}
      >
        {navItems.map((item) => (
          <motion.div
            key={item.href}
            whileHover={{ scale: 1.1, y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link
              href={item.href}
              className="text-ivory-100 text-semibold hover:text-black-900  transition-colors duration-300 relative group"
              aria-label={item.ariaLabel}
              scroll={item.scroll}
            >
              {item.label}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black-900 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.nav>
  );
}