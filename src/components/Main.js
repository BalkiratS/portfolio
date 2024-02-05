import React from "react";
import Header from './Header';
import AboutMe from './About';
import Skills from './skills';
import Projects from "./Projects";
import Footer from "./Footer";
import './Main.css'

const Main = () => {
    return (
        <div className="main">
        <Header/>
        <AboutMe/>
        <Skills />
        <Projects />
        <Footer />
        </div>
    )
}

export default Main;