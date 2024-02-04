import React from "react";
import './Project.css'
import { FaLink } from "react-icons/fa6";



const Project = ({project}) => {
    
    return (
        <div className="container">
              <div className="card">
                <div className="face face1">
                <div className="content">
                    <span className="stars"></span>
                    <p className="description">{project.description}</p>
                    <ul>
                    {project.technology.map((tech) => (
                            <li className="tech" key={tech.name}>
                                {tech.name}
                            </li>
                        ))}
                    </ul>
                    <FaLink className="link" color="white" size='1.3em' onClick={() => window.open(project.link, '_blank')}/>
                    

                </div>
                </div>
                <div className="face face2">
                <h2>{project.name}</h2>
                </div>
            </div>
        </div>
    )
}

export default Project;