import CreateAboutSection from './UpdateFields/CreateAboutSection'
import Education from './UpdateFields/Education'
import Experience from './UpdateFields/Experience'
import Projects from './UpdateFields/Projects'
import Certifications from './UpdateFields/Certifications'
import Skills from './UpdateFields/Skills'
import { useNavigate } from 'react-router-dom'

const UpdateProfilePage = () => {
  const navigate = useNavigate()
const handleExit = ()=>{
  navigate("/dashboard")
}

  return (
    <div className='update-page'>
      <div className="section-header update-header">
        <header>UPDATE PROFILE </header>
        <button className='save-btn exit' onClick={handleExit}>Exit</button>
        </div>
      <CreateAboutSection />
      <Education update={true} />
      <Experience update={true} />
      <Projects update={true}/>
      <Certifications update={true}/>
      <Skills update={true} />
    </div>
  )
}

export default UpdateProfilePage
