import React from "react";
import "./portrait.css"

const Portrait = () => {
    return (
        <div className="portrait_container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" width="400" className="image">
                <title>Balkirat Singh</title>
                <defs>
                    <clipPath id="maskImage" clipPathUnits="userSpaceOnUse" >
                    <path d="M100 63A50 50 0 110 70C0 40 20 0 48 0c27 0 52 42 52 70z" />
                    </clipPath>
                    <clipPath id="maskBackground" clipPathUnits="userSpaceOnUse">
                    <path d="M190 101a50 50 0 01-50 50 50 50 0 01-50-50 50 50 0 0150-50 50 50 0 0150 50z" />
                    </clipPath>
                </defs>
                
                {/* <!-- Background image --> */}
                <g clipPath="url(#maskImage)" transform="translate(0 -5)">
                    <image clipPath="url(#maskBackground)" width="180" height="180" x="50" y="18" href={require("../public/background.jpeg")} transform="translate(-90 -31)" />
                
                {/* <!-- Foreground image --> */}
                    <image width="100" height="140" x="-3" y="-1" fill="none" className="image__foreground" href={require("../public/Subject.png")} />
                </g>
            </svg>
        </div>
    )
}

export default Portrait;