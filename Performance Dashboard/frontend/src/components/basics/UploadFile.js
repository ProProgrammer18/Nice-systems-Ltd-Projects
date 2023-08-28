import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import '../../assets/UploadFile.css'


function useOutsideAlerter(ref) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        document.getElementById("loginform").style.display = "";
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}


const UploadFile = () => {
  const [file, setFile] = useState(""); // storing the uploaded file
  const [companyName, setCompanyName] = useState(""); //Nice
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
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
        if (res.status == 200 || res.status == 201) {
            document.getElementById("loginform").style.display = "";
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <div id="loginform" ref={wrapperRef}>
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
