import React from "react";
import Project from "./Project";
import './Projects.css'

const Projects = () => {
    const projectData = [{'name': 'Fittrack', description: 'This is where the description fo the project will go', technology:[{name: 'Python'}, {name: 'Flutter'}, {name: 'Machine Learning'}]},
    {'name': 'DashBoard', description: 'This is where the description fo the project will go', technology:[{name: 'Python'}, {name: 'Flutter'}, {name: 'Machine Learning'}]},
    {'name': 'Hippocampus', description: 'This is where the description fo the project will go', technology:[{name: 'Python'}, {name: 'Flutter'}, {name: 'Machine Learning'}]},
    {'name': 'test', description: 'This is where the description fo the project will go', technology:[{name: 'Python'}, {name: 'Flutter'}, {name: 'Machine Learning'}]},
    {'name': 'test2', description: 'This is where the description fo the project will go', technology:[{name: 'Python'}, {name: 'Flutter'}, {name: 'Machine Learning'}]}]
    
    return (
        <div className="projects-section">
            <h1>Projects</h1>
            <div className="project-cards">
                {projectData.map((project) => (
                    <Project key={project.name} project={project} />
                ))}
            </div>
            
        </div>
        
        
    )
}
export default Projects;