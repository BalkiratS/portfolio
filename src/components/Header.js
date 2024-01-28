import React from "react";
import Cv_button from "./cv_button";
import "./Header.css";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const admin_click = () => {
        navigate('/login');
    }
    
    return (
        <div className="header">
            <div className="logo">
                <p id="B">B</p>
                <p id="Padda">Padda.</p>
            </div>
            <div className="nav-div">
                <nav className="nav">
                    <ul>
                        <li><a href="#" >Home</a></li>
                        <li><a href="#">Skills</a></li>
                        <li><a href="#">Projects</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </nav>
                <svg className='admin' onClick={admin_click} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M19.7274 20.4471C19.2716 19.1713 18.2672 18.0439 16.8701 17.2399C15.4729 16.4358 13.7611 16 12 16C10.2389 16 8.52706 16.4358 7.12991 17.2399C5.73276 18.0439 4.72839 19.1713 4.27259 20.4471" stroke="#33363F" strokeWidth="2" strokeLinecap="round"/>
                        <circle cx="12" cy="8" r="4" stroke="#33363F" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
            </div>
            <div className="cv_button">
                <Cv_button />
            </div>
        </div>
    )
}

export default Header;