import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext";
import axios from "axios";
const Navbar = () => {
  const navigate = useNavigate();
  const { isLogin ,handleupdateStatus ,userdata} = useAppContext();
  const [data,setData] = useState()
  useEffect(()=>{
    if( data!== null&& isLogin)
      {
        const id = userdata._id
        const url = `http://localhost:5000/about/${id}`
        axios.get(url)
        .then((res)=>{
          setProfileImg(res.data.imageurl)
        })
      }
  })

  const [profileImg , setProfileImg] = useState("")

  const handleShowTemplatesBtnClick = () => {
    navigate("/templates");
  };
  const handleDropdown = () => {
    const dropdownElement = document.getElementById("dropdown");
    if (dropdownElement.style.visibility === "collapse") {
      dropdownElement.style.visibility = "visible";
    } else {
      dropdownElement.style.visibility = "collapse";
    }
  };
  const handleUpdateProfile = () => {
    handleupdateStatus(true)
    navigate("/update");
  };
  const handleCreateProfile = ()=>{
    navigate("/createprofile")
  }
  return (
    <div className="navbar">
      <div className="logo left">
        <Logo />
      </div>
      {isLogin ? (
        <div className="right">
        <div className="btn">
          <button onClick={handleCreateProfile}>Create Profile</button>
        </div>
        <div className="btn">
          <button onClick={handleShowTemplatesBtnClick}>Templates</button>
        </div>
        <div className="profile">
          <img src={profileImg} onClick={handleDropdown} alt="Profile" />
        </div>
        <div id="dropdown" className="dropdown" onClick={handleUpdateProfile}>
          <i class="fa-solid fa-user-pen"></i> Update Profile
        </div>
      </div>
      ):(
        " "
      )}
    </div>
  );
};

export default Navbar;
