import React from "react";
import Cv_button from "./cv_button";
import "./Header.css";

const Header = () => {
    return (
        <div className="header">
            <div className="logo">
                <p id="B">B</p>
                <p id="Padda">Padda.</p>
            </div>
            <nav className="nav">
                <ul>
                    <li><a href="#" >Home</a></li>
                    <li><a href="#">Skills</a></li>
                    <li><a href="#">Projects</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
            <Cv_button />
        </div>
    )
}

export default Header;