import React from "react";
import './App.css';
import { Home } from "./screens/Home";
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <div className="container-fluid">
      <Home/>
      <Analytics/>
    </div>
  );
}

export default App;
