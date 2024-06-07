import React from 'react'
import AboutSection from './UpdateFields/AboutSection'
import Education from './UpdateFields/Education'
import Experience from './UpdateFields/Experience'
import Projects from './UpdateFields/Projects'
import Certifications from './UpdateFields/Certifications'
import Skills from './UpdateFields/Skills'
import { useNavigate } from 'react-router-dom'

const CreateProfile = () => {
const navigate = useNavigate()

    const handleExit = ()=>{
        navigate("/dashboard")
    }
  return (
    <div className='update-page'>
      <div className="section-header update-header">
        <header>CREATE PROFILE </header>
        <button className='save-btn exit' onClick={handleExit}>Exit</button>
        </div>
      <AboutSection update={false}/>
      <Education update={false}/>
      <Experience update={false} />
      <Projects update={false}/>
      <Certifications update={false} />
      <Skills update={false}/>
    </div>
  )
}

export default CreateProfile
