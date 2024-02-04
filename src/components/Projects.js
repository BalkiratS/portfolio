import React, { useEffect, useState } from "react";
import Project from "./Project";
import './Projects.css'
import axios from "axios";

const Projects = () => {
    
    const [projectsData, setProjectsData] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get("http://localhost:9000/projects/")
                setProjectsData(res.data)

            } catch (error) {
                console.log(error.message)
            }
        };

        fetchProjects();
    }, [])



    return (
        <div className="projects-section">
            <h1>Projects</h1>
            <div className="project-cards">
                {projectsData.map((project) => (
                    <Project key={project.name} project={project} />
                ))}
            </div>
            
        </div>
        
        
    )
}
export default Projects;