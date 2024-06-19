import React, { useEffect, useState } from "react";
import "./Education.css"
import axios from "axios";

const EducationTab = (ed)=>{
    return(
        <div className="edu-tab">
            <div className="title">{ed.ed.degree}</div>
            <div className="content">
                <p>{ed.ed.school} , {ed.ed.city}</p>
                <p>{ed.ed.startDate}-{ed.ed.endDate}</p>
            </div>
        </div>
    )
}
const EducationField = () => {
  const [educationData, setEducationData] = useState([]);
  const id = localStorage.getItem("userid");
  useEffect(() => {
    const url = `${process.env.REACT_APP_EDU_URL}/${id}`;
    console.log(url)
    try {
      if (educationData.length < 1) {
        axios
          .get(url)
          .then((response) => {
            setEducationData(response.data);
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
  return( 
  <div className="edu-container">
    {educationData.map((ed,index)=>{
        return <EducationTab key={index} ed={ed} />
    })}
  </div>
  );
};

export default EducationField;
