import React from "react";
import './Project.css'


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