import React, { Component } from "react";
//import { Switch, Route } from "wouter";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import AboutPage from "../pages/about";
import HomePage from "../pages/home";
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
            <Route path="/" element={<HomePage />} />
            <Route path="/image" element={<ImagePage />} />
            <Route path="/object" element={<ObjectPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </HashRouter>
      </React.StrictMode>
    );
  }
}

export default ContentsRouter;
{
  /* <div>
<div>
  <Switch>
    <Route path="/" component={HomePage} />
    <Route path="/image" component={ImagePage} />
    <Route path="/object" component={ObjectPage} />
    <Route path="/about" component={AboutPage} />
  </Switch>
</div>
</div> */
}
