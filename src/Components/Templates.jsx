import React from 'react'
import img1 from "../assets/templates/template1.jpg";
import img2 from "../assets/templates/template2.jpg";
import img3 from "../assets/templates/template3.jpg";
import Navbar from './Dashboard/Navbar';
const Templates = () => {
  return (
    <div>
      <Navbar />
      <div className="templates">
          <img className="template" src={img1} alt="template img" />
          <img className="template" src={img2} alt="template img" />
          <img className="template" src={img3} alt="template img" />
        </div><div className="templates">
          <img className="template" src={img1} alt="template img" />
          <img className="template" src={img2} alt="template img" />
          <img className="template" src={img3} alt="template img" />
        </div><div className="templates">
          <img className="template" src={img1} alt="template img" />
          <img className="template" src={img2} alt="template img" />
          <img className="template" src={img3} alt="template img" />
        </div><div className="templates">
          <img className="template" src={img1} alt="template img" />
          <img className="template" src={img2} alt="template img" />
          <img className="template" src={img3} alt="template img" />
        </div>
    </div>
  )
}

export default Templates
