// frontend/src/index.js

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from "./pages/Home";
import Delete from "./pages/Delete";
import DeleteWTCsrf from "./pages/DeleteWTCsrf";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
  <Router>
    <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/delete" element={<Delete/>}/>
        <Route exact path="/deletewtcsrf" element={<DeleteWTCsrf/>}/>
    </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);