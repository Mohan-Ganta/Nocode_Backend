import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookies";
import { useNavigate } from "react-router-dom";
const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const handleupdateStatus = (val) => {
    setIsUpdate(val);
  };
  const [isUpdate, setIsUpdate] = useState(false);
  const [userdata, setUserdata] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [currentUserId, setCurrentUserId] = useState();
  const [isCreated , setIsCreated] = useState(false)
  const [hasProfile,setHasProfile] = useState(false)


  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.getItem("authToken");
    const currentUserdata = localStorage.getItem("userdata");
    if (token) setIsLogin(true);
    const url = `${process.env.REACT_APP_USER_URL}/${localStorage.getItem("userid")}`;
    axios
      .get(url)
      .then((res) => setUserdata(res.data))
      .catch((err) => console.log("error" + err));
  });


  const handleLoginUser = (data) => {
    setUserdata(data);
    setCurrentUserId(data._id);
    setHasProfile(data.hasProfile);
    localStorage.setItem("userid", data._id);
    Cookies.setItem("authToken", "pwd123456!@3", { expires: 1 });
  };

  const handleLogout = () => {
    Cookies.removeItem("authToken");
    localStorage.removeItem("userid");
    setIsLogin(false);
    navigate("/");
  };

  const handleCreateFormState = (val)=>{
    setIsCreated(val)
  }

  //data for templates

  const [educationDetailsForTemplate,setEducationDetailsForTemplate] = useState()
  const getEducationDetailsForTemplate = ()=>{
    const url = `${process.env.REACT_APP_ED_URL}/${userdata._id}`;
    axios
          .get(url)
          .then((response) => {
            setEducationDetailsForTemplate(response.data);
          })
          .catch((err) => {
            console.log("error" + err);
          });
        console.log("the educationDetailsforTemplate:" + educationDetailsForTemplate);
  }

  const [experienceDataForTemplates,setExperienceDataForTemplates] = useState()
  const getExperienceDataForTemplates = ()=>{
    const url = `${process.env.REACT_APP_EX_URL}/${userdata._id}`;
    axios
          .get(url)
          .then((response) => {
            setExperienceDataForTemplates(response.data);
          })
          .catch((err) => {
            console.log("error" + err);
          });
        console.log("the experienceDetails:" + experienceDataForTemplates);
  }

  return (
    <AppContext.Provider
      value={{
        userdata,
        isLogin,
        handleLoginUser,
        handleupdateStatus,
        handleLogout,
        currentUserId,
        handleCreateFormState,
        hasProfile,
        experienceDataForTemplates,
        getExperienceDataForTemplates,
        educationDetailsForTemplate,
        getEducationDetailsForTemplate
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
