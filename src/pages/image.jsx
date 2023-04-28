import React, { Component } from "react";
import ImgInput from "../components/img_input";
import * as wasm from "wasm-mcfg";
import CommandsView from "../components/commands_view";
class ImagePage extends Component {
  state = {
    image_url: undefined,
    image_bytes: undefined,

    entities_not_blocks: false,
    tag: "",
    brightnessint: -1,
    brightness: undefined,
    scale: 1.0 / 16,

    commands: undefined,
  };
  generate = async () => {
    let res = await fetch(
      "/react-mcfunction-generator/bclists/blockcolors.txt"
    );
    let bcstring = await res.text();
    let bc = wasm.BlocksColors.from_string(bcstring);
    if (this.state.entities_not_blocks) {
      this.setState({
        commands: bc.gen_image_entities(
          this.state.image_bytes,
          this.state.tag,
          this.state.scale,
          this.state.brightness
        ),
      });
    } else {
      this.setState({
        commands: bc.gen_image_solid(this.state.image_bytes),
      });
    }
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
    let entityOptionsInput = <></>;
    if (this.state.entities_not_blocks) {
      entityOptionsInput = (
        <div className="layer2">
          <label>
            tag (so that you can select generated entities with @e[tag=�]):
            <input
              type="text"
              className="layer3"
              defaultValue={this.state.tag}
              onChange={(e) => {
                this.setState({ tag: e.target.value });
              }}
            />
          </label>
          <br />
          <label>
            brightness (-1 for default)
            <input
              type="number"
              className="layer3"
              min={-1}
              max={15}
              defaultValue={this.state.brightnessint}
              onChange={async (e) => {
                let brightnessint = parseInt(e.target.value);
                let brightness =
                  brightnessint == -1 ? undefined : brightnessint;
                this.setState({
                  brightnessint: brightnessint,
                  brightness: brightness,
                });
              }}
            />
          </label>
          <br />
          <label>
            block size
            <input
              type="number"
              className="layer3"
              min={0}
              step={1.0 / 64}
              defaultValue={this.state.scale}
              onChange={(e) => {
                this.setState({
                  scale: parseFloat(e.target.value),
                });
              }}
            />
          </label>
        </div>
      );
    }

    return (
      <div>
        <ImgInput
          src={this.state.image_url}
          onChange={this.onImageChange}
          class1="layer1"
          class2="layer2"
        />
        <label>
          Make it out of display entities (instead just building it with blocks)
          <input
            type="checkbox"
            checked={this.state.entities_not_blocks}
            onChange={(e) =>
              this.setState({ entities_not_blocks: e.target.checked })
            }
          />
        </label>
        <br />
        {entityOptionsInput}
        {maybeButton}
        <CommandsView content={this.state.commands} />
      </div>
    );
  }
}

export default ImagePage;