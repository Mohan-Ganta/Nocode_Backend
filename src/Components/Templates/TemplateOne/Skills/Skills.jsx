import React, { useEffect, useState } from 'react'
import "../Education/Education.css"
import axios from "axios"
const SkillTab = (item)=>{
    return(
        <div className="edu-tab">
            <div className="title">
                {item.item.skill}
            </div>
            
        </div>
    )
}
const Skills = () => {
    const [skillData, setSkills] = useState([]);
  const id = localStorage.getItem("userid");
  useEffect(() => {
    const url = `${process.env.REACT_APP_SKILLS_URL}/${id}`;
    console.log(url)
    try {
      if (skillData.length < 1) {
        axios
          .get(url)
          .then((response) => {
            setSkills(response.data);
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
      {skillData ? (
        <div className="edu-container">
            {skillData.map((item,index)=>{
                return <SkillTab item={item} key={index} />
            })}
        </div>
      ):("No Data found")}
    </div>
  )
}

export default Skills
