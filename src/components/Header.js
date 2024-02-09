import React, { useState } from "react";
import CvButton from "./cvButton";
import "./Header.css";
import { useNavigate } from 'react-router-dom';
import { RiMenuFill } from "react-icons/ri";
import SideBar from "./SideBar";


const Header = () => {
    const navigate = useNavigate();

    const admin_click = () => {
        navigate('/admin');
    }

    const [isSideBarOpen, setIsSidebarOpen] = useState(false);

    const closeSideBar = () => {
        setIsSidebarOpen(false)
    }

    
    return (
        <header className="header">
            <div className="logo">
                <p id="B">B</p>
                <p id="Padda">Padda.</p>
            </div>
                <nav className="nav-div">
                    <ul>
                        <li><a href="#home" >Home</a></li>
                        <li><a href="#skills">Skills</a></li>
                        <li><a href="#projects">Projects</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
            <div className="admin-cv">
                <svg className='admin' onClick={admin_click} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M19.7274 20.4471C19.2716 19.1713 18.2672 18.0439 16.8701 17.2399C15.4729 16.4358 13.7611 16 12 16C10.2389 16 8.52706 16.4358 7.12991 17.2399C5.73276 18.0439 4.72839 19.1713 4.27259 20.4471" stroke="whitesmoke" strokeWidth="2" strokeLinecap="round"/>
                        <circle cx="12" cy="8" r="4" stroke="whitesmoke" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
            
            <div className="cv_button_div">
                <CvButton />
            </div>

            <RiMenuFill className="menu" size="2em" color="white" onClick={() => setIsSidebarOpen(true)}/>
            </div>

            <SideBar isOpen={isSideBarOpen} onClose={closeSideBar} />

        </header>
    )
}

export default Header;