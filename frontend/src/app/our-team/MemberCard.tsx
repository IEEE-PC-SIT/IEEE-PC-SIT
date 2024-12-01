"use client";
import React, { useState, useEffect } from "react";

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

import BASE_URL from '../services/BaseAddress';

import { LinkedinIcon } from 'lucide-react';

// Define the Member interface for type safety
interface Member {
  _id: string;
  photo?: string;
  name: string;
  year: string;
  post: string;
  linkedin?: string;
}

const MembersGrid: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const year = 4;

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/members/members-by-year/${year}`);
        if (!response.ok) {
          throw new Error("Failed to fetch member details!");
        }
        const data = await response.json();
        setMembers(data); 
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch members");
        setLoading(false);
      }
    };

    fetchMembers();
  }, [year]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-white shadow-md rounded-lg p-6">
                <div className="w-32 h-32 mx-auto bg-gray-300 rounded-full mb-4"></div>
                <div className="h-4 bg-gray-300 mb-2 w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-300 mb-2 w-1/2 mx-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>

      {members.length === 0 ? (
        <div className="text-center text-gray-500">No members found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {members.map((member) => (
            <div
              key={member._id}
              className="bg-white shadow-md rounded-lg p-6 text-center transition-transform hover:scale-105"
            >
              {/* Circular Profile Photo */}
              <img
                src={member.photo || "/api/placeholder/200/200"}
                alt={`${member.name}'s profile`}
                className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-blue-500 mb-4"
              />

              {/* Member Details */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  {member.name}
                </h2>
                <p className="text-gray-600 mb-1">{member.year} Year</p>
                <p className="text-sm text-gray-500 mb-3">{member.post}</p>

                {/* LinkedIn Link */}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <LinkedinIcon className="mr-2" size={20} />
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MembersGrid;
