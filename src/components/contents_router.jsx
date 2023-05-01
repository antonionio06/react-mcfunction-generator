import React, { Component } from "react";
//import { Switch, Route } from "wouter";
import { HashRouter, Routes, Route } from "react-router-dom";
import AboutPage from "../pages/about";
import ImagePage from "../pages/image";
import ObjectPage from "../pages/object";
import Navbar from "./navbar";
class ContentsRouter extends Component {
  state = {};
  render() {
    return (
      <React.StrictMode>
        <HashRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<AboutPage />} />
            <Route path="/image" element={<ImagePage />} />
            <Route path="/object" element={<ObjectPage />} />
          </Routes>
        </HashRouter>
      </React.StrictMode>
    );
  }
}

export default ContentsRouter;
