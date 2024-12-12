"use client";

import { useState, useEffect } from "react";
import React from "react";
import { Label } from "./Label";
import { Input } from "./Input";
import { cn } from "@/app/lib/utils";

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

import BASE_URL from '../services/BaseAddress';
// const BASE_URL ='http://localhost:5000'
interface MemberDetails {
  name: string;
  usn: string;
  year: number;
  linkedin?: string;
  github?: string;
  post?: string;
  photo?: string; // Assuming the API returns the photo URL
}

export default function LoginPage() {
  const [usn, setUsn] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [memberDetails, setMemberDetails] = useState<MemberDetails | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const storedId = localStorage.getItem("_id");
    if (storedId) {
      fetchMemberDetails(storedId);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/members/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usn, password }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Login failed!");
      }

      const { memberId } = await response.json();
      localStorage.setItem("_id", memberId);
      setMessage("Login successful!");
      fetchMemberDetails(memberId);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed!");
    }
  };

  const fetchMemberDetails = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/members/mydetails/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch member details!");
      }
      const data: MemberDetails = await response.json();
      setMemberDetails(data);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Error fetching details");
    }
  };

  const handleUpdate = async () => {
    const id = localStorage.getItem("_id");
    if (!id) {
      setMessage("You need to log in first!");
      return;
    }

    const formData = new FormData();
    if (memberDetails) {
      formData.append("name", memberDetails.name);
      formData.append("usn", memberDetails.usn);
      formData.append("year", String(memberDetails.year));
      if (memberDetails.linkedin) formData.append("linkedin", memberDetails.linkedin);
      if (memberDetails.github) formData.append("github", memberDetails.github);
      if (memberDetails.post) formData.append("post", memberDetails.post);
    }
    if (photo) formData.append("photo", photo);

    try {
      const response = await fetch(`${BASE_URL}/api/members/update-member/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update profile!");
      }

      alert("Profile updated successfully!");
      window.location.reload();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Error updating profile");
    }
  };

  const handleFeedback = async () => {
    const id = localStorage.getItem("_id");
    if (!id) {
      setMessage("You need to log in first!");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/feedback/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback, submittedBy: id }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback!");
      }

      alert("Feedback submitted successfully!");
      setFeedback("");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Error submitting feedback");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("_id");
    setMemberDetails(null);
    setUsn("");
    setPassword("");
    setMessage("Logged out successfully!");
  };

  return (
    <div className="mt-[160px] sm:mt-[120px] md:mt-[140px] lg:mt-[110px]">
      {!memberDetails ? (
        <div className="max-w-md w-full mt-24 mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-rgb(4, 1, 29)">
        <h2 className="font-bold text-center text-3xl text-neutral-200">
          Login
        </h2>
  
        <div className="my-8" >
          
          <LabelInputContainer className="mb-4">
            <Label htmlFor="text">USN </Label>
            <Input id="usn" placeholder="1si*******" type="text" value={usn} onChange={(e) => setUsn(e.target.value)}/>
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="••••••••" type="password"  value={password} onChange={(e) => setPassword(e.target.value)} />
          </LabelInputContainer>
  
          <button
            className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900  block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            onClick={handleLogin}
          >
            Login &rarr;
            <BottomGradient />
          </button>
        </div>
      </div>
        
      ) : (
        <div className="p-6 bg-rgb(4, 1, 29) rounded-none md:rounded-2xl shadow-input max-w-4xl mx-auto mt-12">
  <div>
    <h2 className="font-bold text-center text-3xl text-neutral-200 mb-6">
      Welcome, {memberDetails.name}
    </h2>

    {memberDetails.photo && (
      <img
        src={memberDetails.photo}
        alt="Profile"
        className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-gray-700"
      />
    )}

    <div className="flex justify-center mb-5">
      <button
        onClick={handleLogout}
        className="w-auto bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-4 rounded-lg"
      >
        Logout
      </button>
    </div>
  </div>

  {/* Flexbox layout for larger screens */}
  <div className="flex flex-col md:flex-row gap-8 justify-between">
    {/* Profile Update Section */}
    <div className="w-full md:w-1/2">
      <h3 className="text-xl font-semibold text-gray-200 mb-4">Update Profile</h3>
      <div className="space-y-4">
        <LabelInputContainer className="mb-4">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Your Name"
            type="text"
            value={memberDetails.name}
            onChange={(e) =>
              setMemberDetails({ ...memberDetails, name: e.target.value })
            }
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            placeholder="Year"
            type="number"
            value={memberDetails.year}
            onChange={(e) =>
              setMemberDetails({ ...memberDetails, year: Number(e.target.value) })
            }
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            placeholder="LinkedIn URL"
            type="text"
            value={memberDetails.linkedin || ""}
            onChange={(e) =>
              setMemberDetails({ ...memberDetails, linkedin: e.target.value })
            }
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="github">GitHub</Label>
          <Input
            id="github"
            placeholder="GitHub URL"
            type="text"
            value={memberDetails.github || ""}
            onChange={(e) =>
              setMemberDetails({ ...memberDetails, github: e.target.value })
            }
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="photo">Profile Photo</Label>
          <Input
            id="photo"
            type="file"
            onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
          />
        </LabelInputContainer>
      </div>

      <button
        onClick={handleUpdate}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg mt-4"
      >
        Update Profile
      </button>
    </div>

    {/* Feedback Section */}
    <div className="w-full md:w-1/2">
      <h3 className="text-xl font-semibold text-gray-200 mb-4">Submit Feedback</h3>
      <LabelInputContainer className="mb-4">
        <textarea
          placeholder="Feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={6}
        />
      </LabelInputContainer>

      <button
        onClick={handleFeedback}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg mt-4"
      >
        Submit Feedback
      </button>
    </div>
  </div>
</div>

      
      )}
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};