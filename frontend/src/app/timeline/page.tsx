"use client"
import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

import BASE_URL from '../services/BaseAddress';

// Define TypeScript types for event data
interface Event {
  _id: string;
  name: string;
  date: string;
  description: string;
  photos: { url: string; public_id: string }[];
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null); // State to store error message

      // Fetch Events
      const fetchEvents = async () => {
        try {
          const response = await fetch(`${BASE_URL}/api/events/list-events`, {
            method: 'GET',
          });
          if (!response.ok) {
            throw new Error('Failed to fetch events');
          }
          const data = await response.json();
          setEvents(data);
          setError(null);
        } catch (error) {
          setError("Error fetching events. Please try again later."); 
        }
      };   
  
    useEffect(() => {
      fetchEvents();
    }, []);

  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-rgb(4, 1, 29) font-sans md:px-10 mt-[160px] sm:mt-[120px] md:mt-[140px] lg:mt-[110px] "
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto  flex flex-col items-center justify-center">
  <h2 className="text-3xl text-center md:text-4xl text-white max-w-4xl">
    Events Timeline
  </h2>
</div>

      {/* Show error message if there is an error */}
      {error && (
        <div className="text-red-500 text-center py-4">
          <p>{error}</p>
        </div>
      )}

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {events.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-20 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-800 border border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 ">
                {item.name}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500">
                {item.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
  {item.photos.map((photo, photoIndex) => (
    <img
      key={photoIndex}
      src={photo.url || "/placeholder.jpg"}
      alt={`Event ${item.name} - Photo ${photoIndex + 1}`}
      className="w-full h-48 object-cover rounded-md shadow-md"
    />
  ))}
</div>

              <p className="text-sm mt-2 text-gray-200">
                {new Date(item.date).toDateString()}
              </p>
              <p className="mt-2 text-gray-400">{item.description}</p>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Events;
