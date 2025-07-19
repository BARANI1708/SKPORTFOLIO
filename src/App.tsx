import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ThrillerBackground from "@/components/ThrillerBackground";
import { FuturisticBackground } from "@/components/FuturisticBackground";
import { NeonCursorTrail } from "@/components/NeonCursorTrail";
import { motion, AnimatePresence } from "framer-motion";
import CinematicTitleCard from "@/components/CinematicTitleCard";

const queryClient = new QueryClient();

function EntryOverlay({ show, done }: { show: boolean; done: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: done ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-2xl"
        >
          {/* Blurred purple glow */}
          <motion.div
            initial={{ opacity: 0.7, scale: 0.8 }}
            animate={{ opacity: 0.9, scale: 1.1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            className="absolute w-96 h-96 rounded-full bg-purple-700 blur-3xl opacity-70 shadow-2xl"
            style={{ filter: "blur(80px)" }}
          />
          {/* Pulsing logo/title */}
          <motion.h1
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: [1, 1.08, 1], opacity: [1, 0.95, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
            className="relative z-10 text-5xl md:text-7xl font-extrabold text-white drop-shadow-[0_0_40px_rgba(168,85,247,0.8)] animate-pulse"
            style={{ textShadow: "0 0 40px #a855f7, 0 0 80px #a855f7" }}
          >
            Barani Kumar
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AnimatedMainContent({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={show ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
      transition={{ delay: 5, duration: 1.2, type: "spring", stiffness: 80, damping: 18 }}
      className="relative"
    >
      {/* Shimmer effect for main content */}
      <div className="[&_.shimmer]:animate-shimmer [&_.glow-border]:shadow-[0_0_16px_4px_rgba(168,85,247,0.7)]" />
      {children}
    </motion.div>
  );
}

const App = () => {
  const [showOverlay, setShowOverlay] = useState(true);
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <FuturisticBackground />
        <NeonCursorTrail />
        {showOverlay && (
          <CinematicTitleCard onFinish={() => setShowOverlay(false)} />
        )}
        <AnimatedMainContent show={!showOverlay}>
          <BrowserRouter basename="/SKPORTFOLIO">
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AnimatedMainContent>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

/* Tailwind shimmer animation */
// Add this to your global CSS if not present:
// @keyframes shimmer {
//   0% { background-position: -400px 0; }
//   100% { background-position: 400px 0; }
// }
// .animate-shimmer {
//   background: linear-gradient(90deg, rgba(168,85,247,0.1) 25%, rgba(168,85,247,0.3) 50%, rgba(168,85,247,0.1) 75%);
//   background-size: 800px 100%;
//   animation: shimmer 2s infinite linear;
// }
