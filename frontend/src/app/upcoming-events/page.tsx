"use client";
import { TypewriterEffectSmooth } from "../components/ui/typeWriterEffect/typeWriterEffect";
import { SparklesCore } from "../components/ui/sparkles/Sparkles";
import React, { useEffect, useState } from "react";
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

import BASE_URL from '../services/BaseAddress';

interface EventData {
  name: string;
  photo: string;
  description: string;
  date: string;
  registerLink: string;
}

export default function UpComing() {
  const words = [
    {
      text: "Coming",
      className:
        "text-orange-500 dark:text-orange-500 text-4xl sm:text-4xl md:text-5xl lg:text-5xl",
    },
    {
      text: "Soon ... !",
      className:
        "text-blue-500 dark:text-blue-500 text-4xl sm:text-4xl md:text-5xl lg:text-5xl",
    },
  ];

  const [eventData, setEventData] = useState<EventData | null>(null);

  // useEffect(() => {
  //   // Simulating an API call with dummy data
  //   const dummyData: EventData = {
  //     name: "ReactJS Workshop 2024",
  //     photo: "WhatsApp Image 2024-11-17 at 11.31.09 PM.jpeg",
  //     // photo: "WhatsApp Image 2024-11-17 at 11.31.10 PM.jpeg",
  //     description: "some content based on reactjswill be given u will enjoy ,paly and learn but only thing is you have to pay fee foreach and every one.(Exclusively for First years)",
  //     date: "January 15, 2024",
  //     registerLink: "https://images.google.com/",
  //   };
  //   // Setting the dummy data to state after "fetching"
  //   setEventData(dummyData);
  // }, []);

  useEffect(() => {
    const fetchUpcomingEvent = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/newevent/list-new-events`);
        if (!response.ok) {
          throw new Error("Failed to fetch event details!");
        }
        const events = await response.json();
        if (events.length > 0) {
          const upcomingEvent = events[0]; // Assuming the first event is the next upcoming event
          setEventData({
            name: upcomingEvent.name,
            photo: upcomingEvent.photo,
            description: upcomingEvent.description,
            date: new Date(upcomingEvent.date).toLocaleDateString(), // Format the date as needed
            registerLink: upcomingEvent.registerLink,
          });
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
  
    fetchUpcomingEvent();
  }, []);
  

  return (
    <div className="mt-[160px] sm:mt-[120px] md:mt-[140px] lg:mt-[110px]">
      {!eventData ? (
        <div
          className="w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md "
          style={{ height: "calc(100vh - 20rem)" }}
        >
          <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center relative z-20">
            <TypewriterEffectSmooth words={words} />
          </h1>
          <div className="w-[40rem] h-40 relative">
            {/* Gradients */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
            {/* Core component */}
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />
            <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          </div>
        </div>
      ) : (
        <div
         className="w-full relative overflow-hidden max-w-4xl mx-auto flex flex-wrap lg:flex-nowrap items-stretch gap-0 p-3 rounded-3xl m-10 "
          style={{
            background: "rgb(69,170,247)",
            backgroundImage:
              "linear-gradient(135deg, rgba(69,170,247,1) 21%, rgba(44,38,38,1) 51%, rgba(47,54,51,1) 100%)",
          }}
        >
          {/* First Div */}
          <div className="w-full lg:w-1/2  p-4 rounded-3xl">
            <img
              src={eventData.photo}
              alt="Event"
              className="w-full h-auto object-cover rounded-lg mb-2"
            />
          </div>

          {/* Second Div*/}
          <div className="w-full lg:w-1/2 p-8 ">
            <h2 className="text-2xl lg:text-4xl md:text-3xl font-semibold text-left text-white mb-4">
              {eventData.name}
            </h2>
            <p className="text-left text-gray-200 mb-6">
              About event: {eventData.description}
              <br />
              <span className="block text-left mt-2 font-medium text-gray-400">
                Date: {eventData.date}
              </span>
            </p>
            <div className="flex justify-end">
              <a
                href={eventData.registerLink}
                className="py-2 px-4 bg-orange-500 text-white font-bold text-lg rounded-lg text-center hover:bg-orange-600 transition duration-300"
              >
                Register Now
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
