import React, { Component } from "react";
class ObjInput extends Component {
  state = {};
  handleFileChange = async (e) => {
    let file = e.target.files[0];
    if (!file) {
      return;
    }
    let bytes = new Uint8Array(await file.arrayBuffer());
    this.props.handleSetObj(bytes);
  };
  render() {
    return (
      <div className="layer1">
        <input
          type="file"
          id="inobj"
          className="layer2"
          accept="model/obj"
          onChange={this.handleFileChange}
        />
      </div>
    );
  }
}

export default ObjInput;
