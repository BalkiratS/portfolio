import React from "react";
import "./cv_button.css";
import axios from "axios";

const Cv_button = () => {

    const downloadCV = async () => {
        console.log('Download the cv')

        try {
            const response = await axios.get("http://localhost:9000/resume", {
                responseType: 'blob'
            });

            // Create a Blob from the response data
            const blob = new Blob([response.data], { type: response.headers['content-type'] });

            // Create a temporary anchor element
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute('download', 'Balkirat_Resume.pdf');

            // Append the anchor to the body and trigger a click event to start the download
            document.body.appendChild(link);
            link.click();

            // Clean up by removing the anchor
            document.body.removeChild(link);
            
        } catch (error) {
            console.error("Error Downloading the CV: ", error)
        }
        
    }

    return (
        <button className="cv_button" onClick={downloadCV}>Download CV</button>
    )
}

export default Cv_button;