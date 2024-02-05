import React from "react";
import "./About.css"
import image from "../public/Vector.svg"
import Portrait from "./portrait";

const AboutMe = () => {
    return (
        <div className="about_me" style={{backgroundImage: `url(${image})` }}>
            <div className="left_col">
                <div className="name_div">
                    <span id='hey'>Hy! I Am </span><br/>
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
                    <p>I'm a driven computer scientist with a knack for building AI-powered solutions. I love turning complex challenges into user-friendly applications. From medical image analysis to fitness tracking, I'm always up for pushing the boundaries of technology.</p>
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