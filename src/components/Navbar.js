import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Divider } from "@mui/material";
import { Drawer } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import { Link } from "react-router-dom";
import { Link } from "react-scroll";

const drawerWidth = 300;
const navItems = [
  <span>
    {" "}
    <a href="/" className="nav-link">
      About Me
    </a>{" "}
  </span>,
  <span>
    <Link to="skills" smooth={true} duration={500}>
      Skills & Certifications
    </Link>
  </span>,
  <span>
    <Link to="portfolio" smooth={true} duration={500}>
      Portfolio
    </Link>
  </span>,
  <span>
    <Link to="contact" smooth={true} duration={500}>
    <Button variant="contained" style={{backgroundColor: "#fff", color: "#03003D", fontWeight: "bolder"}} >Contact Me</Button>
    </Link>
  </span>,
  
];

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center"}}>
        <div className="mobile-head">
          {/* <img src={logo} alt="logo" className="logohead" /> */}
          <Typography variant="h6" sx={{ my: 2 }}>
              <span className="ms-3" >Christian</span>
          </Typography>
        </div>
      
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "left" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth <= 768);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [window]);

  return (
    <Box sx={{ display: "flex" }} >
      <CssBaseline />
      <AppBar component="nav" className="py-1" style={{ backgroundColor: "#03003D" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {/* <span><img src={logo} alt="logo" className="logohead" /></span> */}
          <span>
            {isMobile ? <p style={{ fontSize: 20, marginLeft: 15, marginBottom: 0, marginTop: 0 }} >Christian</p> : <p style={{ fontSize: 20, marginLeft: 15, marginBottom: 0, marginTop: 0 }} >Christian</p>}
          </span>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            {/* Company Name */}
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#03003D",
              color: "#fff",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Navbar;
