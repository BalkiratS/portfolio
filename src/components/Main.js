import React from "react";
import Header from './Header';
import About_me from './About';
import Skills from './skills';

const Main = () => {
    return (
        <div className="main">
        <Header/>
        <About_me/>
        <Skills />
        </div>
    )
}

export default Main;