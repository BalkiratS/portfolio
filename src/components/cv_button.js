import React from "react";
import "./cv_button.css";

const Cv_button = () => {

    const downloadCV = () => {
        console.log('Download the cv')
        
    }

    return (
        <button className="cv_button" onClick={downloadCV}>Download CV</button>
    )
}

export default Cv_button;