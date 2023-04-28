import React, { Component } from "react";
class ImgInput extends Component {
  state = {};
  render() {
    return (
      <div className={this.props.class1}>
        <input type="file" onChange={this.props.onChange} className="layer1" />
        <br />
        <div className={this.props.class2}>
          <img src={this.props.src} height={300} />
        </div>
      </div>
    );
  }
}

export default ImgInput;
