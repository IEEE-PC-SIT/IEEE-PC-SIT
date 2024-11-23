import React, { useState, useEffect } from "react";
import "./Feedback.css";

const BASE_URL = "http://localhost:5000"; // Replace with your server URL

const Feedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  // Fetch feedback messages
  const fetchFeedback = async () => {
    const token = localStorage.getItem("auth-token");
    try {
      const response = await fetch(`${BASE_URL}/api/feedback/all`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch feedback");
      }
      const data = await response.json();
      setFeedbackList(data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setFeedbackList([]);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <div className="chat-container">
      <h2>Feedback Messages</h2>
      <div className="chat-messages">
        {feedbackList.length > 0 ? (
          feedbackList.map((item, index) => (
            <div className="chat-message" key={index}>
              <p className="message-text">{item.feedback}</p>
              <p className="message-time">
                {new Date(item.createdAt).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
          ))
        ) : (
          <p className="no-feedback">No feedback messages yet.</p>
        )}
      </div>
    </div>
  );
};

export default Feedback;
