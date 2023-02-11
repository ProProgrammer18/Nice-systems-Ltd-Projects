import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import {  useNavigate} from 'react-router-dom'

const Date = () => {
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
const [startTime, setStartTime] = useState("");
const [endTime, setEndTime] = useState("");
const navigate = useNavigate();

const SubmitButton = async() => {
    try {
      if(startDate && endDate && startTime && endTime){
        const Graphdata = {
          startDate : startDate+"T"+startTime+":00.000+00:00",
          endDate : endDate+"T"+endTime+":00.000+00:00"
          }
          setStartDate("");
          setEndDate("");
          const res = await axios.post('http://localhost:5000/filterData', Graphdata);
          console.log(res.data)
          if (res.status === 200) {
            navigate('/Stackbar', { state: { data: res.data, startDate: Graphdata.startDate, endDate: Graphdata.endDate } });
          }
      }
      else{
        alert("Please enter all the fields");
      }
    }
    catch (error) {
      console.log(error);
    }
  }
  return (
   <>
        <div id="loginform">
          <h2 id="headerTitle">Enter Date and Time</h2>
          <div>
            <div className="row">
              <label style={{fontWeight:'bold', color:'black'}}>Start Date</label>
            <input
                type="date" value = {startDate} onChange={(e) => setStartDate(e.target.value)}
              />
              <label style={{fontWeight:'bold', color:'black'}}>Start Time</label>
              <input
                type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)}
              />
              <label style={{fontWeight:'bold', color:'black'}}>End Date</label>
               <input
                type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
              />
              <label style={{fontWeight:'bold', color:'black'}}>End Time</label>
              <input
                type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)}
                />
            </div>
            <div id="button" className="row">
              {/* <button>Submit</button> */}
              <button onClick={SubmitButton}>Show Graph</button>
            </div>
        </div>
        </div>
      
          
   </>
  )
}

export default Date
