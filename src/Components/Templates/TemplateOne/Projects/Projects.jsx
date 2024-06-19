import React, { useEffect, useState } from 'react'
import "../Education/Education.css"
import axios from "axios"
const ProjectTab = (item)=>{
    return(
        <div className="edu-tab">
            <div className="title">
                {item.item.name}
            </div>
            <div className="content">
               <p>{item.item.description}</p> 
               <p>{item.item.link}</p>
            </div>
        </div>
    )
}
const Projects = () => {
    const [projectData, setProjectData] = useState([]);
  const id = localStorage.getItem("userid");
  useEffect(() => {
    const url = `${process.env.REACT_APP_PRO_URL}/${id}`;
    console.log(url)
    try {
      if (projectData.length < 1) {
        axios
          .get(url)
          .then((response) => {
            setProjectData(response.data);
            console.log(response.data)
          })
          .catch((err) => {
            console.log("error" + err);
          });
      }
    } catch (err) {
      console.log("error" + err);
    }
  });
  return (
    <div>
      {projectData ? (
        <div className="edu-container">
            {projectData.map((item,index)=>{
                return <ProjectTab item={item} key={index} />
            })}
        </div>
      ):("No Data found")}
    </div>
  )
}

export default Projects
