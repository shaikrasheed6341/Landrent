"use client";
import { useState, useEffect } from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Landingpage() {
  const images = [
    "https://zxetkysuahfjolouwpgh.supabase.co/storage/v1/object/public/homerent/landingtwo.png",
    "https://zxetkysuahfjolouwpgh.supabase.co/storage/v1/object/public/homerent//landing2.png",
    "https://zxetkysuahfjolouwpgh.supabase.co/storage/v1/object/public/homerent//landing3.png",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatic slide transition every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className="relative w-full h-[90vh]  overflow-hidden"
    >
      {/* Image Slider */}
      <AnimatePresence>
        {images.map(
          (src, index) =>
            index === currentSlide && (
              <motion.div
                key={src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={src}
                  alt={`Landing page hero image ${index + 1}`}
                  fill
                  priority={index === 0} // Prioritize first image for faster loading
                  className="object-cover brightness-75"
                  quality={100}
                />
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:mb-55 md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight">
            <div className="flex items-center  justify-center gap-4">
              <AiFillThunderbolt className="text-4xl sm:text-5xl md:text-6xl text-yellow-400 animate-pulse" />
              The <span className="text-zinc-900 font-black">#1</span> Real Estate Site
            </div>
            <p className="mt-4 text-xl  sm:text-2xl md:text-3xl lg:text-4xl font-semibold -tracking-normal  text-gray-100 ">
              Professionals Trust
              <AiFillThunderbolt className="inline-block ml-3 text-3xl sm:text-4xl md:text-5xl text-yellow-400 animate-pulse" />
            </p>
          </h1>


          </div>
        </div>
      
    </motion.div>
  );
}