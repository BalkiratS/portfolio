import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from '../AuthContext';
import Admin_skill from "./Admin_skill";
import Add_skill from "./Add_skill";
import "./Admin.css"
import Admin_Project from "./Admin_project";
import Add_project from "./Add_project";

function Admin() {
  const [skillsData, setSkillsData] = useState([]); // State to store retrieved skills
  const [projectsData, setProjectsData] = useState([]);
  const [message, setMessage] = useState(""); // State for error or success messages
  const [addSkill, setAddSkill] = useState(false);
  const [addProject, setAddProject] = useState(false);
  const { token, logout } = useAuth();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get("http://localhost:9000/skills/", {
          headers: { Authorization: `${token}` }, // Add authorization header
        });
        setSkillsData(res.data);
      } catch (error) {
        setMessage(error.message);
      }
    };

    fetchSkills();
  }, [token]); // Re-fetch skills if token changes

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:9000/projects/", {
          headers: { Authorization: `${token}` }, // Add authorization header
        });
        setProjectsData(res.data);
      } catch (error) {
        setMessage(error.message);
      }
    };

    fetchProjects();
  }, [token]); // Re-fetch skills if token changes

  useEffect(() => {
    window.addEventListener('beforeunload', (event) => {
      logout(); // Call the logout function
    });

    return () => {
      window.removeEventListener('beforeunload', logout);
    };
  }, []);

  return (
    <div>
    <div className="admin_skills">
      <h1>Skills</h1>
      {message && <h1>{message}</h1>} {/* Display message if any */}
      {skillsData.length > 0 && (
        <div className="skills-list">
          {skillsData.map((skill) => (
            <Admin_skill key={skill.name} skill={skill} skillsData={skillsData} onSkillChange={setSkillsData}/>
          ))}
        </div>
      )}
      {skillsData.length === 0 && <p>No skills found.</p>}
      {!addSkill && (<button className="admin_button" onClick={() => setAddSkill(true)}>Add</button>)}
      {addSkill && (
        <Add_skill skillsData={skillsData} onSkillAdd={setSkillsData} setAddSkill={setAddSkill} />
      )}
      </div>

      <div className="admin_projects">
      <h1>Projects</h1>
            {message && <h1>{message}</h1>} {/* Display message if any */}
            {projectsData.length > 0 && (
              <div className="projects-list">
                {projectsData.map((project) => (
                  <Admin_Project key={project.name} project={project} projectsData={projectsData} onProjectChange={setProjectsData}/>
                ))}
              </div>
            )}
            {projectsData.length === 0 && <p>No projects found.</p>}
            {!addProject && (<button className="admin_button" onClick={() => setAddProject(true)}>Add</button>)}
            {addProject && (
              <Add_project projectsData={projectsData} onProjectAdd={setProjectsData} setAddProject={setAddProject} />
            )}
            </div>
    </div>
  );
}

export default Admin;
