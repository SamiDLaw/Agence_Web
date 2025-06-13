import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  height?: number;
  className?: string;
}

export const ParallaxImage = ({ 
  src, 
  alt, 
  height = 500,
  className = "" 
}: ParallaxImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  
  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden rounded-lg ${className}`}
      style={{ height: `${height}px` }}
    >
      {src ? (
        <motion.div
          className="absolute inset-0"
          style={{ y, scale }}
        >
          <Image 
            src={src} 
            alt={alt} 
            fill 
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      ) : (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
          <p className="text-lg font-medium">{alt}</p>
        </div>
      )}
    </div>
  );
};
