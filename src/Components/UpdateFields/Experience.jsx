import React, { useEffect, useState } from "react";
import { useAppContext } from "../AppContext";
import axios from "axios";
import Swal from "sweetalert2";
const ExperienceTab = ({ index, item, onRemove }) => {
  const [title, setTitle] = useState(item.title);
  const [company, setCompany] = useState(item.company);
  const [city, setCity] = useState(item.city);
  const [startDate, setStartDate] = useState(item.startDate);
  const [endDate, setEndDate] = useState(item.endDate);
  const [desc, setDesc] = useState(item.description);

  useEffect(() => {
    item["title"] = title;
    item["company"] = company;
    item["city"] = city;
    item["startDate"] = startDate;
    item["endDate"] = endDate;
    item["description"] = desc;
  }, [title, company, city, startDate, endDate, desc]);
  return (
    <>
      <form className="form-tab">
        <div className="row">
          <div className="form-ele">
            <div className="label">Title</div>
            <div className="field">
              <input
                type="text"
                required={true}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="form-ele">
            <div className="label">Company/Organisation</div>
            <div className="field">
              <input
                type="text"
                required={true}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
          </div>
          <div className="form-ele">
            <div className="label">Location</div>
            <div className="field">
              <input
                type="text"
                required={true}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="form-ele">
            <div className="label">Start Date</div>
            <div className="field">
              <input
                type="text"
                required={true}
                value={startDate}
                placeholder="mm/dd/yyyy"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>
          <div className="form-ele">
            <div className="label">End Date</div>
            <div className="field">
              <input
                type="text"
                required={true}
                value={endDate}
                placeholder="mm/dd/yyyy"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <div className="form-ele">
            <div className="label">Description</div>
            <div className="field">
              <input
                type="text"
                required={true}
                value={desc}
                placeholder="e.g. Description"
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
          </div>
        </div>
      </form>
      <button className="remove-btn btn " onClick={(index) => onRemove(index)}>
        <i class="fa-regular fa-square-minus"></i>
      </button>
    </>
  );
};
const Experience = ({ update }) => {
  const {  userdata , isLogin } = useAppContext();
  const [experienceDetails, setExperienceDetails] = useState([]);
  const addExperienceDetails = (elem) => {
    setExperienceDetails([...experienceDetails, elem]);
  };
  useEffect(() => {
    const id = localStorage.getItem("userid");
    const url = `${process.env.REACT_APP_EX_URL}/${userdata._id}`;
    try {
      if (experienceDetails.length < 1 && isLogin && update ) {
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

  const [experience, setExperience] = useState([
    {
      title: "",
      company: "",
      city: "",
      startDate: "",
      endDate: "",
      summary: "",
    },
  ]);
  const handleSaveDetails = () => {
    if (update) 
      {
      for (var i = 0; i < experienceDetails.length; i++) {
        if ("_id" in experienceDetails[i]) {
          const id = experienceDetails[i]._id;
          const url = `${process.env.REACT_APP_EX_URL}/update/${id}`;
          axios.post(url,experienceDetails[i])
          .then((res)=>{
            
            console.log(res.data)
          })
          .catch(err=>console.log(err))
        }
        else{
          console.log("id not present")
          const id = userdata._id 
          const url = `${process.env.REACT_APP_EX_URL}/add/${id}`
          axios.post(url,experienceDetails[i])
          .then((res)=>console.log(res.data))
          .catch(err=>console.log(err))
        }
        Swal.fire({
          title:"success",
          text :"Updated Successfully",
          icon:"success"
        })
      }
      Swal.fire({
        title: "success",
        text: "Data updated successfully",
        icon: "success",
      });
    } else {
      const id = userdata._id;
      const url = `${process.env.REACT_APP_EX_URL}/add/${id}`;
      for (var i = 0; i < experience.length; i++) {
        axios
          .post(url, experience[i])
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => console.log("error" + err));
      }
      Swal.fire({
        title: "success",
        text: "Data Added successfully",
        icon: "success",
      });
    }
  };
  const handleAddExperienceDetails = () => {
    if (update && experienceDetails.length > 0) {
      const elem = {
        title: "",
        company: "",
        city: "",
        startDate: "",
        endDate: "",
        summary: "",
      };

      addExperienceDetails(elem);
    } else {
      const elem = {
        title: "",
        company: "",
        city: "",
        startDate: "",
        endDate: "",
        summary: "",
      };

      setExperience([...experience, elem]);
    }
  };

  const handleRemoveItem = (index) => {
    const list = [...experience];
    list.splice(index, 1);
    setExperience(list);
  };

  return (
    <div>
      <div>
        <div className="section-tab">
          <header className="section-header">EXPERIENCE SECTION</header>
          {update ? (
            <div className="education-container">
              {experienceDetails.map((item, index) => {
                return (
                  <ExperienceTab
                    index={index}
                    item={item}
                    onRemove={handleRemoveItem}
                  />
                );
              })}
            </div>
          ) : (
            <div className="education-container">
              {experience.map((item, index) => {
                return (
                  <ExperienceTab
                    index={index}
                    item={item}
                    onRemove={handleRemoveItem}
                  />
                );
              })}
            </div>
          )}
          <button
            className="btn add-section-btn"
            onClick={handleAddExperienceDetails}
          >
            <i class="fa-regular fa-square-plus"></i>
          </button>
          <button
            className="add-section-btn save-btn"
            onClick={handleSaveDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Experience;
