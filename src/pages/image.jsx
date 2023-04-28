import React, { Component } from "react";
import ImgInput from "../components/img_input";
import * as wasm from "wasm-mcfg";
import CommandsView from "../components/commands_view";
class ImagePage extends Component {
  state = {
    image_url: undefined,
    image_bytes: undefined,

    commands: undefined,
  };
  generate = async () => {
    let res = await fetch(
      "/react-mcfunction-generator/bclists/blockcolors.txt"
    );
    let bcstring = await res.text();
    let bc = wasm.BlocksColors.from_string(bcstring);
    console.log(this.state.image_bytes);
    this.setState({
      commands: bc.gen_image_solid(this.state.image_bytes),
    });
  };
  onImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      let image_bytes = new Uint8Array(
        await event.target.files[0].arrayBuffer()
      );
      this.setState({
        image_url: URL.createObjectURL(event.target.files[0]),
        image_bytes: image_bytes,
      });
    }
  };
  render() {
    let maybeButton = <></>;
    if (this.state.image_bytes) {
      maybeButton = <button onClick={this.generate}>Generate</button>;
    }

    return (
      <div>
        <ImgInput
          src={this.state.image_url}
          onChange={this.onImageChange}
          class1="layer1"
          class2="layer2"
        />
        {maybeButton}
        <CommandsView content={this.state.commands} />
      </div>
    );
  }
}

export default ImagePage;
