import React, { Component } from "react";
class HomePage extends Component {
  state = {};
  onDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(e.dataTransfer.files[0]);
  };
  render() {
    return (
      <div>
        <h1>Home page goes here</h1>
        <p>
          But for now i'll use it as a canvas to try different html thingies
        </p>
      </div>
    );
  }
}

export default HomePage;
