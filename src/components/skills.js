import Skill from "./skill";
import './skills.css'
import {motion} from 'framer-motion'

const skillsData = [
    {skillName: 'Python', info: {projects: [{name: 'Fittrack', link: '#'}], courses: [{name: 'CMPT 101', link:'#' }], logo: 'python-logo.png'} },
    {skillName: 'Java', info: {projects: [{name: 'Dashboard', link: '#'}], courses: [{name: 'CMPT 305', link:'#' }], logo: 'Java-Emblem.jpeg'} }
  ];

  const Skills = () => {
    return (
        <motion.div layout className="skills_section">
            {skillsData.map((skill, index) => (
                <Skill key={skill.skillName} {...skill}/>
            ))}
        </motion.div>
    )
  }

  export default Skills;