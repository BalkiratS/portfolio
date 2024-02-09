import React, { useEffect, useState, useRef } from "react";
import Project from "./Project";
import './Projects.css'
import axios from "axios";
import {motion, useInView} from 'framer-motion'

const Projects = () => {
    
    const [projectsData, setProjectsData] = useState([]);

    const ref = useRef(null);
    const isInView = useInView(ref, {
        margin: "0px 0px -100px 0px",
    })

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}projects/`)
                setProjectsData(res.data)

            } catch (error) {
                console.log(error.message)
            }
        };

        fetchProjects();
    }, [])



    return (
        <motion.div ref={ref} id="projects" className="projects-section"
        style={{
            transform: isInView ? "none" : "translateX(-200px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
          }}
        >
            <h1>Projects</h1>
            <div className="project-cards">
                {projectsData.map((project) => (
                    <Project key={project.name} project={project} />
                ))}
            </div>
            
        </motion.div>
        
        
    )
}
export default Projects;