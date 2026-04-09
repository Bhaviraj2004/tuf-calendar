"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MonthImage as MonthImageType } from "@/types";

interface MonthImageProps {
  image: MonthImageType;
}

export default function MonthImage({ image }: MonthImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-48 md:h-full md:min-h-[320px] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
      {/* Skeleton */}
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800" />
      )}

      <AnimatePresence mode="wait">
        <motion.img
          key={image.url}
          src={image.url}
          alt={image.alt}
          onLoad={() => setLoaded(true)}
          loading="lazy"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: loaded ? 1 : 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      <div className="absolute bottom-3 left-3">
        <p className="text-white text-xs font-medium tracking-widest uppercase opacity-80">
          {image.alt}
        </p>
      </div>
    </div>
  );
}