import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar/Sidebar'
import axios from "axios"
import pic from "../../../assets/profileImages/pic1.png"
import "./Template1.css"
import Home from './Home/Home'
import EducationField from './Education/EducationField'
import { useAppContext } from '../../AppContext'
import ExperienceField from './Experience/ExperienceField'
import Projects from './Projects/Projects'
import Certification from './Certification/Certification'
import Skills from './Skills/Skills'
import { useNavigate } from 'react-router-dom'
const Template1 = () => {
  const {userdata} = useAppContext()
  const navigator = useNavigate()
  const [savedata, setSaveData] = useState([]);
  const [gotData,setGotData] = useState(true)
  useEffect(() => {
    const id = localStorage.getItem("userid");
    const url = `${process.env.REACT_APP_BASE_URL}/about/${id}`;
    console.log(url)
    if (gotData) {
      axios
        .get(url)
        .then((res) => {
          setSaveData(res.data);
          if(res.data.length>0)
            setGotData(false)
        })
        .catch((err) => console.log("error" + err));    
      console.log()
    }
  });
  const handleTemplateClose = ()=>{
    navigator("/dashboard")
  }
  console.log("the svaed data " ,savedata)
  return (
    <div className="template-container">
      <div className="close-button"><button onClick={handleTemplateClose}>close</button></div>
      <Sidebar profile={savedata.imageurl} username={userdata.username} desc={savedata.description}/>
      <div className="container">
        <section className="sectiontab" id='home'><Home username={userdata.username}  desc={savedata.description}/></section>
        <section className="sectiontab" id='education'><EducationField /></section>
        <section className="sectiontab" id='experience'><ExperienceField /></section>
        <section className="sectiontab" id='projects'><Projects /></section>
        <section className="sectiontab" id='certifications'><Certification /></section>
        <section className="sectiontab" id='skills'><Skills /></section>
      </div>
    </div>
  )
}

export default Template1
