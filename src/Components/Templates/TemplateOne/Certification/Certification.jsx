import React, { useEffect, useState } from 'react'
import "../Education/Education.css"
import axios from "axios"
const CertificationTab = (item)=>{
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
const Certification = () => {
    const [certData, setCertData] = useState([]);
  const id = localStorage.getItem("userid");
  useEffect(() => {
    const url = `${process.env.REACT_APP_CERT_URL}/${id}`;
    console.log(url)
    try {
      if (certData.length < 1) {
        axios
          .get(url)
          .then((response) => {
            setCertData(response.data);
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
      {certData ? (
        <div className="edu-container">
            {certData.map((item,index)=>{
                return <CertificationTab item={item} key={index} />
            })}
        </div>
      ):("No Data found")}
    </div>
  )
}

export default Certification
