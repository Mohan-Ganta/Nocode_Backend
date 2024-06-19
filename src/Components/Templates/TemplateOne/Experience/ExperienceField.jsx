import React, { useEffect, useState } from 'react'
import '../Education/Education.css'
import axios from 'axios'
import { useAppContext } from '../../../AppContext'
const ExperieceTab = (item)=>{
    return(
        <div className="edu-tab">
            <div className="title">
              {item.item.title}
            </div>
            <div className="content">
                <p>{item.item.company} , {item.item.city}</p>
                <p>{item.item.startDate} - {item.item.endDate}</p>
            </div>
        </div>
    )
}
const ExperienceField = () => {
  const [expdata, setExpData] = useState([]);
  const id = localStorage.getItem("userid");
  useEffect(() => {
    const url = `${process.env.REACT_APP_EX_URL}/${id}`;
    console.log(url)
    try {
      if (expdata.length < 1) {
        axios
          .get(url)
          .then((response) => {
            setExpData(response.data);
            console.log(response.data)
          })
          .catch((err) => {
            console.log("error" + err);
          });
      }
    } catch (err) {
      console.log("error" + err);
    }
  });

  return (
    <div>
      {expdata ? (
        <div className="edu-container">
          {expdata.map((item,index)=>{
            return <ExperieceTab item={item} key={index} />
          })}
        </div>
      ):("loading......")}
    </div>
  )
}

export default ExperienceField
