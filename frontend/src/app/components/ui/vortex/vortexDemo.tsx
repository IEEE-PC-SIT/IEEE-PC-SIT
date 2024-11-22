import React from "react";
import { Vortex } from "@/app/components/ui/vortex/vortex";

export function VortexDemo() {
  return (
    <div className="w-[calc(100%)] mx-auto rounded-md  h-screen overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={50}
        baseHue={180}
        baseRadius={2}
        rangeRadius={1}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
      >
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
            IEEE Photonics and ComSoc
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
          
        </p>
      </Vortex>
    </div>
  );
}
