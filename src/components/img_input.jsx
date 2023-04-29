import React, { Component } from "react";
class ImgInput extends Component {
  state = {};
  render() {
    return (
      <div className={this.props.class1}>
        <input type="file" onChange={this.props.onChange} className="layer1" />
        <br />
        <div className={this.props.class2} style={{ width: 300 }}>
          <img
            src={this.props.src}
            height={300}
            width={300}
            className="pixelated obj-fit"
          />
        </div>
      </div>
    );
  }
}

export default ImgInput;
