import React, { useState } from "react";
import './AdminSkill.css'
import axios from "axios";
import { useAuth } from "../AuthContext";

const Admin_skill = ( {skill, skillsData, onSkillChange} ) => {
  // State to control editing mode
  const [isEditing, setIsEditing] = useState(false);
  // State to store updated skill information
  const [updatedSkill, setUpdatedSkill] = useState(skill);

  // Fetching authentication token from context
  const {token} = useAuth();

  // State for new project and course
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectLink, setNewProjectLink] = useState("");
  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseLink, setNewCourseLink] = useState("");

  // Function to submit updated skill to backend
  const submitSkillToBackend = async (updatedSkill) => {
    const formData = new FormData();

    formData.append('name', updatedSkill.name);
    formData.append('projects', JSON.stringify(updatedSkill.projects));
    formData.append('courses', JSON.stringify(updatedSkill.courses));
    formData.append('logo', updatedSkill.logo);  // Assuming updatedSkill.logo is a File object
    formData.append('category', updatedSkill.category);
  
    try {
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}skills/auth/update/${updatedSkill.name}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}`,
        },
      });
      console.log(response.data); // Return the saved skill data

    } catch (error) {
      console.error('Error updating skill:', error);
      throw error;
    }
  };

  // Function to handle logo change
  const onLogoChange = (event) => {
    const newLogoFile = event.target.files[0];
    console.log(newLogoFile)

    setUpdatedSkill({
      ...updatedSkill,
      logo: newLogoFile,
    });
  };
  
  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    await submitSkillToBackend(updatedSkill);
    setIsEditing(false);
  };

  // Function to delete a skill
  const deleteSkill = async (skillName) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}skills/auth/delete/${skillName}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      });
      onSkillChange(skillsData.filter((skill) => skill.name !== skillName));
      console.log(response.data); // Return the saved skill data

    } catch (error) {
      console.error('Error deleting skill:', error);
      throw error;
    }
  };

  // Function to add a new project
  const handleAddProject = () => {
    setUpdatedSkill({
      ...updatedSkill,
      projects: [...updatedSkill.projects, { name: newProjectName, link: newProjectLink }],
    });
    setNewProjectName("");
    setNewProjectLink("");
  };

  // Function to delete a project
  const deleteProject = (index) => {
    setUpdatedSkill({
      ...updatedSkill,
      projects: updatedSkill.projects.filter((_, i) => i !== index),
    });
  };  

  // Function to add a new course
  const handleAddCourse = () => {
    setUpdatedSkill({
      ...updatedSkill,
      courses: [...updatedSkill.courses, { name: newCourseName, link: newCourseLink }],
    });
    setNewCourseName("");
    setNewCourseLink("");
  };
  
  // Function to delete a course
  const deleteCourse = (index) => {
    setUpdatedSkill({
      ...updatedSkill,
      courses: updatedSkill.courses.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="skill_edit">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
            <label>Name: </label>
          <input
            type="text"
            value={updatedSkill.name}
            onChange={(e) => setUpdatedSkill({ ...updatedSkill, name: e.target.value })}
          /><br/>
          <label>Category: </label>
          <input
            type="text"
            value={updatedSkill.category}
            onChange={(e) => setUpdatedSkill({ ...updatedSkill, category: e.target.value })}
            /><br/>
          <label>Logo: </label>
          <input type="file" id="logo-file" onChange={(e) => onLogoChange(e)} />

           {/* Projects */}
           <div className="edit_projects">
            <h4>Projects</h4>
            <ul>
            {updatedSkill.projects && updatedSkill.projects.length > 0 && (
            <div>
              {updatedSkill.projects.map((project, index) => (
                <li key={index}>
                  <label>Name: </label>
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) =>
                      setUpdatedSkill({
                        ...updatedSkill,
                        projects: [
                          ...updatedSkill.projects.slice(0, index),
                          { ...project, name: e.target.value },
                          ...updatedSkill.projects.slice(index + 1),
                        ],
                      })
                    }
                  />
                  <label>Link: </label>
                  <input
                    type="text"
                    value={project.link}
                    onChange={(e) =>
                      setUpdatedSkill({
                        ...updatedSkill,
                        projects: [
                          ...updatedSkill.projects.slice(0, index),
                          { ...project, link: e.target.value },
                          ...updatedSkill.projects.slice(index + 1),
                        ],
                      })
                    }
                  />
                  <button type="button" onClick={() => deleteProject(index)}>
                    Delete
                  </button>
                </li>
              ))}
            </div>
            )}
              <span className="new_item">Add New Project</span>
              <li key="newProject">
                <label>Name: </label>
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                />
                <label>Link: </label>
                <input
                  type="text"
                  value={newProjectLink}
                  onChange={(e) => setNewProjectLink(e.target.value)}
                />
                <button type="button" onClick={() => handleAddProject()}>
                  Add
                </button>
              </li>
            </ul>
          </div>
          

          {/* Courses */}
            <div className="edit_courses">
                <h4>Courses</h4>
                <ul>
                {updatedSkill.courses && updatedSkill.courses.length > 0 && (
                    <div>
                    {updatedSkill.courses.map((course, index) => (
                    <li key={index}>
                        <label>Name: </label>
                        <input
                        type="text"
                        value={course.name}
                        onChange={(e) =>
                            setUpdatedSkill({
                            ...updatedSkill,
                            courses: [
                                ...updatedSkill.courses.slice(0, index),
                                { ...course, name: e.target.value },
                                ...updatedSkill.courses.slice(index + 1),
                            ],
                            })
                        }
                        />
                        <label>Link: </label>
                        <input
                        type="text"
                        value={course.link}
                        onChange={(e) =>
                            setUpdatedSkill({
                            ...updatedSkill,
                            courses: [
                                ...updatedSkill.courses.slice(0, index),
                                { ...course, link: e.target.value },
                                ...updatedSkill.courses.slice(index + 1),
                            ],
                            })
                        }
                        />
                        <button type="button" onClick={() => deleteCourse(index)}>
                        Delete
                        </button>
                    </li>
                    ))}
                    </div>
                )}

                <span className="new_item">Add New Course</span>
                <li key="newCourse">
                <label>Name: </label>
                <input
                  type="text"
                  value={newCourseName}
                  onChange={(e) => setNewCourseName(e.target.value)}
                />
                <label>Link: </label>
                <input
                  type="text"
                  value={newCourseLink}
                  onChange={(e) => setNewCourseLink(e.target.value)}
                />
                <button type="button" onClick={() => handleAddCourse()}>
                  Add
                </button>
              </li>
            </ul>
          </div>
          

        <div className="save_cancel_buttons">
            <button className="admin_button" type="submit">Save</button>
            <button className="admin_button" type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
          
        </form>
            ) : (
                <div>
                    <h3>{updatedSkill?.name || "Loading..."}</h3>
                    <button className="admin_button" onClick={() => setIsEditing(true)}>Edit</button>
                    <button className="delete_button" onClick={() => deleteSkill(updatedSkill.name)}>Delete</button> 
                </div>  
            )}
        </div>
    )
}

export default Admin_skill;