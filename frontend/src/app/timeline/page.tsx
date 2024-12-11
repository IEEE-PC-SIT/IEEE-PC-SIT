"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import BASE_URL from "../services/BaseAddress";

interface Event {
  _id: string;
  name: string;
  date: string;
  description: string;
  photos: { url: string; public_id: string }[];
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/events/list-events`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch events");
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

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      className="w-full bg-rgb(4, 1, 29) font-sans md:px-10 mt-[160px] sm:mt-[120px] md:mt-[140px] lg:mt-[110px]"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
        <h2 className="text-3xl text-center md:text-4xl text-white max-w-4xl">
          Events Timeline
        </h2>
      </div>

      {error && (
        <div className="text-red-500 text-center py-4">
          <p>{error}</p>
        </div>
      )}

      <div className="relative max-w-7xl mx-auto pb-20">
        {events.map((item, index) => (
          <motion.div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2, // Stagger effect for each event
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="sticky flex flex-col md:flex-row z-20 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-800 border border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500">
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
          </motion.div>
        ))}

        {/* Timeline Line */}
        <div
          className="absolute md:left-8 left-8 top-0 w-[2px] bg-neutral-700"
          style={{
            height: "100%",
          }}
        >
          <motion.div
            style={{
              height: heightTransform,
            }}
            className="absolute inset-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Events;
