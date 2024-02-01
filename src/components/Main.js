import React from "react";
import Header from './Header';
import About_me from './About';
import Skills from './skills';
import Projects from "./Projects";
import './Main.css'

const Main = () => {
    return (
        <div className="main">
        <Header/>
        <About_me/>
        <Skills />
        <Projects />
        </div>
    )
}

export default Main;