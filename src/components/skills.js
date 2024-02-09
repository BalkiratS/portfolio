import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Skill from "./skill";
import './skills.css'
import {motion, useInView} from 'framer-motion'


const Skills = () => {
  const [skillsData, setSkillsData] = useState([]);

  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "0px 0px -200px 0px",
  })

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}skills/`);
        const groupedSkills = groupSkillsByCategory(res.data);
        setSkillsData(groupedSkills);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchSkills();
  }, []);

  const groupSkillsByCategory = (skills) => {
    const groupedSkills = {};
    skills.forEach((skill) => {
      const category = skill.category;
      groupedSkills[category] = groupedSkills[category] || [];
      groupedSkills[category].push(skill);
    });
    return groupedSkills;
  };

  return (
    
    <motion.div ref={ref} id="skills" className="skills_section" 
    style={{
      transform: isInView ? "none" : "translateX(-200px)",
      opacity: isInView ? 1 : 0,
      transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
    }}
      >
      <span className="section_heading">What I Know...</span>
      <div className="skills_container">
        <div className="column-wrapper"> {/* First column */}
          {Object.entries(skillsData).map(([category, skills], index) => (
            index % 2 === 0 && ( /* Render categories with even indices */
              <motion.div
                key={category}
                layout
                className="skills_category"
              >
                <span className="category_heading">{category}</span>
                <motion.div className="skills_list">
                  {skills.map((skill) => (
                    <Skill key={skill.name} skill={skill} />
                  ))}
                </motion.div>
              </motion.div>
            )
          ))}
        </div>
        <div className="column-wrapper"> {/* Second column */}
          {Object.entries(skillsData).map(([category, skills], index) => (
            index % 2 !== 0 && ( /* Render categories with odd indices */
              <motion.div
                key={category}
                layout
                className="skills_category"
              >
                <span className="category_heading">{category}</span>
                <motion.div className="skills_list">
                  {skills.map((skill) => (
                    <Skill key={skill.name} skill={skill} />
                  ))}
                </motion.div>
              </motion.div>
            )
          ))}
        </div>
      </div>
    </motion.div>
  );
  
};

export default Skills;