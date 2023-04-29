import React, { Component } from "react";
import * as wasm from "wasm-mcfg";

function replacer(key, value) {
  if (value instanceof Map) {
    return {
      dataType: "Map",
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else {
    return value;
  }
}

class ObjInput extends Component {
  state = {};
  handleFileChange = async (e) => {
    let file = e.target.files[0];
    if (!file) {
      return;
    }
    let bytes = new Uint8Array(await file.arrayBuffer());
    let obj_info = wasm.analyze_obj(bytes);
    this.props.handleSetObj(bytes, obj_info);
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
        <p>{JSON.stringify(this.props.objInfo, replacer)}</p>
      </div>
    );
  }
}

export default ObjInput;
