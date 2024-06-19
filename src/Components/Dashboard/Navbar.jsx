import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext";
import axios from "axios";
const Navbar = () => {
  const navigate = useNavigate();
  const { isLogin, handleupdateStatus, userdata, handleLogout,hasProifile } =
    useAppContext();
  const [show, setShow] = useState(false);
  const [data, setData] = useState();
  useEffect(() => {
    if (data !== null && isLogin) {
      const id = userdata._id;
      const url = `${process.env.REACT_APP_ABOUT_URL}/${id}`;
      axios.get(url).then((res) => {
        setProfileImg(res.data?.imageurl);
      });
    }
  });

  const [profileImg, setProfileImg] = useState("");

  const handleShowTemplatesBtnClick = () => {
    navigate("/templates");
  };
  const handleDropdown = () => {
    setShow((val) => !val);
  };
  const handleUpdateProfile = () => {
    handleupdateStatus(true);
    navigate("/update");
  };
  const handleCreateProfile = () => {
    navigate("/createprofile");
  };
  return (
    <div className="navbar">
      <div className="logo left">
        <Logo />
      </div>
      {isLogin ? (
        <div className="right">
          {hasProifile && (<div className="btn">
            <button onClick={handleCreateProfile}>Create Profile</button>
          </div>)}
          <div className="btn">
            <button onClick={handleShowTemplatesBtnClick}>Templates</button>
          </div>
          <div className="btn">
            <button onClick={handleLogout}>Logout</button>
          </div>

          <div className="profile">
            <img src={profileImg} onClick={handleDropdown} alt="Profile" />
          </div>
          {show && (
            <div
              id="dropdown"
              className="dropdown"
              onClick={handleUpdateProfile}
            >
              <i class="fa-solid fa-user-pen"></i> Update Profile
            </div>
          )}
        </div>
      ) : (
        " "
      )}
    </div>
  );
};

export default Navbar;
