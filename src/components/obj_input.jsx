import React, { Component } from "react";
import * as wasm from "wasm-mcfg";

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
    let rendered_info = <></>;
    let info = this.props.objInfo;
    if (info instanceof Map) {
      if (info.get("valid")) {
        rendered_info = <></>;
      } else {
        rendered_info = <div className="error layer1">File invalid</div>;
      }
    }

    return (
      <>
        <input
          type="file"
          id="inobj"
          className="layer1 clickable"
          accept="model/obj"
          onChange={this.handleFileChange}
        />
        {rendered_info}
      </>
    );
  }
}

export default ObjInput;
