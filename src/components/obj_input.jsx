import React, { Component } from "react";
import * as wasm from "wasm-mcfg";

function replacer(key, value) {
  if (value instanceof Map) {
    return {
      dataType: "Map",
      value: Array.from(value.entries()),
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
    let rendered_info = <>no file selected</>;
    let info = this.props.objInfo;
    if (info instanceof Map) {
      if (info.get("valid")) {
        rendered_info = (
          <div>
            <p>Valid obj file</p>
            <p>{info.get("triangles")} triangles</p>
            <p>
              uv coordinates available: {info.get("has_uvs") ? "yes" : "no"}
            </p>
            <p>normals available: {info.get("has_normals") ? "yes" : "no"}</p>
            <p>
              boundary box: from [{info.get("boundary").get("from").join(", ")}]
              to [{info.get("boundary").get("to").join(", ")}]
            </p>
          </div>
        );
      } else {
        rendered_info = <p style={{ color: "red" }}>File invalid</p>;
      }
    }

    return (
      <div className="layer1" style={{ display: "flex" }}>
        <input
          type="file"
          id="inobj"
          className="layer2"
          accept="model/obj"
          onChange={this.handleFileChange}
        />
        {rendered_info}
      </div>
    );
  }
}

export default ObjInput;
