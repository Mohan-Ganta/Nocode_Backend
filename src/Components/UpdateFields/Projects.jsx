import React, { useEffect, useState } from 'react'
import { useAppContext } from '../AppContext';
import axios from 'axios'
import Swal from 'sweetalert2';
const ProjectsTab = ({index,item,onRemove}) => {
  const [pname,setPname] = useState(item.name)
  const [link,setLink] = useState(item.link)
  const [desc,setDesc] = useState(item.description)

  useEffect(()=>{
    item['name'] = pname
    item['link'] = link
    item['description'] = desc
  },[pname,link,desc])
    return(
      <>
      <form className="form-tab">
      <div className="row">
        <div className="form-ele">
          <div className="label">Project Title</div>
          <div className="field">
            <input type="text" required={true} value={pname} onChange={e=>setPname(e.target.value)} />
          </div>
        </div>
        <div className="form-ele">
          <div className="label">Project Link</div>
          <div className="field">
            <input type="text" value={link} onChange={e=>setLink(e.target.value)}/>
          </div>
        </div>
        <div className="form-ele">
          <div className="label">Project Description</div>
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

  
const Projects = ({update}) => {

  const {userdata ,isLogin } = useAppContext()
  const [projectData, setProjectData] = useState([]);
  const addProjectData = (elem) => {
    setProjectData([...projectData, elem]);
  };
  useEffect(() => {
    const id = localStorage.getItem("userid");
    const url = `${process.env.REACT_APP_PRO_URL}/${id}`;
    try {
      if (isLogin && projectData.length < 1 ) {
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

    const [projects, setProjects] = useState([
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
            addProjectData(elem)
          }
          else{
            const elem = {
              "name":"",
              "link":"",
              "description":""
            }
        
            setProjects([...projects,elem])
          }
      }
    
      const handleRemoveItem = (index)=>{
        const list = [...projects]
        list.splice(index,1)
        setProjects(list)
      }
      const handleSaveDetails = ()=>{
        console.log(projects)
        if(update)
          {
            for(var i=0;i<projectData.length;i++)
              {
                if("_id" in projectData[i])
                  {
                    const id = projectData[i]._id 
                    const url = `${process.env.REACT_APP_PRO_URL}/update/${id}`
                    axios.post(url,projectData[i])
                    .then(res=>{console.log(res.data)})
                    .catch(err=>console.log(err))
                  }
                  else{
                    const id = userdata._id 
                    const url = `${process.env.REACT_APP_PRO_URL}/add/${id}`
                    axios.post(url,projectData[i])
                    .then(res=>{console.log("lakjashfkajghfgd"+res.data)})
                    .catch(err=>console.log("............errorrrrr"+err))
                  }
              }
              Swal.fire({
                title:"success",
                text :"Updated Successfully",
                icon:"success"
              })
          }
          else{
            const id = userdata._id 
            const url = `${process.env.REACT_APP_PRO_URL}/add/${id}`
            for(var i=0 ; i<projects.length ;i++)
              {
                axios.post(url,projects[i])
                .then(res=>console.log(res.data))
                .catch(err=>console.log(err))
              }
              Swal.fire({
                title  : "success",
                text : "Data Added successfully",
                icon : "success"
              })
          }
      }
    
      return (
        <div>
          <div>
            <div className="section-tab">
              <header className="section-header">PROJECTS SECTION</header>
              {update ? (
                <div className="education-container">
                {projectData.map((item, index) => {
                  return(<ProjectsTab index={index} item={item} onRemove={handleRemoveItem}/>)
                })}
              </div>
              ):(
                <div className="education-container">
                {projects.map((item, index) => {
                  return(<ProjectsTab index={index} item={item} onRemove={handleRemoveItem}/>)
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

export default Projects
