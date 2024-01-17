import React, { useState } from "react";
import "./skill.css"
import {motion, AnimatePresence} from 'framer-motion'


const Skill = ({skillName, info}) => {

    const [expanded, setExpanded] = useState(false);

    const handleClick = () => {
        setExpanded(!expanded)
    }

    return (
        <motion.div transition={{layout: {duration: 1, type: 'spring' }}} layout className='skill-container' >
            {(!expanded) && (
                    <motion.div layout className="skill_card_short" onClick={handleClick}>
                        <motion.span layout >{skillName}</motion.span>
                    </motion.div>
            )}

            {expanded && (
                <div className="skill_card_details" onClick={handleClick}>
                    <div className="skill_logo">
                        <img src={require(`../public/${info.logo}`)} />
                    </div>

                    <div className="info">
                        <span className="heading">{skillName}</span>
                        <div className="projects">
                            <span>Projects</span>
                        <ul>
                            {info.projects.map((project) => (
                                <li key={project.name}>
                                    <a href={project.link}>{project.name}</a>
                                </li>
                            ))}
                        </ul>
                        </div>

                        <div className="courses">
                            <span>Courses</span>
                            <ul>
                                {info.courses.map((course) => (
                                    <li key={course.name}>
                                        <a href={course.link}>{course.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

                </div>     
            )}
        </motion.div>
    )
}

export default Skill;