import React from "react";
import { useState } from 'react'
import Stackbar from "./components/basics/Stackbar";
import UploadFile from './components/basics/UploadFile';
import Date from './components/basics/date';


function App() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [data, setData] = useState("");
  const [companyName, setCompanyName] = useState();

  const submit = () => {
    if (document.getElementById("loginform").style.display === "") {
      document.getElementById("dateform").style.display = "";
      document.getElementById("loginform").style.display = "block";
    }
    else
      document.getElementById("loginform").style.display = "";
  };

  const show = () => {
    if (document.getElementById("dateform").style.display === "") {
      document.getElementById("loginform").style.display = "";
      document.getElementById("dateform").style.display = "block";
    }
    else
      document.getElementById("dateform").style.display = "";
  };
  return (
    <>
      <UploadFile />
      <Date setFinalStart={setStartDate} setFinalEnd={setEndDate} setData={setData} setFinalCompanyName={setCompanyName} />
      <header>
        <h2 className="heading">Performance Dashboard</h2>
        <button className="button_submit" onClick={submit}>Upload File</button>
        <button className="button_graph" onClick={show}>Show Graph</button>
      </header>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Stackbar startDate={startDate} endDate={endDate} graphdata={data} companyName={companyName} />
    </>
  );
}

export default App;