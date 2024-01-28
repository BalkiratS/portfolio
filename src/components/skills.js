import React, { useState, useEffect } from "react";
import axios from "axios";
import Skill from "./skill";
import './skills.css'
import {motion} from 'framer-motion'

// const skillsData = [
//     {skillName: 'Python', info: {projects: [{name: 'Fittrack', link: '#'}], courses: [{name: 'CMPT 101', link:'#' }], logo: 'python-logo.png'} },
//     {skillName: 'Java', info: {projects: [{name: 'Dashboard', link: '#'}], courses: [{name: 'CMPT 305', link:'#' }], logo: 'Java-Emblem.jpeg'} }
//   ];



  const Skills = () => {
    const [skillsData, setSkillsData] = useState([]); // State to store retrieved skills

    useEffect(() => {
        const fetchSkills = async () => {
          try {
            const res = await axios.get("http://localhost:9000/skills/");
            setSkillsData(res.data);
          } catch (error) {
            console.log(error.messgae)
          }
        };
    
        fetchSkills();
      }, []);




    return (
        <motion.div layout className="skills_section">
          {skillsData.map((skill) => (
            <Skill key={skill.name} skill={skill}/>
          ))}
            {/* {skillsData.map((skill) => (
                <Skill key={skill.skillName} {...skill}/>
            ))} */}
        </motion.div>
    )
  }

  export default Skills;