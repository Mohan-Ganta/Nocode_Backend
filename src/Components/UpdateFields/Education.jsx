import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "../AppContext";
const EducationTab = ({ index, item, onRemove ,array}) => {
  const [school, setSchool] = useState(item["school"]);
  const [degree, setDegree] = useState(item["degree"]);
  const [city, setCity] = useState(item["city"]);
  const [startDate, setStartDate] = useState(item["startDate"]);
  const [endDate, setEndDate] = useState(item["endDate"]);
  const [description, setDescription] = useState(item["description"]);
  useEffect(() => {
    item["school"] = school;
    item["degree"] = degree;
    item["city"] = city;
    item["startDate"] = startDate;
    item["endDate"] = endDate;
    item["description"] = description;
  }, [school, degree, city, startDate, endDate, description]);
const handleDelete = ()=>{
  onRemove(array.indexOf(item))
  console.log("deleting")
  const url = `http://localhost:5000/education/delete/${item._id}`
  axios.delete(url)
  .then(res=>{
    console.log(res.data)
    
  })
  .catch(err=>console.log("error deleting"+err))
}
  return (
    <>
      <form className="form-tab">
        <div className="row">
          <div className="form-ele">
            <div className="label">School</div>
            <div className="field">
              <input
                type="text"
                required={true}
                value={school}
                onChange={(e) => setSchool(e.target.value)}
              />
            </div>
          </div>
          <div className="form-ele">
            <div className="label">Degree</div>
            <div className="field">
              <input
                type="text"
                value={degree}
                required={true}
                onChange={(e) => setDegree(e.target.value)}
              />
            </div>
          </div>
          <div className="form-ele">
            <div className="label">city</div>
            <div className="field">
              <input
                type="text"
                required={true}
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
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
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="form-ele">
            <div className="label">End Date No:</div>
            <div className="field">
              <input
                type="text"
                required={true}
                placeholder="mm/dd/yyyy"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <div className="form-ele">
            <div className="label">Summary</div>
            <div className="field">
              <input
                type="text"
                required={true}
                value={description}
                placeholder="e.g. Description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </form>
      <button className="remove-btn btn " onClick={handleDelete}>
        <i class="fa-regular fa-square-minus"></i>
      </button>
    </>
  );
};

const Education = ({ update }) => {
  // const {userdata , educationDetails, addEducationDetails } = useAppContext();
  const {isLogin ,userdata} = useAppContext()
  const [educationDetails, setEducationDetails] = useState([]);
  const [isEmpty,setEmpty] = useState(true)
  const addEducationDetails = (elem) => {
    setEducationDetails([...educationDetails, elem]);
  };

  useEffect(() => {
    const id = localStorage.getItem("userid");
    const url = `http://localhost:5000/education/${id}`;
    try {
      if (educationDetails.length < 1 && isLogin) {
        axios
          .get(url)
          .then((response) => {
            setEducationDetails(response.data);
            if(response.data.length===0)
              setEmpty(false)
          })
          .catch((err) => {
            console.log("error" + err);
          });
      }
    } catch (err) {
      console.log("error" + err);
    }
  });
  const [education, setEducation] = useState([
    {
      school: "",
      degree: "",
      citty: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  const handleSaveDetails = () => {
    if (update) {
      console.log(educationDetails);
      for (var i = 0; i < educationDetails.length; i++) {
        if ("_id" in educationDetails[i]) {
          const id = educationDetails[i]._id;
          console.log("id is : " + id);
          const url = `http://localhost:5000/education/update/${id}`;
          axios.post(url, educationDetails[i])
          .then((res) => {
            console.log(res.data);
          })
          .catch((err)=>console.log("error"+err))
        } else {
          const userid = userdata._id
          const url = `http://localhost:5000/education/add/${userid}`
          axios
          .post(url, educationDetails[i])
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log("failed to add data " + err);
          })
        
      .then(()=>{
        Swal.fire({
          title : "Success",
          text : "Updated Succesfully",
          icon :"success"
        })
      })
      .catch((err)=>{
        console.log("error")
      })
    }}
        } else {
      console.log(education);
      const id = userdata._id;
      const url = `${process.env.REACT_APP_EDU_URL}/add/${id}`;
      for (var i = 0; i < education.length; i++) {
        console.log(education[i]);
        console.log(i);
        axios
          .post(url, education[i])
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log("failed to add data " + err);
          })
          .then(() => {
            Swal.fire({
              title: "Success",
              text: "data added succesfully",
              icon: "success",
            });
          })
          .catch((err) => {
            console.log("error" + err);
          });
      }
    }
  };

  const handleAddEducationSection = () => {
    const elem = {
      school: "",
      degree: "",
      city: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    if (update) {
      setEducationDetails([...educationDetails,elem])
    }
    setEducation([...education, elem]);
  };

  const handleRemoveItem = (index) => {
    // if(update)
    //   {
    //     this.forceUpdate(()=>{
    //       console.log("updating")
    //     })
    //   }
        console.log(index)
        const list = [...education];
        console.log(education)
        console.log(list[index])
        // list.splice(index, 1);
        delete list[index]
        setEducation(list);
        console.log(list)
      
      
   
  };

  return (
    <div>
      <div>
        <div className="section-tab">
          <header className="section-header">EDUCATION SECTION</header>
          {update ?   (
            <>
            {isEmpty ? (<div className="education-container">
              {educationDetails.map((item, index) => {
                return (
                  <EducationTab
                    key={item._id}
                    index={index}
                    item={item}
                    array = {[...educationDetails]}
                    onRemove={handleRemoveItem}
                  />
                );
              })}
            </div>) : (
              <div className="education-container">
              {education.map((item, index) => {
                return (
                  <EducationTab
                    key={index}
                    index={index}
                    item={item}
                    array = {[...education]}
                    onRemove={handleRemoveItem}
                  />
                );
              })}
            </div>
            )}
            </>
          ) : (
            <div className="education-container">
              {education.map((item, index) => {
                return (
                  <EducationTab
                    key={index}
                    index={index}
                    item={item}
                    array = {[...education]}
                    onRemove={handleRemoveItem}
                  />
                );
              })}
            </div>
          )}
          <button
            className="btn add-section-btn"
            onClick={handleAddEducationSection}
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

export default Education;
