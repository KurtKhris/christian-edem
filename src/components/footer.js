import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

export const Footer = () =>{
  // get current year 
  const year = new Date().getFullYear();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor: "#03013C"}} >
        <Toolbar className='shadow'>
            <div className="container social pt-3" > 
            <h6 className="text-white text-center">&copy; {year} Christian Edem Kpegah - All Rights Reserved</h6>
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}