import React from "react";
import { useState } from "react";
import axios from "axios";
import "./UploadFile.css";
import {useNavigate} from 'react-router-dom';



const UploadFile = () => {
  const [file, setFile] = useState(""); // storing the uploaded file
  const navigate = useNavigate();
  const SubmitButton = async () => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("data", file);
        const res = await axios.post("http://localhost:5000/insert", formData);
        if (res.status === 200) {
          alert("File Uploaded Successfully");
        } else if (res.status === 201) {
          alert("File already exists");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form action="#">
        <div id="loginform">
          <h2 id="headerTitle">Upload your File</h2>
          <div>
            <div className="row">
              <input
                type="file"
                placeholder="Upload your file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div id="button" className="row">
              <button onClick={SubmitButton}>Submit</button>
              <br />
              <button onClick={()=>navigate("/date")}>Show Graph</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default UploadFile;
