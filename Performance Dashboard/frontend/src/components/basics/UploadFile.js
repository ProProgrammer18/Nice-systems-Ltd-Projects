import React from "react";
import { useState } from "react";
import axios from "axios";
import '../../assets/UploadFile.css'

const UploadFile = () => {
  const [file, setFile] = useState(""); // storing the uploaded file
  const [companyName, setCompanyName] = useState(""); //Nice
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
          <div>
            <div className="row" >
              <label style={{ fontWeight: 'bold', color: 'black' }}>Enter Company Name</label>
              <input 
              type="text" 
              placeholder="" 
              value={companyName} onChange={(e) => setCompanyName(e.target.value)} 
              />
              <br />
              <label style={{ fontWeight: 'bold', color: 'black' }}>Select your File</label>
              <input
                type="file"
                placeholder=""
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div id="button" className="row">
              <button onClick={SubmitButton}>Upload</button>
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadFile;
