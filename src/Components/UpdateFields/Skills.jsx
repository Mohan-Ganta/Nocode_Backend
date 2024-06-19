import React, { useEffect, useState } from "react";
import { useAppContext } from "../AppContext";
import axios from "axios";
import Swal from "sweetalert2";

const SkillsTab = ({ index, item, onRemove, len }) => {
  const [skill, SetSkill] = useState(item.skill);
  useEffect(() => {
    item["skill"] = skill;
  }, [skill]);

  return (
    <>
      {len > 0 ? (
        <>
          <form className="form-tab">
            <div className="row">
              <div className="form-ele">
                <div className="label">Skill</div>
                <div className="skill-field">
                  <input
                    type="text"
                    required={true}
                    value={skill}
                    onChange={(e) => SetSkill(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </form>
          <button
            className="remove-btn btn "
            onClick={(index) => onRemove(index)}
          >
            <i class="fa-regular fa-square-minus"></i>
          </button>
        </>
      ) : (
        <h4>No Data Found</h4>
      )}
    </>
  );
};

const Skills = ({ update }) => {
  const { isLogin ,userdata} = useAppContext();
  const [skillData, setSkillData] = useState([]);
  const addSkillData = (elem) => {
    setSkillData([...skillData, elem]);
  };
  useEffect(() => {
    const id = localStorage.getItem("userid");
    const url = `${process.env.REACT_APP_SKILLS_URL}/${id}`;
    try {
      if (isLogin && skillData.length < 1) {
        axios
          .get(url)
          .then((res) => setSkillData(res.data))
          .catch((err) => console.log("error"));
      }
    } catch (err) {
      console.log("error" + err);
    }
  });
  const [skills, setSkills] = useState([
    {
      skill: "",
    },
  ]);
  const handleSaveDetails = () => {
    console.log(skills);
    if (update) {
      for (var i = 0; i < skillData.length; i++) {
        if ("_id" in skillData[i]) {
          const id = skillData[i]._id;
          const url = `${process.env.REACT_APP_SKILLS_URL}/update/${id}`;

          axios
            .post(url, skillData[i])
            .then((res) => console.log(res.data))
            .catch((err) => {
              console.log(err);
            });
        } else {
          const id = userdata._id;
          const url = `${process.env.REACT_APP_SKILLS_URL}/add/${id}`;
          axios
            .post(url, skillData[i])
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));
        }
      }
      Swal.fire({
        title: "success",
        text: "Updated Successfully",
        icon: "success",
      });
    } else {
      const id = userdata._id;
      const url = `${process.env.REACT_APP_SKILLS_URL}/add/${id}`;

      for (var i = 0; i < skills.length; i++) {
        axios
          .post(url, skills[i])
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      }
      Swal.fire({
        title: "success",
        text: "Saved Successfully",
        icon: "success",
      });
    }
  };
  const handleAddEducationSection = () => {
    if (update) {
      const elem = {
        skill: "",
      };

      addSkillData(elem);
    } else {
      const elem = {
        skill: "",
      };

      setSkills([...skills, elem]);
    }
  };

  const handleRemoveItem = (index) => {
    const list = [...skills];
    list.splice(index, 1);
    setSkills(list);
  };

  return (
    <div>
      <div>
        <div className="section-tab">
          <header className="section-header">SKILLS SECTION</header>
          {update ? (
            <div className="education-container">
              {skillData.map((item, index) => {
                return (
                  <SkillsTab
                    len={skillData.length}
                    index={index}
                    item={item}
                    onRemove={handleRemoveItem}
                  />
                );
              })}
            </div>
          ) : (
            <div className="education-container">
              {skills.map((item, index) => {
                return (
                  <SkillsTab
                    index={index}
                    item={item}
                    len = {skills.length}
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

export default Skills;
