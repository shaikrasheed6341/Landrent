"use client";
import { AiFillThunderbolt } from "react-icons/ai";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Landingpage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className="relative w-full h-[90vh] overflow-hidden"
    >
      
      <Image
        src="https://zxetkysuahfjolouwpgh.supabase.co/storage/v1/object/public/homerent/landingtwo.png"
        alt="Landing page hero image"
        fill
        priority
        className="object-cover brightness-75"
        quality={100}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />

      
      <div className="absolute inset-0 flex flex-col mt-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight">
            <div className="flex items-center justify-center gap-4">
              <AiFillThunderbolt className="text-4xl sm:text-5xl md:text-6xl text-zinc-900 animate-pulse" />
              The <span className="text-blue-800 font-black">#1</span> Real Estate Site
            </div>
            <p className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-100 font-semibold">
              Professionals Trust
              <AiFillThunderbolt className="inline-block ml-3 text-3xl sm:text-4xl md:text-5xl text-zinc-900 animate-pulse" />
            </p>
          </h1>

          
          
        </div>
      </div>
    </motion.div>
  );
}