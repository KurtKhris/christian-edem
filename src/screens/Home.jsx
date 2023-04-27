import React from "react";
import Navbar from "../components/Navbar";
import Button from "@mui/material/Button";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import pic from "../assets/img/self2.png";

export const Home = () => {
  return (
    <div>
      <Navbar/>
      <div className="banner">
        <div className="container">
          <div className="row">
            <div className="col-md-6 intro-text">
              <h6>Welcome to my world</h6>
              <h1 className="mb-0" >Hi, I'm Christian</h1>
              <h3 ><span style={{color: "#F97294"}} >Frontend</span> Software <span style={{color: "#F49D71"}} >Engineer</span></h3>
              <p className="text-white" >Visit my profile & Stay connected with me</p>
              <div className="socials">
                <a href="https://www.linkedin.com/in/christian-kpegah-491461165/" target="_blank" rel="noreferrer" ><LinkedInIcon className="social-icon" /></a>
                <a href="https://github.com/KurtKhris" target="_blank" rel="noreferrer" ><GitHubIcon className="social-icon" /></a>
                <a href="https://twitter.com/kurt_khris" target="_blank" rel="noreferrer" ><TwitterIcon className="social-icon" /></a>
                <a href="https://instagram.com/kurtkhris" target="_blank" rel="noreferrer" ><InstagramIcon className="social-icon" /></a>
                
              </div>
              <Button variant="contained" className="cv-btn mt-5" >Download My CV</Button>
            </div>
            <div className="col-md-6 my-image">
              <div className="pic">
                <img src={pic} className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}