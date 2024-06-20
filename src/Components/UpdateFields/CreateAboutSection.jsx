import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "../AppContext";
const CreateAboutSection = () => {
  //AboutUser details
  const { userdata } = useAppContext();

  const [imageurl, setImageUrl] = useState("");
  const [savedata, setSaveData] = useState();

  useEffect(() => {
    const id = userdata._id;
    const url = `${process.env.REACT_APP_BASE_URL}/about/${id}`;
    if (!savedata) {
      axios
        .get(url)
        .then((res) => {
          setSaveData(res.data);
        })
        .catch((err) => console.log("error" + err));    
      console.log()
    }
  });
  const [firstName, setFirstName] = useState();
  const [middleName, setMiddleName] = useState();
  const [lastName, setLastName] = useState();
  const [profileImg, setProfileImg] = useState();
  const [designation, setDesignation] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [summary, setSummary] = useState();
  useEffect(() => {
    const data = {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      imageUrl: imageurl,
      designation: designation,
      address: address,
      email: email,
      phoneNo: phoneNo,
      description: summary,
    };
    if (imageurl !== "") {
      console.log(data);
      setSaveData(data);
    }
  }, [imageurl]);

  const handleImageUpload = async (e) => {
    setProfileImg(e.target.files[0]);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", profileImg);
    formData.append("description", summary);
    axios.defaults.baseURL = "http://localhost:5000/upload";
    await axios
      .post("/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setImageUrl(res.data.image_url);
        return res.data.image_url;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSaveDetails = async () => {
    const result = await uploadImage();
    if (savedata !== null) {
      const id = savedata._id;
      const url = `${process.env.REACT_APP_BASE_URL}/about/update/${id}`;
      axios
        .post(url, savedata)
        .then((res) => {
          Swal.fire({
            title: "Success",
            text: res.data,
            icon: "success",
          });
        })
        .catch((err) => {
          console.log("not working error uploading thedata" + err);
        });
    } else {
      console.log("not working");
    }
  };
  return (
    <>
      {savedata ? (
        <div>
          <div>
            <div className="section-tab">
              <header className="section-header">ABOUT SECTION</header>
              <div className="about-container">
                <form className="form-tab">
                  <div className="row">
                    <div className="form-ele">
                      <div className="label">FirstName</div>
                      <div className="field">
                        <input
                          type="text"
                          value={savedata.firstName}
                          required={true}
                          onChange={(e) => {
                            setFirstName(e.target.value);
                          }}
                          placeholder="e.g. Kotesh"
                        />
                      </div>
                    </div>
                    <div className="form-ele">
                      <div className="label">Middle Name</div>
                      <div className="field">
                        <input
                          type="text"
                          value={savedata.middleName}
                          onChange={(e) => setMiddleName(e.target.value)}
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                    <div className="form-ele">
                      <div className="label">LastName</div>
                      <div className="field">
                        <input
                          type="text"
                          value={savedata.lastName}
                          required={true}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="e.g. Pakeeri"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-ele">
                      <div className="label">Your Image</div>
                      <div className="field">
                        <input
                          type="file"
                          required={true}
                          onChange={handleImageUpload}
                          accept="image/*"
                        />
                      </div>
                    </div>
                    <div className="form-ele">
                      <div className="label">Designation</div>
                      <div className="field">
                        <input
                          type="text"
                          required={true}
                          value={savedata.designation}
                          onChange={(e) => {
                            setDesignation(e.target.value);
                          }}
                          placeholder="Software Engineer"
                        />
                      </div>
                    </div>
                    <div className="form-ele">
                      <div className="label">Address</div>
                      <div className="field">
                        <input
                          type="text"
                          required={true}
                          value={savedata.address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="e.g. Chennai"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-ele">
                      <div className="label">Email</div>
                      <div className="field">
                        <input
                          type="text"
                          required={true}
                          value={savedata.email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. ABCD@gmail.com"
                        />
                      </div>
                    </div>
                    <div className="form-ele">
                      <div className="label">Phone No:</div>
                      <div className="field">
                        <input
                          type="text"
                          required={true}
                          value={savedata.phoneNo}
                          onChange={(e) => setPhoneNo(e.target.value)}
                          placeholder="+91 xxxxxxxxxx"
                        />
                      </div>
                    </div>
                    <div className="form-ele">
                      <div className="label">Summary</div>
                      <div className="field">
                        <input
                          type="text"
                          required={true}
                          value={savedata.description}
                          onChange={(e) => setSummary(e.target.value)}
                          placeholder="e.g. Summary"
                        />
                      </div>
                    </div>
                  </div>
                </form>
                <button className="about-save-btn" onClick={handleSaveDetails}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        " "
      )}
    </>
  );
};

export default CreateAboutSection;
