import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Scissors } from "lucide-react";

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  const letterVariants = {
    hidden: { y: 50, opacity: 0, rotateX: -90 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        delay: 0.5 + i * 0.08,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  const brandName = "Lavish Locs";

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-charcoal overflow-hidden"
        >
          {/* Animated Background Gradient */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal to-charcoal/90" />
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full"
              style={{
                background: "radial-gradient(circle, hsl(var(--gold) / 0.15) 0%, transparent 70%)",
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Scissors Icon Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: 0.2,
                duration: 0.8, 
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  delay: 1,
                  duration: 0.6,
                  ease: "easeInOut",
                }}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
                  <Scissors className="w-10 h-10 text-charcoal" />
                </div>
              </motion.div>
              
              {/* Glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-gold/50"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{
                  delay: 0.8,
                  duration: 1.2,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  ease: "easeOut",
                }}
              />
            </motion.div>

            {/* Brand Name with Letter Animation */}
            <div className="overflow-hidden" style={{ perspective: "1000px" }}>
              <motion.h1 className="font-display text-5xl md:text-7xl font-semibold text-cream flex">
                {brandName.split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className={letter === " " ? "w-4" : ""}
                    style={{ display: "inline-block" }}
                  >
                    {letter === " " ? "\u00A0" : (
                      <span className={i >= 7 ? "text-gold" : ""}>
                        {letter}
                      </span>
                    )}
                  </motion.span>
                ))}
              </motion.h1>
            </div>

            {/* Decorative Line */}
            <motion.div
              className="h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 200, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8, ease: "easeOut" }}
            />

            {/* Tagline */}
            <motion.p
              className="text-cream/60 text-sm md:text-base tracking-[0.3em] uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              Luxury Hair Studio
            </motion.p>

            {/* Progress Bar */}
            <motion.div
              className="w-48 h-1 bg-cream/10 rounded-full overflow-hidden mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              <motion.div
                className="h-full bg-gradient-gold rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>

          {/* Corner Decorations */}
          <motion.div
            className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-gold/30"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />
          <motion.div
            className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-gold/30"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          />
          <motion.div
            className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-gold/30"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-gold/30"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          />

          {/* Floating Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-gold/40"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 20,
                opacity: 0,
              }}
              animate={{ 
                y: -20,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "linear",
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
