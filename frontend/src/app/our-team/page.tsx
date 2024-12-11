"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import MembersGrid from './MemberCard';

export default function OurTeam() {
  const facultyRef = useRef(null);
  const foundersRef = useRef(null);
  const facultyInView = useInView(facultyRef, { once: true });
  const foundersInView = useInView(foundersRef, { once: true });

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="mt-[160px] sm:mt-[120px] md:mt-[140px] lg:mt-[120px]">
      {/* Faculty Coordinator Section */}
      <motion.div 
        ref={facultyRef}
        initial="hidden"
        animate={facultyInView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="flex flex-col items-center gap-6 max-w-6xl mx-auto px-4"
      >
        <motion.h1 
          variants={cardVariants}
          className="text-3xl font-bold text-white text-center"
        >
          Faculty Coordinator
        </motion.h1>
        
        <motion.div 
          variants={cardVariants}
          className="flex flex-wrap justify-center gap-6"
        >
          <motion.div 
            variants={cardVariants}
            className="w-64 p-4 flex flex-col items-center bg-white rounded-lg shadow-lg border-2 border-transparent bg-gradient-to-br from-blue-100 to-white transition-transform hover:scale-105"
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={facultyInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              src="./MamPhoto.jpeg"
              alt="Faculty Coordinator"
              className="w-40 h-40 rounded-full object-cover mb-4 border-4 border-blue-500"
            />
            <h3 className="text-lg font-semibold text-gray-800 text-center">
              T.N Chandrika
            </h3>
            <p className="text-sm text-gray-700 text-center">
              Faculty Coordinator
            </p>
          </motion.div>
        </motion.div>
        
        <hr className="w-full h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 border-0 rounded-full opacity-100 transform scale-x-100 origin-left mb-5" />
      </motion.div>

      {/* Founders Section */}
      <motion.div 
        ref={foundersRef}
        initial="hidden"
        animate={foundersInView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="flex flex-col items-center gap-6 max-w-6xl mx-auto px-4 mt-5"
      >
        <motion.h1 
          variants={cardVariants}
          className="text-3xl font-bold text-white text-center"
        >
          Team Founders
        </motion.h1>
        
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={foundersInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          src="./founders.jpeg"
          alt="Team Founders"
          className="w-100 h-60 object-cover mb-4 border-4 border-blue-500 rounded-t-lg"
        />
      </motion.div>

      <MembersGrid/>
    </div>
  );
}