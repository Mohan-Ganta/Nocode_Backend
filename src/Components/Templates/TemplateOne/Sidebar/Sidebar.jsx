import React from 'react'
import "./Sidebar.css"
const Sidebar = ({profile,username,desc}) => {
  return (
    <div className='sidebar'>
      <div className="profile-img">
        <img src={profile} alt="..image" />
      </div>
      <div className="content">
        <h3>{username}</h3>
        <p>{desc}</p>
      </div>
      <div className="sidebar-links">
        <a href="#home" >Home</a>
        <a href="#education" >Education</a>
        <a href="#experience" >Experience</a>
        <a href="#projects" >Projects</a>
        <a href="#certifications" >Skills</a>
        <a href="#skills" >Certifications</a>        
      </div>
    </div>
  )
}

export default Sidebar
