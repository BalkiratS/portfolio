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
                {(skill.projects.length > 0) && 
                 <div className="projects">
                 <span className="span_heading">Projects</span>
                    <ul>
                        {skill.projects.map((project) => (
                            <li key={project.name}>
                                <span className="span_name">{project.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                        }
                {(skill.courses.length > 0) && 
                <div className="courses">
                    <span className="span_heading">Courses</span>
                    <ul>
                        {skill.courses.map((course) => (
                            <li key={course.name}>
                                <span className="span_name">{course.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                }   
             </div>
            }

            </div>
        
        </motion.div>
    )
}

export default Skill;