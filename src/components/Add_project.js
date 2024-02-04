import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import axios from "axios";

const Add_project = ( {projectsData, onProjectAdd, setAddProject}) => {
    const [newProject, setNewProject] = useState({
        name: "",
        description: "",
        technology: [],
        link: ""
    })

    const { token } = useAuth();



    // State for new technology
    const [newTechnologyName, setNewTechnologyName] = useState("");

    const handleCancel = () => {
        setNewProject({
            name: "",
            description: "",
            technology: [],
            link: ""
        })
        setAddProject(false)
    }

    const AddProjectToBackend = async (newProject, token) => {
  
      try {
          const response = await axios.post('http://localhost:9000/projects/auth/add', newProject, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `${token}`,
              },
          });
  
          setNewProject({
              name: "",
              description: "",
            technology: [],
            link: ""
          });

          onProjectAdd([...projectsData, newProject])
          return response.data; // Return the saved project data

        } catch (error) {
          console.error('Error adding project:', error);
          throw error;
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        await AddProjectToBackend(newProject, token);
    }
    
      const handleAddTechnology = () => {
        setNewProject({
          ...newProject,
          technology: [...newProject.technology, { name: newTechnologyName}],
        });
        setNewTechnologyName("");
      };
      
      const deleteTechnology = (index) => {
        setNewProject({
          ...newProject,
          technology: newProject.technology.filter((_, i) => i !== index),
        });
      };

    return (
        <div className="project_edit">

        <form onSubmit={handleSubmit}>
            <label>Name: </label>
            <input
                type="text"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            />
            <br />
            <label>Description  : </label><br/>
            <textarea
            rows={5}
            cols={40}
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            /><br/>
            <label>Link  : </label>
            <input
            type="text"
            value={newProject.link}
            onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
            /><br/>

            

            <div className="edit_technology">
                <h4>Technology</h4>
                <ul>
                {newProject.technology.map((technology, index) => (
                    <li key={index}>
                    <label>Name: </label>
                    <input
                        type="text"
                        value={technology.name}
                        onChange={(e) =>
                        setNewProject({
                            ...newProject,
                            technology: [
                            ...newProject.technology.slice(0, index),
                            { ...technology, name: e.target.value },
                            ...newProject.technology.slice(index + 1),
                            ],
                        })
                        }
                    />
                    
                    <button type="button" onClick={() => deleteTechnology(index)}>
                        Delete
                        </button>
                    </li>
                ))}
                <span className="new_item">Add New Technology</span>
                <li key="newTechnology">
                <label>Name: </label>
                <input
                  type="text"
                  value={newTechnologyName}
                  onChange={(e) => setNewTechnologyName(e.target.value)}
                />
                
                <button type="button" onClick={() => handleAddTechnology()}>
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

export default Add_project;