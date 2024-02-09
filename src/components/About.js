import React, { useState, useEffect} from "react";
import "./About.css"
import image from "../public/Vector.svg"
import Portrait from "./portrait";

const AboutMe = () => {
    const [text, setText] = useState("");
    const fullText = "I'm a driven computer scientist with a knack for building AI-powered solutions. I love turning complex challenges into user-friendly applications. From medical image analysis to fitness tracking, I'm always up for pushing the boundaries of technology."
    
    useEffect(() => {
        const typingTimer = setTimeout(() => {
          let currentIndex = 0;
          const interval = setInterval(() => {
            if (currentIndex <= fullText.length) {
              setText(fullText.slice(0, currentIndex));
              currentIndex++;
            } else {
              clearInterval(interval);
            }
          }, 40); // typing speed 
          return () => clearInterval(interval);
        }, 1000); // delay before typing starts
        return () => clearTimeout(typingTimer);
      }, []);


    return (
        <div id="home" className=" fade-in about_me" style={{backgroundImage: `url(${image})` }}>
            <div className="left_col">
                <div className="name_div">
                    <span id='hey'>Hey! I Am </span><br/>
                <span id="name">Balkirat Singh.</span>
                </div>
                <div className="status">
                    <span>New<br/>Graduate</span>
                </div>
                
            </div>

            <div className="picture_col">
                <Portrait />
                    
            </div>

            <div className="right_col">
                <div className="summary">
                    <p>{text}</p>
                </div>
                
                <div className="job">
                    <span id="software">Software</span><br /> 
                    <span id="developer">Developer</span>
                </div>
                
            </div>
        </div>
    )
}

export default AboutMe;