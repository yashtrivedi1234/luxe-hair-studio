import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    filter: "blur(4px)",
  },
  enter: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    filter: "blur(4px)",
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const overlayVariants: Variants = {
  initial: {
    scaleY: 1,
  },
  enter: {
    scaleY: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    scaleY: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <>
      {/* Page overlay for dramatic effect */}
      <motion.div
        initial="initial"
        animate="enter"
        exit="exit"
        variants={overlayVariants}
        className="fixed inset-0 z-[100] bg-primary origin-top pointer-events-none"
      />
      
      <motion.div
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;
