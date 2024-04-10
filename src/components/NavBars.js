import React from 'react';
import logo from "../assets/img/Logo.png";

function NavBars() {
  return (
    <nav class="navbar navbar-expand-lg bg shadow sticky-top mb-4">
        <div class="container">
            <a class="navbar-brand" href="/">
                <img src={logo} className="img-fluid py-2 me-5" width={200} alt='logo' />
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon bg-white"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                <a class="nav-link text-white" aria-current="page" href="/#about">About me</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="/#skills">Skills</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="/#portfolio">Portfolio</a>
                </li>
            </ul>
            <div class="d-flex" >
                <a href="/#contact" className='btn btn-light' >Contact Me</a>
            </div>
            </div>
        </div>
    </nav>
  )
}

export default NavBars