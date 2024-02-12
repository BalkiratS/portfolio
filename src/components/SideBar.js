import React from "react";
import "./SideBar.css"
import { IoClose } from "react-icons/io5";
import CvButton from "./cvButton";
import {motion, AnimatePresence} from 'framer-motion'

const SideBar = ({isOpen, onClose}) => {

    const handleClose = () => {
        onClose();
    }

    return (
        <AnimatePresence>
            {(isOpen) && 

                <motion.div initial={{width: 0}} animate={{width: "100%"}} exit={{opacity: 0}} className='sidebar'>
                <IoClose className="close-side" size='2em' color="white" onClick={handleClose}/>
                <nav className="side-nav">
                        <ul>
                            <li><a href="#home" onClick={handleClose}>Home</a></li>
                            <li><a href="#skills" onClick={handleClose}>Skills</a></li>
                            <li><a href="#projects" onClick={handleClose}>Projects</a></li>
                            <li><a href="#contact" onClick={handleClose}>Contact</a></li>
                            <CvButton className='side_cv_button' />
                        </ul>
                </nav>
                </motion.div>
        }

        </AnimatePresence>
    )
}

export default SideBar;