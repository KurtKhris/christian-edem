import React, {useState} from "react";
import Button from "@mui/material/Button";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import pic from "../assets/img/self2.png";
import me from "../assets/img/me.jpg";
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
import wordpress from "../assets/img/wordpress.svg";
import python from "../assets/img/python.svg";
import php from "../assets/img/php.svg";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import shaking from "../assets/img/shaking.jpg";
import { Footer } from "../components/footer";
import projectsData from "./projectsData.json";
import ToastService from 'react-material-toast';
import ReCAPTCHA from "react-google-recaptcha";
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import NavBars from "../components/NavBars";
import { Backdrop, CircularProgress } from "@mui/material";
import TechCard from "../components/TechCard";

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
const projectsPerPage = 9;

const techStack = [
  { image: react, name: "React", color: "#80DEEA" },
  { image: reactNative, name: "React Native", color: "#80DEEA" },
  { image: python, name: "Python", color: "#F7DF1E" },
  { image: js, name: "JavaScript", color: "#F3DB4C" },
  { image: php, name: "Php", color: "#2E64FF" },
  { image: bootstrap, name: "Bootstrap", color: "#673AB7" },
  { image: git, name: "GitHub", color: "#000000" },
  { image: wordpress, name: "WordPress", color: "#1B367B" },
  { image: html, name: "Html", color: "#E65100" },
  { image: css, name: "Css", color: "#0277BD" },
];

export const Home = () => {
  const [verified, setVerified] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const baseURL = 'https://mailserver-jz3h.onrender.com';
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userMessage, setUserMessage] = useState("");


  function onChange(value) {
    console.log("Captcha value:", value);
    setVerified(true);
  }

  const text = `My name is Christian Edem Kpegah, a Frontend Software Engineer passionate about creating stunning and responsive websites that provide exceptional user experience. With my extensive knowledge of HTML, CSS, JavaScript, React, React Native, and Angular I can build dynamic and interactive web applications and mobile applications that meet the needs of clients and end-users.

  I pay attention to details and have a commitment to delivering high-quality work. I am constantly staying up-to-date with the latest web design trends and technologies, and I am always looking for ways to improve my skills and knowledge.
  
  Throughout my career, I have worked on a wide range of projects, from small landing pages to complex web applications. I am comfortable working independently or as part of a team, and I thrive in a collaborative environment where I can share my ideas and learn from others.
  
  In addition to my technical skills, I have excellent communication and project management abilities, allowing me to effectively work with clients and stakeholders to ensure that project goals are met on time and within budget.
  
  Overall, I am a dedicated and passionate frontend developer who is committed to delivering high-quality work that exceeds expectations.`;

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projectsData.projects.slice(indexOfFirstProject, indexOfLastProject);

  const totalPages = Math.ceil(projectsData.projects.length / projectsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const sendEmail = async (userName, userEmail, userPhone, userMessage, e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
        var templateParams = {
            to: 'christiankpegah@gmail.com',
            name: userName,
            email: userEmail,
            phone: userPhone,
            message: userMessage
        };

        const response = await fetch(`${baseURL}/api/send-email-contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(templateParams),
        });

        if (!response.ok) {
            // const errorData = await response.json(); 
            toast.error("Message Not Sent!");
        } else {
            setUserName("");
            setUserEmail("");
            setUserPhone("");
            setUserMessage("");
            toast.success("Message Sent Successfully!!");
        }
    } catch (error) {
        console.error('Error occurred while sending email:', error);
    }finally{
        setIsLoading(false)
    }
};

  return (
    <div>
      <NavBars/>
      <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
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
                    <ListItemText  primary="Web/UI Developer" secondary="MyGhanaOnline (2021 - 2023)" />
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
              {techStack.map((tech, index) => (
                <TechCard key={index} image={tech.image} name={tech.name} color={tech.color} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="portfolio" id="portfolio">
        <div className="container">
          <h2 className="text-center" ><span className="text-white" >My</span> <span style={{color:"#FF5F6D"}} >Portfolio</span></h2>
          <p className="text-center text-white" >These are some of the projects I have worked on. Click on the project to view more details.</p>
            <div className="row">
              {currentProjects.map((project) => (
                <div className="col-sm-4 mt-3" key={project.id}>
                  <div className="card shadow" style={{backgroundColor: "#0F0E50"}}>
                    <div className="my-img p-3">
                      <img src={project.image} alt="" className="card-img-top" style={{borderRadius: 10}} />
                    </div>
                    <div className="card-body text-center">
                      <h6>{project.name}</h6>
                      <a href={project.url} target="_blank" rel="noreferrer" className="btn pro-btn">Visit Website</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex  pagination-controls justify-content-center mt-5">
                <button onClick={handlePreviousPage} disabled={currentPage === 1} className="btn btn-light me-2">Previous</button>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btn btn-light">Next</button>
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
                  <h6 className="text-white" ><PhoneIcon/> <span><a href="tel:+233247154259"> +233 24 715 4259</a></span> </h6>
                </div>
                <div className="mb-3">
                  <h6 className="text-white" ><WhatsAppIcon /><span><a href="https://wa.me/0247154259" target="_blank" rel="noreferrer"> +233 24 715 4259</a></span> </h6>
                </div>
                <div className="mb-3">
                  <h6 className="text-white" ><EmailIcon/> <span><a href="mailto:christiankpegah@gmail.com"> christiankpegah@gmail.com</a></span> </h6>
                </div>
                <div className="shaking-hands" >
                  <img src={shaking} className="img-fluid" alt="" />
                </div>
                <div className="socials text-center mt-2">
                <a href="https://www.linkedin.com/in/christian-kpegah-491461165/" target="_blank" rel="noreferrer" ><LinkedInIcon className="social-icon" /></a>
                <a href="https://github.com/KurtKhris" target="_blank" rel="noreferrer" ><GitHubIcon className="social-icon" /></a>
                <a href="https://twitter.com/kurt_khris" target="_blank" rel="noreferrer" ><TwitterIcon className="social-icon" /></a>
                <a href="https://instagram.com/kurtkhris" target="_blank" rel="noreferrer" ><InstagramIcon className="social-icon" /></a>
                
              </div>
              </div>
              <div className="col-sm-8">
                <form onSubmit={(e) => sendEmail(userName, userEmail, userPhone, userMessage, e)} >
                  <div className="row">
                    <div className="col-sm mt-2">
                      <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="form-control" placeholder="Your Name" required />
                    </div>
                    <div className="col-sm mt-2">
                      <input type="number" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} className="form-control" placeholder="Your Phone Number" required />
                    </div>
                  </div>
                  <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="form-control mt-2" placeholder="Your Email" required />
                  <textarea value={userMessage}  onChange={(e) => setUserMessage(e.target.value)} cols="30" rows="10" className="form-control mt-2" placeholder="Your Message" required></textarea>
                  <ReCAPTCHA
                    className="mt-2"
                    sitekey="6LeHGzQnAAAAADzLZLRxLH-wyHSb76UBIXz9qbQP"
                    onChange={onChange}
                  />
                  <button className="btn btn-light mt-2 w-100" type="submit" disabled={!verified} >Send Message</button>
                </form>
                
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