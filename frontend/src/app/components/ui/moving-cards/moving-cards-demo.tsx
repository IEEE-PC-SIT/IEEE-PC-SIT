"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="rounded-md flex flex-col antialiased bg-[rgb(4,1,29)] bg-grid-[rgb(4,1,29)]/[0.05] items-center justify-center relative overflow-hidden z-20">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    title: "A Vision Realized",
    content:
      "IEEE Photonics and ComSoc Joint Chapter was founded in 2019 by visionary students Karthik BM, Aditya PM, Bharat GC, and Sushil CM. Under the guidance of esteemed faculty Dr. KC Narasimha Murthy sir and Dr. TN Chandrika ma'am, our mission has always been to empower students in both technical and personal growth.",
    name: " Our Founding Story",
    
  },
  {
    title: "Learn and Innovate",
    content:
      "Our technical workshops dive into cutting-edge fields such as: UI/UX Design,Machine Learning, Python Programming, Web Development. Gain hands-on experience to turn your ideas into reality with tools and skills that set you apart.",
    name: "Technical Excellence",
    
  },
  {
    title: "Beyond Technology",
    content: "We're not just about coding and circuits! At IEEE Photonics and ComSoc, we help members cultivate leadership, communication, and management skills to become well-rounded professionals prepared for real-world challenges.",
    name: "Soft Skills for Success",
   
  },
  {
    title: "Connect with the Industry",
    content:
      "Explore your future with our career fairs featuring industry experts and diverse career paths. These events are tailored to bridge the gap between academics and the professional world, giving you a head start in your career journey.",
    name: "Career and Networking Opportunities",
    
  },
  {
    title: "Shaping the Future",
    content:
      "We’re committed to creating a platform where students can thrive, innovate, and lead. Join us in our journey to redefine excellence and contribute to a brighter tomorrow.",
    name: "Our Vision",
    
  },
];
