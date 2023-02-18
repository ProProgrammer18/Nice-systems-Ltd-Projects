import React from "react";
import { useState } from "react";
import axios from "axios";
import "./UploadFile.css";
import { useNavigate } from "react-router-dom";

const UploadFile = () => {
  const [file, setFile] = useState(""); // storing the uploaded file
  const navigate = useNavigate();
  const SubmitButton = async () => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("data", file);
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
          <h2 id="headerTitle">Upload your File</h2>
          <div>
            <div className="row">
              <label>Select Customer Name</label>
              <select className="dropdown">
                <option value="select">Select</option>
                <option value="customer1">Customer1</option>
                <option value="customer2">Customer2</option>
                <option value="customer3">Customer3</option>
                <option value="customer4">Customer4</option>
              </select>
              <br />
              <label>Select your File</label>
              <input
                type="file"
                placeholder=""
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            
            <div id="button" className="row">
              <button onClick={SubmitButton}>Submit</button>
              <br />
              <button onClick={() => navigate("/date")}>Show Graph</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadFile;
