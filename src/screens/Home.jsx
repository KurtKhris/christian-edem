import React from "react";
import Navbar from "../components/Navbar";
import Button from "@mui/material/Button";

export const Home = () => {
  return (
    <div>
      <Navbar/>
      <div className="banner">
        <div className="container">
            <h6>Welcome to my world</h6>
            <h1 className="mb-0" >Hi, I'm Christian</h1>
            <h3 ><span style={{color: "#F97294"}} >Frontend</span> Software <span style={{color: "#F49D71"}} >Engineer</span></h3>
            <p className="text-white" >Visit my profile & Stay connected with me</p>

            <Button variant="contained" className="cv-btn" >Download My CV</Button>

            <div className="profile">
            </div>
        </div>
      </div>
    </div>
  );
}