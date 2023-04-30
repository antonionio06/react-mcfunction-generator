import React, { Component } from "react";
import * as wasm from "wasm-mcfg";

class ImgInput extends Component {
  state = {};
  onDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let file = e.dataTransfer.files[0];
    if (!file) {
      return;
    }
    this.handleFileChange(file);
  };
  handleFileChange = async (file) => {
    let bytes = new Uint8Array(await file.arrayBuffer());
    let img_info = wasm.analyze_img(bytes);
    let img_url = URL.createObjectURL(file);
    this.props.onChange(bytes, img_info, img_url);
  };
  render() {
    let rendered_info = <></>;
    let info = this.props.imgInfo;
    if (info instanceof Map) {
      if (info.get("valid")) {
        let npx = info.get("width") * info.get("height");
        let maybe_warning = <></>;
        if (this.props.warn && npx > this.props.warn) {
          maybe_warning = (
            <p className="warning layer2">
              that's a lot of pixels. Please downscale the image or something.
              You can only generate up to {0x10000} pixels in one .mcfunction
              file anyway, and your browser might crash if you try to make it
              all into minecraft commands
            </p>
          );
        }
        rendered_info = (
          <div>
            <p className={this.props.class2}>
              dimensions: {info.get("width")}x{info.get("height")}px{" "}
            </p>
            {maybe_warning}
          </div>
        );
      } else {
        rendered_info = <div className="error">File invalid</div>;
      }
    }
    let is_valid =
      this.props.imgInfo instanceof Map && this.props.imgInfo.get("valid");
    return (
      <div className={this.props.class1}>
        {/* <input
          type="file"
          onChange={this.handleFileChange}
          className={this.props.class2}
        />
        <br /> */}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <label>
            <div
              className={this.props.class2}
              style={{
                width: 300,
                height: 300,
                position: "relative",
              }}
              onDragOver={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              onDrop={this.onDrop}
            >
              <img
                src={this.props.src}
                height={300}
                width={300}
                className={is_valid ? "pixelated obj-fit" : "hidden"}
              />
              <div className={is_valid ? "hidden" : "centered"}>
                Drag and drop image here
                <br />
                or click to select file
                <input type="file" className="very-hidden" />
              </div>
            </div>
          </label>
          {rendered_info}
        </div>
      </div>
    );
  }
}

export default ImgInput;
