import React, {useState, useRef} from "react";
import Navbar from "../components/Navbar";
import Button from "@mui/material/Button";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import pic from "../assets/img/self2.png";
import me from "../assets/img/me.png";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import html from "../assets/img/html.svg";
import css from "../assets/img/css.svg";
import js from "../assets/img/js.svg";
import react from "../assets/img/react.svg";
import reactNative from "../assets/img/reactnative.svg";
import bootstrap from "../assets/img/bootstrap.svg";
import git from "../assets/img/git.svg";
import angular from "../assets/img/angular.svg";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import shaking from "../assets/img/shaking.jpg";
import { Footer } from "../components/footer";
import projectsData from "./projectsData.json";
import emailjs from '@emailjs/browser';
import ToastService from 'react-material-toast';
import ReCAPTCHA from "react-google-recaptcha";
import { FloatingWhatsApp } from 'react-floating-whatsapp'

const toast = ToastService.new({
    place: "topRight",
    duration: 1,
    maxCount: 1,
  });

function ReadMore({ text }) {
  const [showFullText, setShowFullText] = useState(false);

  function handleToggle() {
    setShowFullText(!showFullText);
  }

  const paragraphs = text.split("\n");

  return (
    <div className="text-white" >
      {paragraphs.slice(0, 1).map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      {showFullText
        ? paragraphs.slice(1).map((p, i) => (
            <p key={i}>{p}</p>
          ))
        : null}
      {!showFullText && paragraphs.length > 1 && (
        <Button variant="contained" onClick={handleToggle} className="read"> Read more</Button>
      )}
      {showFullText && paragraphs.length > 1 && (
        <Button variant="contained" onClick={handleToggle}  className="read"> Read less</Button>
      )}
    </div>
  );
}

export const Home = () => {
  const [verified, setVerified] = useState(false);

  function onChange(value) {
    console.log("Captcha value:", value);
    setVerified(true);
  }

  const text = `My name is Christian Edem Kpegah, a Frontend Software Engineer passionate about creating stunning and responsive websites that provide exceptional user experience. With my extensive knowledge of HTML, CSS, JavaScript, React, React Native, and Angular I can build dynamic and interactive web applications and mobile applications that meet the needs of clients and end-users.

  I pay attention to details and have a commitment to delivering high-quality work. I am constantly staying up-to-date with the latest web design trends and technologies, and I am always looking for ways to improve my skills and knowledge.
  
  Throughout my career, I have worked on a wide range of projects, from small landing pages to complex web applications. I am comfortable working independently or as part of a team, and I thrive in a collaborative environment where I can share my ideas and learn from others.
  
  In addition to my technical skills, I have excellent communication and project management abilities, allowing me to effectively work with clients and stakeholders to ensure that project goals are met on time and within budget.
  
  Overall, I am a dedicated and passionate frontend developer who is committed to delivering high-quality work that exceeds expectations.`;

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_bxcljt5', 'template_xakzu08', form.current, 'RY1_htjR_99HHd0hX')
      .then((result) => {
          console.log(result.text);
          toast.success("Email Sent Successfully");
          window.location.reload();
      }, (error) => {
          console.log(error.text);
          toast.error("Email Not Sent");
      });
  };
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
              <a href="https://docs.google.com/document/d/1r3WOGWwsnCC6y5ntL2te5uzs002FWzRp4gXz6etb9dI/edit" target="_blank" rel="noreferrer" ><Button variant="contained" className="cv-btn mt-5" >Download My CV</Button></a>
              
            </div>
            <div className="col-md-6 my-image">
              <div className="pic text-center">
                <img src={pic} className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="about" id="about">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 me">
              <img src={me} alt="" className="img-fluid" />
              <div className="back"></div>
            </div>
            <div className="col-sm-6">
              <h1> <span style={{color: "#fff"}}>About</span>  <span style={{color: "#F49D71"}} >Me</span></h1>
                <ReadMore text={text} />
            </div>
          </div>
          <div className="sch-job mt-5">
            <div className="row">
              <div className="col-sm-6">
                <h3> <span className="text-white">Academic</span>  <span style={{color: "#F49D71"}} >Qualification</span></h3>
                <List sx={{ width: '100%'}} className="text-white">
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <SchoolIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText  primary="B.Tech in Information and Communication Technology" secondary="Ho Technical University (2021 - 2022)" />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <SchoolIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText  primary="HND in Information and Communication Technology" secondary="Ho Technical University (2018 - 2021)" />
                  </ListItem>
                </List>
              </div>
              <div className="col-sm-6">
                <h3> <span className="text-white">Work</span>  <span style={{color: "#F49D71"}} >Experience</span></h3>
                <List sx={{ width: '100%'}} className="text-white">
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <WorkIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText  primary="Frontend Software Engineer/UI/UX" secondary="Techieszon (2021 - Present)" />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <WorkIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText  primary="Junior Frontend Software Engineer" secondary="Stanbic Bank Ghana (2020 - 2021)" />
                  </ListItem>
                </List>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="skills-certs" id="skills" >
        <div className="container">
          <div className="skills">
            <h3 className="text-white" >Skills</h3>
            <div className="row">
              <div className="col-sm-3 mt-3">
                <div className="card">
                  <div className="card-body">
                    <div className="logo">
                      <img src={html} alt="" className="img-fluid" />
                    </div>
                    <div className="name">
                      <h6 style={{color: "#E65100"}} >HTML</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3 mt-3">
                <div className="card">
                  <div className="card-body">
                    <div className="logo">
                      <img src={css} alt="" className="img-fluid" />
                    </div>
                    <div className="name">
                      <h6 style={{color: "#0277BD"}} >CSS</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3 mt-3">
                <div className="card">
                  <div className="card-body">
                    <div className="logo">
                      <img src={js} alt="" className="img-fluid" />
                    </div>
                    <div className="name">
                      <h6 style={{color: "#F3DB4C"}} >JAVASCRIPT</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3 mt-3">
                <div className="card">
                  <div className="card-body">
                    <div className="logo">
                      <img src={react} alt="" className="img-fluid" />
                    </div>
                    <div className="name">
                      <h6 style={{color: "#80DEEA"}} >REACT</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3 mt-3">
                <div className="card">
                  <div className="card-body">
                    <div className="logo">
                      <img src={reactNative} alt="" className="img-fluid" />
                    </div>
                    <div className="name">
                      <h6 style={{color: "#80DEEA"}} >REACT NATIVE</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3 mt-3">
                <div className="card">
                  <div className="card-body">
                    <div className="logo">
                      <img src={bootstrap} alt="" className="img-fluid" />
                    </div>
                    <div className="name">
                      <h6 style={{color: "#673AB7"}} >BOOTSTRAP</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3 mt-3">
                <div className="card">
                  <div className="card-body">
                    <div className="logo">
                      <img src={git} alt="" className="img-fluid" />
                    </div>
                    <div className="name">
                      <h6 style={{color: "#000000"}} >GITHUB</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3 mt-3">
                <div className="card">
                  <div className="card-body">
                    <div className="logo">
                      <img src={angular} alt="" className="img-fluid" />
                    </div>
                    <div className="name">
                      <h6 style={{color: "#B71C1C"}} >ANGULAR</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="portfolio" id="portfolio">
        <div className="container">
          <h2 className="text-center" ><span className="text-white" >My</span> <span style={{color:"#FF5F6D"}} >Portfolio</span></h2>
          <p className="text-center text-white" >These are some of the projects I have worked on. Click on the project to view more details.</p>
            <div className="row">
              {projectsData.projects.map((project) => (
                <div className="col-sm-4 mt-3" key={project.id}>
                  <div className="card shadow" style={{backgroundColor: "#0F0E50"}}>
                    <div className="my-img p-3">
                      <img src={project.image} alt="" className="card-img-top" />
                    </div>
                    <div className="card-body">
                      <h6>{project.name}</h6>
                      <a href={project.url} target="_blank" rel="noreferrer" className="btn pro-btn">View Project</a>
                    </div>
                  </div>
                </div>
              ))}
              
            </div>
        </div>
      </div>
      <div className="contact" id="contact" >
        <div className="container">
          <h2 className="text-center" ><span className="text-white" >Contact</span> <span style={{color:"#FF5F6D"}} >Me</span></h2>
          <p className="text-center text-white " >Feel free to contact me directly via Phone, WhatsApp, or Email, or fill up the form below to get in touch with me.</p>
          <div className="contact-form">
            <div className="row">
              <div className="col-sm-4">
                <div className="mb-3">
                  <h6 className="text-white" >Phone:</h6>
                  <h6 className="text-white" ><PhoneIcon/> <span><a href="tel:+233247154259"> +233 24 715 4259</a></span> </h6>
                </div>
                <div className="mb-3">
                  <h6 className="text-white" >WhatsApp:</h6>
                  <h6 className="text-white" ><WhatsAppIcon /><span><a href="https://wa.me/0247154259" target="_blank" rel="noreferrer"> +233 24 715 4259</a></span> </h6>
                </div>
                <div className="mb-3">
                  <h6 className="text-white" >Email:</h6>
                  <h6 className="text-white" ><EmailIcon/> <span><a href="mailto:christiankpegah@gmail.com"> christiankpegah@gmail.com</a></span> </h6>
                </div>
                <div className="shaking-hands" >
                  <img src={shaking} className="img-fluid" alt="" />
                </div>
              </div>
              <div className="col-sm-8">
                <form ref={form}  onSubmit={sendEmail} >
                  <div className="row">
                    <div className="col-sm mt-2">
                      <input type="text" name="user_name" id="" className="form-control" placeholder="Your Name" required />
                    </div>
                    <div className="col-sm mt-2">
                      <input type="number" name="user_phone" id="" className="form-control" placeholder="Your Phone Number" required />
                    </div>
                  </div>
                  <input type="email" name="user_email" id="" className="form-control mt-2" placeholder="Your Email" required />
                  <textarea name="message" id="" cols="30" rows="10" className="form-control mt-2" placeholder="Your Message" required></textarea>
                  <ReCAPTCHA
                    className="mt-2"
                    sitekey="6LeHGzQnAAAAADzLZLRxLH-wyHSb76UBIXz9qbQP"
                    onChange={onChange}
                  />
                  <button className="btn btn-light mt-2 w-100" type="submit" disabled={!verified} >Send Message</button>
                </form>
                <div className="socials text-center mt-2">
                <a href="https://www.linkedin.com/in/christian-kpegah-491461165/" target="_blank" rel="noreferrer" ><LinkedInIcon className="social-icon" /></a>
                <a href="https://github.com/KurtKhris" target="_blank" rel="noreferrer" ><GitHubIcon className="social-icon" /></a>
                <a href="https://twitter.com/kurt_khris" target="_blank" rel="noreferrer" ><TwitterIcon className="social-icon" /></a>
                <a href="https://instagram.com/kurtkhris" target="_blank" rel="noreferrer" ><InstagramIcon className="social-icon" /></a>
                
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="whatsapp">
        <FloatingWhatsApp 
          phoneNumber="+233247154259" 
          accountName="Christian" 
          avatar={pic}
          statusMessage="Available 24/7"
          allowEsc
          allowClickAway
          notification
          notificationSound={true}
          darkMode={true}
        />
      </div>
      <Footer/>
    </div>
  );
}