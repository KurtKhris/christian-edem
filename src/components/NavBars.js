import React from 'react';
import logo from "../assets/img/Logo.png";

function NavBars() {
  return (
    <nav className="navbar navbar-expand-lg bg shadow sticky-top mb-4">
        <div className="container">
            <a className="navbar-brand" href="/">
                <img src={logo} className="img-fluid py-2 me-5" width={200} alt='logo' />
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon bg-white"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <a className="nav-link text-white" aria-current="page" href="/#about">About me</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-white" href="/#skills">Skills</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-white" href="/#portfolio">Portfolio</a>
                </li>
            </ul>
            <div className="d-flex" >
                <a href="/#contact" className='btn btn-light' >Contact Me</a>
            </div>
            </div>
        </div>
    </nav>
  )
}

export default NavBars