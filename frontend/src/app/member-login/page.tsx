"use client";

import { useState, useEffect } from "react";

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

import BASE_URL from '../services/BaseAddress';

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

      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Error updating profile");
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

      setMessage("Feedback submitted successfully!");
      setFeedback("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Error submitting feedback");
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
    <div className="mt-[110px]">
      {message && <p>{message}</p>}

      {!memberDetails ? (
        <div>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="USN"
            value={usn}
            onChange={(e) => setUsn(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <h2>Welcome, {memberDetails.name}</h2>
          {memberDetails.photo && (
            <img
              src={memberDetails.photo}
              alt="Profile"
              className="w-32 h-32 rounded-full"
            />
          )}
          <button onClick={handleLogout}>Logout</button>

          <div>
            <h3>Update Profile</h3>
            <input
              type="text"
              placeholder="Name"
              value={memberDetails.name}
              onChange={(e) =>
                setMemberDetails({ ...memberDetails, name: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Year"
              value={memberDetails.year}
              onChange={(e) =>
                setMemberDetails({ ...memberDetails, year: Number(e.target.value) })
              }
            />
            <input
              type="text"
              placeholder="LinkedIn"
              value={memberDetails.linkedin || ""}
              onChange={(e) =>
                setMemberDetails({ ...memberDetails, linkedin: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="GitHub"
              value={memberDetails.github || ""}
              onChange={(e) =>
                setMemberDetails({ ...memberDetails, github: e.target.value })
              }
            />
            <input
              type="file"
              onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
            />
            <button onClick={handleUpdate}>Update Profile</button>
          </div>

          <div>
            <h3>Submit Feedback</h3>
            <textarea
              placeholder="Feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <button onClick={handleFeedback}>Submit Feedback</button>
          </div>
        </div>
      )}
    </div>
  );
}
