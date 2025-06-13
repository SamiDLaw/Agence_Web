import { motion } from "framer-motion";
import { useRef } from "react";

interface SectionTransitionProps {
  backgroundColor?: string;
  darkBackgroundColor?: string;
  children: React.ReactNode;
}

export const SectionTransition = ({ 
  backgroundColor = "bg-white", 
  darkBackgroundColor = "dark:bg-black",
  children 
}: SectionTransitionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  return (
    <motion.section
      ref={sectionRef}
      className={`py-20 ${backgroundColor} ${darkBackgroundColor} overflow-hidden`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ y: 100 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
};
