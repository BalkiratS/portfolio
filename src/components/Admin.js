import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import AdminSkill from "./AdminSkill";
import AddSkill from "./AddSkill";
import "./Admin.css";
import AdminProject from "./AdminProject";
import AddProject from "./AddProject";

function Admin() {
  // State for retrieved skills and projects data
  const [skillsData, setSkillsData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);

  // State for error or success messages
  const [message, setMessage] = useState("");

  // State for add skill and add project modals
  const [addSkill, setAddSkill] = useState(false);
  const [addProject, setAddProject] = useState(false);

  // State for resume file upload
  const [resumeFile, setResumeFile] = useState(null);

  // Access auth token and logout function from AuthContext
  const { token, logout } = useAuth();

  // Fetch skills data on mount and token changes
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}skills/`, {
          headers: { Authorization: `${token}` },
        });
        setSkillsData(res.data);
      } catch (error) {
        setMessage(error.message);
      }
    };

    fetchSkills();
  }, [token]);

  // Fetch projects data on mount and token changes
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}projects/`, {
          headers: { Authorization: `${token}` },
        });
        setProjectsData(res.data);
      } catch (error) {
        setMessage(error.message);
      }
    };

    fetchProjects();
  }, [token]);

  // Call logout on window beforeunload
  useEffect(() => {
    window.addEventListener("beforeunload", (event) => {
      logout();
    });

    return () => {
      window.removeEventListener("beforeunload", logout);
    };
  });

  // Handle resume file selection
  const onResumeChange = (event) => {
    const newResumeFile = event.target.files[0];
    setResumeFile(newResumeFile);
  };

  // Handle resume upload
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}resume/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${token}`,
          },
        }
      );

      console.log("File uploaded successfully:", response.data);
      setResumeFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="admin-main">
    <div className="admin_skills">
      <h1>Skills</h1>
      {message && <h1>{message}</h1>} {/* Display message if any */}
      {skillsData.length > 0 && (
        <div className="skills-list">
          {skillsData.map((skill) => (
            <AdminSkill key={skill.name} skill={skill} skillsData={skillsData} onSkillChange={setSkillsData}/>
          ))}
        </div>
      )}
      {skillsData.length === 0 && <p>No skills found.</p>}
      {!addSkill && (<button className="admin_button" onClick={() => setAddSkill(true)}>Add</button>)}
      {addSkill && (
        <AddSkill skillsData={skillsData} onSkillAdd={setSkillsData} setAddSkill={setAddSkill} />
      )}
      </div>

      <div className="admin_projects">
      <h1>Projects</h1>
            {message && <h1>{message}</h1>} {/* Display message if any */}
            {projectsData.length > 0 && (
              <div className="projects-list">
                {projectsData.map((project) => (
                  <AdminProject key={project.name} project={project} projectsData={projectsData} onProjectChange={setProjectsData}/>
                ))}
              </div>
            )}
            {projectsData.length === 0 && <p>No projects found.</p>}
            {!addProject && (<button className="admin_button" onClick={() => setAddProject(true)}>Add</button>)}
            {addProject && (
              <AddProject projectsData={projectsData} onProjectAdd={setProjectsData} setAddProject={setAddProject} />
            )}
            </div>

        <div className="admin_resume">
          <h1>Resume</h1>
          <input type="file" onChange={(e) => onResumeChange(e)} />
          <button className="admin_button" onClick={handleUpload}>Upload</button>
        </div>
    </div>
  );
}

export default Admin;
