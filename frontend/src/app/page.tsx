"use client";
import React, { useEffect, useState } from "react";
import { WavyBackground } from "./components/ui/wavy-background/wavy-background";
import { FlipWords } from "./components/ui/flip-words/flip-words";
import { motion } from "framer-motion";
import { LampContainer } from "./components/ui/lamp/lamp";
import { InfiniteMovingCardsDemo } from "./components/ui/moving-cards/moving-cards-demo";

export default function Home() {
  const words = ["Learn", "Teach", "Excel"];
  const [containerHeight, setContainerHeight] = useState("h-[80vh]");

  useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth < 768) {
        // Mobile screens
        setContainerHeight("h-[80vh]");
      } else if (window.innerWidth >= 1024) {
        // Desktop screens
        setContainerHeight("h-[82vh]");
      } else {
        // Default for tablets or medium screens
        setContainerHeight("h-[80vh]");
      }
    };

    // Set initial height
    updateHeight();

    // Update height on window resize
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const yFinalPosition = containerHeight === "h-[80vh]" ? 30 : 30;
  const yInitialPosition = containerHeight === "h-[80vh]" ? 200 : 200;

  return (
    <div className="mt-[160px] sm:mt-[120px] md:mt-[140px] lg:mt-[110px]">
      <WavyBackground
  className={`flex flex-col items-center justify-center ${containerHeight}`}
  containerClassName={`${containerHeight} pb-40`}
>
        <p className="text-4xl  md:text-4xl lg:text-5xl text-white font-bold inter-var text-center">
          IEEE Photonics and ComSoc Joint Chapter
        </p>
        <div className="text-2xl md:text-4xl mt-4 text-white dark:text-white font-bold font-normal inter-var text-center">
          Where we{" "}
          <FlipWords
            className="text-white dark:text-white font-bold"
            words={words}
          />
        </div>
      </WavyBackground>
      {/* <div className="relative mb-2">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-blue-500 to-orange-500 h-1"></div>
      </div> */}

           <LampContainer>
           <motion.h1
 initial={{ opacity: 0.5, y: yInitialPosition }}
  whileInView={{ opacity: 1, y: yFinalPosition }}
  transition={{
    delay: 0.3,
    duration: 0.8,
    ease: "easeInOut",
  }}
  className="mt-4 sm:mt-8 bg-gradient-to-br from-slate-200 to-slate-400 py-4 bg-clip-text text-center text-3xl font-medium tracking-tight text-transparent md:text-6xl z-40"
>
  What does <br /> our team do ?
</motion.h1>
    </LampContainer>
    <div className="relative -top-[220px]">
  <InfiniteMovingCardsDemo />
</div>
    </div> 
  );
}
