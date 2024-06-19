import React, { useEffect, useState } from 'react'
import { useAppContext } from '../AppContext';
import axios from 'axios'
import Swal from 'sweetalert2';

const CertificationTab = ({index,item,onRemove}) => {
  const [name,setName] = useState(item.name)
  const [link,setLink] = useState(item.link)
  const [desc,setDesc] = useState(item.description)

  useEffect(()=>{
    item['name'] = name
    item['link'] = link
    item['description'] = desc
  },[name,link,desc])
    return(
      <>
      <form className="form-tab">
      <div className="row">
        <div className="form-ele">
          <div className="label">Certification Title</div>
          <div className="field">
            <input type="text" required={true} value={name} onChange={e=>setName(e.target.value)}  />
          </div>
        </div>
        <div className="form-ele">
          <div className="label">Public URL</div>
          <div className="field">
            <input type="text" required={true} value={link} onChange={e=>setLink(e.target.value)} />
          </div>
        </div>
        <div className="form-ele">
          <div className="label">Description</div>
          <div className="field">
            <input type="text" required={true} value={desc} onChange={e=>setDesc(e.target.value)}/>
          </div>
        </div>
      </div>
    </form>
    <button className="remove-btn btn " onClick={(index)=>onRemove(index)}><i class="fa-regular fa-square-minus"></i></button>
    </>
    )
  };


const Certifications = ({update}) => {
  const {userdata , isLogin} = useAppContext()
  const [certificationData, setCertificationData] = useState([]);
  const addCertificationData = (elem) => {
    setCertificationData([...certificationData, elem]);
  };
  useEffect(() => {
    const id = localStorage.getItem("userid");
    const url = `${process.env.REACT_APP_CERT_URL}/${id}`;
    try {
      if (isLogin && certificationData.length < 1 ) {
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

    const [certification, setCertification] = useState([
        {
            "name":"",
            "link":"",
            "description":""
          },
      ]);
    
      const handleAddEducationSection = ()=>{
       if(update)
        {
          const elem = {
            "name":"",
            "link":"",
            "description":""
          }
        addCertificationData(elem)
        }
        else{
          const elem = {
            "name":"",
            "link":"",
            "description":""
          }
        setCertification([...certification,elem])
        }
      }
    
      const handleRemoveItem = (index)=>{
        const list = [...certification]
        list.splice(index,1)
        setCertification(list)
      }
      const handleSaveDetails = ()=>{
        console.log(certification)
        if(update)
          {
            for(var i =0 ;i<certificationData.length ; i++)
              {
                if("_id" in certificationData[i])
                  {
                    const id = certificationData[i]._id
                    const url = `${process.env.REACT_APP_CERT_URL}/update/${id}`
                    axios.post(url,certificationData[i])
                    .then(res=>console.log(res.data))
                    .catch(err=>console.log(err))
                  }
                  else{
                    const id = userdata._id
                    const url = `${process.env.REACT_APP_CERT_URL}/add/${id}`
                    axios.post(url,certificationData[i])
                    .then(res=>console.log(res.json))
                    .catch(err=>console.log(err))
                  }
                  Swal.fire({
                    title:"success",
                    text :"Updated Successfully",
                    icon:"success"
                  })
              }
          }
          else{
            const id = userdata._id 
            const url = `${process.env.REACT_APP_CERT_URL}/add/${id}`
            for(var i=0;i<certification.length;i++)
              {
                axios.post(url,certification[i])
                .then(res=>console.log(res))
                .catch(err=>{console.log("error"+err)})
              }
              Swal.fire({
                title:"success",
                text :"Saved Successfully",
                icon:"success"
              })
          }
      }
    
      return (
        <div>
          <div>
            <div className="section-tab">
              <header className="section-header">CERTIFICATIONS SECTION</header>
              {update ? (
                <div className="education-container">
                {certificationData.map((item, index) => {
                  return(<CertificationTab index={index} item={item} onRemove={handleRemoveItem}/>)
                })}
              </div>
              ):(
                <div className="education-container">
                {certification.map((item, index) => {
                  return(<CertificationTab index={index} item={item} onRemove={handleRemoveItem}/>)
                })}
              </div>
              )}
              <button className="btn add-section-btn" onClick={handleAddEducationSection}><i class="fa-regular fa-square-plus"></i></button>
              <button className="add-section-btn save-btn" onClick={handleSaveDetails}>Save</button>
            </div>
          </div>
        </div>
      );
    };


export default Certifications
