import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
  state = {};
  render() {
    return (
      <nav className="topnav">
        <Link to="/">home</Link>
        <Link to="/image">image</Link>
        <Link to="/object">3d object</Link>
        <Link to="/about">about</Link>
      </nav>
    );
  }
}

export default Navbar;
