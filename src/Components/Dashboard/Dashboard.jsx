import React, { useState } from "react";
import Navbar from "./Navbar";
import img1 from "../../assets/templates/template1.jpg";
import img2 from "../../assets/templates/template2.jpg";
import img3 from "../../assets/templates/template3.jpg";
import { useAppContext } from "../AppContext";
const Dashboard = () => {
  const {userdata,isLogin} = useAppContext()
  return (
    <>
    {isLogin ? (
      <div>
      <Navbar />
      <div className="container">
        <header>
          <span className="header-text">Welcome</span> {userdata.username}{" "}
          <span className="header-text">To NoCode Portfolio</span>
        </header>
        <div className="templates">
          <img className="template" src={img1} alt="template img" />
          <img className="template" src={img2} alt="template img" />
          <img className="template" src={img3} alt="template img" />
        </div>
      </div>
    </div>
    ):(
      "Unauthorised Access"
    )}
    </>
  );
};

export default Dashboard;
