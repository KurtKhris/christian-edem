import React, {useState} from "react";
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

  const text = `My name is Christian Edem Kpegah, a front-end developer passionate about creating stunning and responsive websites that provide an exceptional user experience. With my extensive knowledge of HTML, CSS, and JavaScript, React, React Native, I can build dynamic and interactive web applications and mobile applications that meet the needs of clients and end-users.

  I have a strong attention to detail and a commitment to delivering high-quality work. I am constantly staying up-to-date with the latest web design trends and technologies, and I am always looking for ways to improve my skills and knowledge.
  
  Throughout my career, I have worked on a wide range of projects, from small landing pages to complex web applications. I am comfortable working independently or as part of a team, and I thrive in a collaborative environment where I can share my ideas and learn from others.
  
  In addition to my technical skills, I have excellent communication and project management abilities, allowing me to effectively work with clients and stakeholders to ensure that project goals are met on time and within budget.
  
  Overall, I am a dedicated and passionate frontend developer who is committed to delivering high-quality work that exceeds expectations.`;

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
      <div className="about">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 me">
              <img src={me} alt="" className="img-fluid" />
              <div className="back"></div>
            </div>
            <div className="col-sm-6">
              <h1> <span style={{color: "#F97294"}}>About</span>  <span style={{color: "#F49D71"}} >Me</span></h1>
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
                    <ListItemText  primary="B.Tech in Information and Commuinication Technology" secondary="Ho Technical University (2021 - 2022)" />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <SchoolIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText  primary="HND in Information and Commuinication Technology" secondary="Ho Technical University (2018 - 2021)" />
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
                    <ListItemText  primary="Web/UI Developer" secondary="MyGhanaOnline (2022 - Present)" />
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
    </div>
  );
}