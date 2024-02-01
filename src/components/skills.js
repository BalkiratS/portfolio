import React, { useState, useEffect } from "react";
import axios from "axios";
import Skill from "./skill";
import './skills.css'
import {motion} from 'framer-motion'

const Skills = () => {
  const [skillsData, setSkillsData] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get("http://localhost:9000/skills/");
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
    <div className="skills_section">
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
    </div>
  );
  
};

export default Skills;