import { React } from "react";
import { Routes, Route } from "react-router-dom";
import UploadFile from "./components/basics/UploadFile";
import Stackbar from "./components/basics/Stackbar";
import Date from "./components/basics/date";

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<UploadFile/>} />
                <Route path="Stackbar" element={<Stackbar />} />
                <Route path="/date" element={<Date />} />
            </Routes>

        </>

    );

};

export default Router;