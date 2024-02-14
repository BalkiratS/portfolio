import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import './AdminProject.css'

const AdminProject = ({project, projectsData, onProjectChange}) => {
    // State to control editing mode
    const [isEditing, setIsEditing] = useState(false);
    // State to store updated project information
    const [updatedProject, setUpdatedProject] = useState({
        name: project.name,
        description: project.description,
        technology: project.technology,
        link: project.link
    });

    // State for new technology
    const [newTechName, setNewTechName] = useState("");

    // Fetching authentication token from context
    const {token} = useAuth();

    // Function to submit updated project to backend
    const submitProjectToBackend = async (updatedProject) => {
        try {
            const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}projects/auth/update/${updatedProject.name}`, updatedProject, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
            });
            console.log(response.data); // Return the saved project data

        } catch (error) {
            console.error('Error updating project:', error);
            throw error;
        }
    };

    // Handling form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        await submitProjectToBackend(updatedProject);
        setIsEditing(false);
    };
    
    // Function to delete a project
    const deleteProject = async (projectName) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}projects/auth/delete/${projectName}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
            });
            // Updating projects data after deletion
            onProjectChange(projectsData.filter((project) => project.name !== projectName));
            console.log(response.data); // Return the saved project data

        } catch (error) {
            console.error('Error deleting project:', error);
            throw error;
        }
    };

    // Function to add a new technology
    const handleAddTech = () => {
        setUpdatedProject({
            ...updatedProject,
            technology: [...updatedProject.technology, { name: newTechName}],
        });
        setNewTechName("");
    };

    // Function to delete a technology
    const deleteTech = (index) => {
        setUpdatedProject({
            ...updatedProject,
            technology: updatedProject.technology.filter((_, i) => i !== index),
        });
    };  

    return (
        <div className="project_edit">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
              <label>Name: </label>
            <input
              type="text"
              value={updatedProject.name}
              onChange={(e) => setUpdatedProject({ ...updatedProject, name: e.target.value })}
            /><br/>
            <label>Description: </label><br/>
            <textarea
              rows={5}
              cols={40}
              value={updatedProject.description}
              onChange={(e) => setUpdatedProject({ ...updatedProject, description: e.target.value })}
              /><br/>
              <label>Link: </label>
            <input
              type="text"
              value={updatedProject.link}
              onChange={(e) => setUpdatedProject({ ...updatedProject, link: e.target.value })}
            /><br/> 
            
            {/* Technology */}
           <div className="edit_technology">
            <h4>Technology</h4>
            <ul>
            {updatedProject.technology && updatedProject.technology.length > 0 && (
            <div>
              {updatedProject.technology.map((technology, index) => (
                <li key={index}>
                  <label>Name: </label>
                  <input
                    type="text"
                    value={technology.name}
                    onChange={(e) =>
                      setUpdatedProject({
                        ...updatedProject,
                        technology: [
                          ...updatedProject.technology.slice(0, index),
                          { ...technology, name: e.target.value },
                          ...updatedProject.technology.slice(index + 1),
                        ],
                      })
                    }
                  />
                  <button type="button" onClick={() => deleteTech(index)}>
                    Delete
                  </button>
                </li>
              ))}
            </div>
            )}
              <span className="new_item">Add New Technology</span>
              <li key="newTechology">
                <label>Name: </label>
                <input
                  type="text"
                  value={newTechName}
                  onChange={(e) => setNewTechName(e.target.value)}
                />
                <button type="button" onClick={() => handleAddTech()}>
                  Add
                </button>
              </li>
            </ul>
          </div>

          <div className="save_cancel_buttons">
            <button className="save admin_button" type="submit">Save</button>
            <button className="cancel admin_button" type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
             </form>
            ) : (
                <div>
                    <h3>{updatedProject?.name || "Loading..."}</h3>
                    <button className="edit admin_button" onClick={() => setIsEditing(true)}>Edit</button>
                    <button className="delete_button" onClick={() => deleteProject(updatedProject.name)}>Delete</button> 
                </div>  
            )}
           
        </div>

        
    )
}

export default AdminProject;