import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import axios from 'axios'

function useOutsideAlerter(ref) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        document.getElementById("dateform").style.display = "";
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const Date = ({ setFinalStart, setFinalEnd, setData, setFinalCompanyName }) => {
  const [companyName, setCompanyName] = useState(""); //Nice
  const [startDate, setStartDate] = useState(""); //2023-03-04
  const [endDate, setEndDate] = useState(""); //2023-03-05
  const [startTime, setStartTime] = useState(""); //22:57
  const [endTime, setEndTime] = useState(""); //20;03

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const SubmitButton = async () => {
    try {
      if (startDate && endDate && startTime && endTime && companyName) {
        const Graphdata = {
          startDate: startDate + "T" + startTime + ":00.000+00:00",
          endDate: endDate + "T" + endTime + ":00.000+00:00",
          companyName: companyName
        }
        const res = await axios.post('http://localhost:5000/filterData', Graphdata);
        setData(res.data);
        setFinalStart(Graphdata.startDate);
        setFinalEnd(Graphdata.endDate);
        setFinalCompanyName(Graphdata.companyName);
        if(res.status === 200){
          // alert("Graph Generated Successfully");
          document.getElementById("dateform").style.display = "";
        }
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    SubmitButton();
  }, [])

  return (
    <>
      <div id="dateform" ref={wrapperRef}>
        <div>
          <div className="row">
            <label style={{ fontWeight: 'bold', color: 'black' }}>Enter Company Name</label>
            <input 
            type="text" 
            placeholder="" 
            value={companyName} onChange={(e) => setCompanyName(e.target.value)} 
            />
            <br />
            <label style={{ fontWeight: 'bold', color: 'black' }}>Start Date</label>
            <input
              type="date" 
              value={startDate} onChange={(e) => setStartDate(e.target.value)}
            />
            <br />
            <label style={{ fontWeight: 'bold', color: 'black' }}>Start Time</label>
            <input
              type="time" 
              value={startTime} onChange={(e) => setStartTime(e.target.value)}
            />
            <br />
            <label style={{ fontWeight: 'bold', color: 'black' }}>End Date</label>
            <input
              type="date" 
              value={endDate} onChange={(e) => setEndDate(e.target.value)}
            />
            <br />
            <label style={{ fontWeight: 'bold', color: 'black' }}>End Time</label>
            <input
              type="time" 
              value={endTime} onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          <div id="button" className="row">
            <button onClick={SubmitButton}>Show Graph</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Date
