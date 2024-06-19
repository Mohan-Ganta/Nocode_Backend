import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "../Footer"
import './Dashboard.css'
import img1 from "../../assets/templates/template1.jpg";
import img2 from "../../assets/templates/template2.jpg";
import img3 from "../../assets/templates/template3.jpg";
import { useAppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const {userdata,isLogin} = useAppContext()
  const navigate = useNavigate()
  const handleClickTemplate = ()=>{
    navigate("/template1")
  }
  return (
    <>
    {isLogin ? (
      <div>
      <Navbar />
      <div className="dashboard-container">
        <header>
          <span className="header-text">Welcome</span> {userdata.username}{" "}
          <span className="header-text">To NoCode Portfolio</span>
        </header>
        <div className="templates">
          <img className="template" src={img1} alt="template img"  onClick={handleClickTemplate} />
          <img className="template" src={img2} alt="template img" onClick={handleClickTemplate} />
          <img className="template" src={img3} alt="template img" onClick={handleClickTemplate} />
        </div>
      </div>
    </div>
    ):(
      "Unauthorised Access"
    )}
    <Footer />
    </>
  );
};

export default Dashboard;
