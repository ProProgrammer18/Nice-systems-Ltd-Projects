// import logo from './logo.svg';
// import './App.css';
import React from "react";
// import Graph from "./components/basics/Graph";
// import Stackbar from "./components/basics/Stackbar";
// import ReactDOM from "react-dom";
// import UploadFile from './components/basics/UploadFile';
import Router from './routes';
import { BrowserRouter} from 'react-router-dom';


function App() {
  return (
    <>
    <BrowserRouter>
    {/* <h1>Hello demo</h1> */}
      {/* <Graph /> */}
      {/* <UploadFile /> */}
      {/* < Stackbar /> */}
      <Router />
     
    </BrowserRouter>
      
    </>
  );
}

export default App;