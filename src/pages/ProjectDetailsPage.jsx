import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AddTask from "../components/AddTask";
import TaskCard from "../components/TaskCard";

const API_URL = "https://project-management-api-4641927fee65.herokuapp.com";

function ProjectDetailsPage () {
  const [project, setProject] = useState(null);
  
  // Get the URL parameter `:projectId` 
  const { projectId } = useParams();
  
  
  // Helper function that makes a GET request to the API
  // and retrieves the project by id
  const getProject = () => {
    axios
      .get(`${API_URL}/projects/${projectId}?_embed=tasks`)
      .then((response) => {
        const oneProject = response.data;
        setProject(oneProject);
      })
      .catch((error) => console.log(error));
  };
  
  
  useEffect(()=> {
    getProject();
  }, [] );

  
  return (
    <div className="ProjectDetailsPage">
      {project && (
        <>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </>
      )}
      
      { project && project.tasks.map((task) => (
        <TaskCard key={task.id} {...task} />        /* UPDATE */
      ))} 

      <AddTask refreshProject={getProject} projectId={projectId} />      

      <Link to="/projects">
        <button>Back to projects</button>
      </Link>
      
      <Link to={`/projects/edit/${projectId}`}>
        <button>Edit Project</button>
      </Link>      
      
    </div>
  );
}

export default ProjectDetailsPage;