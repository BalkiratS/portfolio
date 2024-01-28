import React, { useState } from "react";
import "./skill.css"
import {motion} from 'framer-motion';


const Skill = ({skill}) => {

    const [expanded, setExpanded] = useState(false);

    const handleClick = () => {
        setExpanded(!expanded)
    }

    return (
        <motion.div transition={{layout: {duration: 1, type: 'spring', damping: 15 }}} layout className='skill-container' >

            <div className={`skill_card${!expanded ? '_short' : '_details'}`} onClick={handleClick}>

            {(expanded) && 
                <div className="skill_logo">
                {skill.logo && (
                <img
                    src= {skill.logo.url}
                    alt={`Logo for ${skill.name}`}
                />
            )}
            </div>
            }
                <motion.p layout="position" className={!expanded ? 'name' : 'heading'}>{skill.name}</motion.p>

            {(expanded) && 
            <div className="info">
                 <div className="projects">
                 <span>Projects</span>
                    <ul>
                        {skill.projects.map((project) => (
                            <li key={project.name}>
                                <a href={project.link}>{project.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="courses">
                    <span>Courses</span>
                    <ul>
                        {skill.courses.map((course) => (
                            <li key={course.name}>
                                <a href={course.link}>{course.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
             </div>
            }

            </div>
        
        </motion.div>
    )
}

export default Skill;