import React, { Component } from "react";
class HomePage extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Home page goes here</h1>
        <p>
          But for now i'll use it as a canvas to try different html thingies
        </p>
        <span class="tooltip">
          Hover over me
          <span class="tooltiptext layer2">Tooltip text</span>
          othersut
        </span>
        otherstuff
      </div>
    );
  }
}

export default HomePage;
