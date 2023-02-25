import React from "react";
import { useState } from "react";
import axios from "axios";
import "./UploadFile.css";
// import { useNavigate } from "react-router-dom";

const UploadFile = () => {
  const [file, setFile] = useState(""); // storing the uploaded file
  const [companyName, setCompanyName] = useState("Nice"); 
  // const navigate = useNavigate();
  const SubmitButton = async () => {
    try {
      if (file && companyName) {
       
        const formData = new FormData();
        formData.append("data", file);
        formData.append("companyName", companyName);
        // setCompanyName("");
        const res = await axios.post("http://localhost:5000/insert", formData);
        if (res.status === 201) {
          alert("File Uploaded Successfully");
        } else if (res.status === 200) {
          alert("File already exists");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <div id="loginform">
          {/* <h2 id="headerTitle">Upload your File</h2> */}
          <div>
            <div className="row" >
              <label style={{fontWeight:'bold', color:'black'}}>Enter Company Name</label>
              {/* <select className="dropdown" value={companyName} onChange={(e) => setCompanyName(e.target.value)}>
                <option value={companyName} onChange={(e) => setCompanyName(e.target.value)}>Select</option >
                <option value={companyName} onChange={(e) => setCompanyName(e.target.value)}>Customer1</option >
                <option value={companyName} onChange={(e) => setCompanyName(e.target.value)}>Customer2</option>
                <option value={companyName} onChange={(e) => setCompanyName(e.target.value)}>Customer3</option>
                <option value={companyName} onChange={(e) => setCompanyName(e.target.value)}>Customer4</option> 
              </select > */}
              <input type="text" placeholder="" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
              <br />
              <label style={{fontWeight:'bold', color:'black'}}>Select your File</label>
              <input
                type="file"
                placeholder=""
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            
            <div id="button" className="row">
              <button onClick={SubmitButton}>Upload</button>
              <br />
              {/* <button onClick={() => navigate("/date")}>Show Graph</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadFile;
