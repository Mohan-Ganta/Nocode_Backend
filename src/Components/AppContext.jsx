import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookies";
const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const setCookie = (token) => {
    Cookies.set("name", token, { expires: 10 });
  }; 

  const handleupdateStatus = (val)=>{
    setIsUpdate(val)
  }
  const [isUpdate ,setIsUpdate] = useState(false)
  const [userdata, setUserdata] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const handleLoginUser = (data) => {
    console.log(data);
    setUserdata(data);
    setIsLogin(true);
  };


  //Education Details
  const [educationDetails, setEducationDetails] = useState([]);
  const addEducationDetails = (elem) => {
    setEducationDetails([...educationDetails, elem]);
  };

  useEffect(() => {
    const id = userdata._id;
    const url = `http://localhost:5000/education/${id}`;
    try {
      if (educationDetails.length < 1 && isLogin && isUpdate) {
        axios
          .get(url)
          .then((response) => {
            setEducationDetails(response.data);
          })
          .catch((err) => {
            console.log("error" + err);
          });
        console.log("education details" + educationDetails);
      }
    } catch (err) {
      console.log("error" + err);
    }
  });

  //Experience Details
  const [experienceDetails, setExperienceDetails] = useState([]);
  const addExperienceDetails = (elem) => {
    setExperienceDetails([...experienceDetails, elem]);
  };
  useEffect(() => {
    const id = userdata._id;
    const url = `http://localhost:5000/experience/${id}`;
    try {
      if (experienceDetails.length < 1 && isLogin && isUpdate) {
        axios
          .get(url)
          .then((response) => {
            setExperienceDetails(response.data);
          })
          .catch((err) => {
            console.log("error" + err);
          });
        console.log("the experienceDetails:" + experienceDetails);
      }
    } catch (err) {
      console.log("error" + err);
    }
  });

  //Projects Details
  const [projectData, setProjectData] = useState([]);
  const addProjectData = (elem) => {
    setProjectData([...projectData, elem]);
  };
  useEffect(() => {
    const id = userdata._id;
    const url = `http://localhost:5000/projects/${id}`;
    try {
      if (isLogin && projectData.length < 1 && isUpdate) {
        axios
          .get(url)
          .then((res) => {
            setProjectData(res.data);
          })
          .catch((err) => console.log(err));
      }
    } catch (err) {
      console.log("some error");
    }
  });

  //Certification Data
  const [certificationData, setCertificationData] = useState([]);
  const addCertificationData = (elem) => {
    setCertificationData([...certificationData, elem]);
  };
  useEffect(() => {
    const id = userdata._id;
    const url = `http://localhost:5000/certificates/${id}`;
    try {
      if (isLogin && certificationData.length < 1  && isUpdate) {
        axios
          .get(url)
          .then((res) => {
            setCertificationData(res.data);
          })
          .catch((err) => console.log("error" + err));
      }
    } catch (err) {
      console.log("err");
    }
  });

  //skills data
  const [skillData, setSkillData] = useState([]);
  const addSkillData = (elem) => {
    setSkillData([...skillData, elem]);
  };
  useEffect(() => {
    const id = userdata._id;
    const url = `http://localhost:5000/skills/${id}`;
    try {
      if (isLogin && skillData.length < 1 && isUpdate) {
        axios
          .get(url)
          .then((res) => setSkillData(res.data))
          .catch((err) => console.log("error"));
      }
    } catch (err) {
      console.log("error" + err);
    }
  });

  return (
    <AppContext.Provider
      value={{
        userdata,
        isLogin,
        handleLoginUser,
        educationDetails,
        addEducationDetails,
        experienceDetails,
        addExperienceDetails,
        projectData,
        addProjectData,
        certificationData,
        addCertificationData,
        skillData,
        addSkillData,
        handleupdateStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
