import logo from './logo.svg';
import './App.css';
import './styles/globals.css';


// src/App.js
import React from "react";
import WebcamCapture from "./components/WebcamCapture";

function App() {
  return (
    <div className="App">
      <WebcamCapture />
    </div>
  );
}

export default App;
