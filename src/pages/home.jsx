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
        {/* <span class="tooltip">
          Hover over me
          <span class="tooltiptext layer2">Tooltip text</span>
          othersut
        </span>
        otherstuff */}
        {/* <div
          style={{
            width: 300,
            height: 300,
            textAlign: "center",
            verticalAlign: "middle",
            display: "table-cell",
          }}
          className="layer1"
          onDragOver={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onDrop={this.onDrop}
        >
          Drag and drop here
        </div> */}
      </div>
    );
  }
}

export default HomePage;
