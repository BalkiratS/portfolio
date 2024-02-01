import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import axios from "axios";

const Add_skill = ( {skillsData, onSkillAdd, setAddSkill}) => {
    const [newSkill, setNewSkill] = useState({
        name: "",
        projects: [],
        courses: [],
        logo: null
    })

    const { token } = useAuth();



    // State for new project and course
    const [newProjectName, setNewProjectName] = useState("");
    const [newProjectLink, setNewProjectLink] = useState("");
    const [newCourseName, setNewCourseName] = useState("");
    const [newCourseLink, setNewCourseLink] = useState("");

    const handleCancel = () => {
        setNewSkill({
            name: "",
            projects: [],
            courses: [],
            logo: null
        })
        setAddSkill(false)
    }

    const AddSkillToBackend = async (newSkill, token) => {

      const formData = new FormData();

      formData.append('name', newSkill.name);
      formData.append('projects', JSON.stringify(newSkill.projects));
      formData.append('courses', JSON.stringify(newSkill.courses));
      formData.append('logo', newSkill.logo);  // Assuming newSkill.logo is a File object
      formData.append('category', newSkill.category);
  
      try {
          const response = await axios.post('http://localhost:9000/skills/auth/add', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `${token}`,
              },
          });
  
          setNewSkill({
              name: "",
              projects: [],
              courses: [],
              logo: null
          });

          onSkillAdd([...skillsData, newSkill])
          return response.data; // Return the saved skill data

        } catch (error) {
          console.error('Error adding skill:', error);
          throw error;
        }
      };

      const onLogoChange = (event) => {
        const newLogoFile = event.target.files[0];
    
        setNewSkill({
            ...newSkill,
            logo: newLogoFile,
        });
    };

    const handleSubmit = async (e) => {
        await AddSkillToBackend(newSkill, token);
    }



    const handleAddProject = () => {
        setNewSkill({
          ...newSkill,
          projects: [...newSkill.projects, { name: newProjectName, link: newProjectLink }],
        });
        setNewProjectName("");
        setNewProjectLink("");
      };
    
      const deleteProject = (index) => {
        setNewSkill({
          ...newSkill,
          projects: newSkill.projects.filter((_, i) => i !== index),
        });
      };  
    
      const handleAddCourse = () => {
        setNewSkill({
          ...newSkill,
          courses: [...newSkill.courses, { name: newCourseName, link: newCourseLink }],
        });
        setNewCourseName("");
        setNewCourseLink("");
      };
      
      const deleteCourse = (index) => {
        setNewSkill({
          ...newSkill,
          courses: newSkill.courses.filter((_, i) => i !== index),
        });
      };

    return (
        <div className="skill_edit">

        <form onSubmit={handleSubmit}>
            <label>Name: </label>
            <input
                type="text"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            />
            <br />
            <label>Category: </label>
            <input
            type="text"
            value={newSkill.category}
            onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
            /><br/>
            <label>Logo: </label>
            <input type="file" id="logo-file" onChange={(e) => onLogoChange(e)} />

            <div className="edit_projects">
                <h4>Projects</h4>
                <ul>
                {newSkill.projects.map((project, index) => (
                    <li key={index}>
                    <label>Name: </label>
                    <input
                        type="text"
                        value={project.name}
                        onChange={(e) =>
                        setNewSkill({
                            ...newSkill,
                            projects: [
                            ...newSkill.projects.slice(0, index),
                            { ...project, name: e.target.value },
                            ...newSkill.projects.slice(index + 1),
                            ],
                        })
                        }
                    />
                    <label>Link: </label>
                    <input
                        type="text"
                        value={project.link}
                        onChange={(e) =>
                        setNewSkill({
                            ...newSkill,
                            projects: [
                            ...newSkill.projects.slice(0, index),
                            { ...project, link: e.target.value },
                            ...newSkill.projects.slice(index + 1),
                            ],
                        })
                        }
                    />
                    <button type="button" onClick={() => deleteProject(index)}>
                    Delete
                  </button>
                    </li>
                ))}
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

            <div className="edit_courses">
                <h4>Courses</h4>
                <ul>
                {newSkill.courses.map((course, index) => (
                    <li key={index}>
                    <label>Name: </label>
                    <input
                        type="text"
                        value={course.name}
                        onChange={(e) =>
                        setNewSkill({
                            ...newSkill,
                            courses: [
                            ...newSkill.courses.slice(0, index),
                            { ...course, name: e.target.value },
                            ...newSkill.courses.slice(index + 1),
                            ],
                        })
                        }
                    />
                    <label>Link: </label>
                    <input
                        type="text"
                        value={course.link}
                        onChange={(e) =>
                        setNewSkill({
                            ...newSkill,
                            courses: [
                            ...newSkill.courses.slice(0, index),
                            { ...course, link: e.target.value },
                            ...newSkill.courses.slice(index + 1),
                            ],
                        })
                        }
                    />
                    <button type="button" onClick={() => deleteCourse(index)}>
                        Delete
                        </button>
                    </li>
                ))}
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
                <button className="admin_button" type="submit">Add</button>
                <button className="admin_button" type="button" onClick={() => handleCancel()}>Cancel</button>
            </div>
        </form>
    </div>
    )
}

export default Add_skill;