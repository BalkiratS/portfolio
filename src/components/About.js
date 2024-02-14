import React, { useState, useEffect } from "react";
import "./About.css";
import image from "../public/Vector.svg";
import Portrait from "./portrait";

const AboutMe = () => {
  // State for the typing animation
  const [text, setText] = useState("");

  // Full text to be typed dynamically
  const fullText =
    "I'm a driven computer scientist with a knack for building AI-powered solutions. I love turning complex challenges into user-friendly applications. From medical image analysis to fitness tracking, I'm always up for pushing the boundaries of technology.";

  // useEffect hook for the typing animation
  useEffect(() => {
    // Delay before typing starts
    const typingTimer = setTimeout(() => {
      let currentIndex = 0;

      // Set up an interval to type character by character
      const interval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 40); // Adjust the value for desired typing speed

      // Clear the interval and timeout on cleanup
      return () => {
        clearInterval(interval);
        clearTimeout(typingTimer);
      };
    }, 1000); // Adjust the value for desired delay

    // Cleanup function for the useEffect hook
    return () => clearTimeout(typingTimer);
  }, []);

  return (
    <div
      id="home"
      className="fade-in about_me"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Left column section */}
      <div className="left_col">
        <div className="name_div">
          <span id="hey">Hey! I Am </span>
          <br />
          <span id="name">Balkirat Singh.</span>
        </div>
        <div className="status">
          <span>New Graduate</span>
        </div>
      </div>

      {/* Picture column section */}
      <div className="picture_col">
        <Portrait />
      </div>

      {/* Right column section */}
      <div className="right_col">
        {/* Animated summary paragraph */}
        <div className="summary">
          <p>{text}</p>
        </div>

        {/* Job title section */}
        <div className="job">
          <span id="software">Software</span>
          <br />
          <span id="developer">Developer</span>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
