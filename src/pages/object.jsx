import React, { Component } from "react";
import CommandsView from "../components/commands_view";
import ObjInput from "../components/obj_input";
import VectorInput from "../components/vector_input";
import * as wasm from "wasm-mcfg";
import OptionPicker from "../components/option_picker";
class ObjectPage extends Component {
  state = {
    obj_file: null,
    commands: null,
    width: 0.05,
    origin: [0.0, 0.0, 0.0],
    blockname: null,
    type: null,
  };
  handleSetObj = (x) => {
    this.setState({ obj_file: x });
    console.log(x);
  };
  handleSetWidth = (e) => {
    this.setState({ width: parseFloat(e.target.value) });
  };
  handleSetBlockname = (e) => {
    this.setState({ blockname: e.target.value });
  };
  handleSetOrigin = (vec) => {
    this.setState({ origin: vec });
  };
  handleSetType = (type) => {
    this.setState({ type: type });
  };
  generate = async () => {
    // let res = await fetch("/react-mcfunction-generator/obj/suzanne.obj");
    // let objbytes = new Uint8Array(await res.arrayBuffer());
    // let bg = wasm.BlockGrid.new([32, 32, 32], this.state.origin, 0.0625);
    this.setState({
      commands: wasm.add_mesh(
        this.state.obj_file,
        "monke",
        this.state.origin,
        this.state.width,
        this.state.blockname,
        15
      ),
    });
  };
  render() {
    let maybeButton = <></>;
    if (this.state.obj_file && this.state.width && this.state.blockname) {
      maybeButton = <button onClick={this.generate}>Generate</button>;
    }
    return (
      <div>
        <label>
          Block:
          <input
            type="text"
            name="intext"
            id="blockinput"
            placeholder="minecraft:dirt"
            onChange={this.handleSetBlockname}
          />
        </label>
        <br />
        <label>
          .obj file:
          <ObjInput handleSetObj={this.handleSetObj} />
        </label>
        <br />
        <label>
          <OptionPicker
            onChange={this.handleSetType}
            options={["wireframe", "voxelize"]}
            value={this.state.type}
          />
        </label>
        <br />
        <div className="layer2">
          <label>
            Wireframe width:
            <input
              type="number"
              name="inwidth"
              id="widthinput"
              defaultValue="0.05"
              step={0.01}
              onChange={this.handleSetWidth}
            />
          </label>
          <br />
          <label>
            entity position:
            <VectorInput onChange={console.log} value={this.state.origin} />
          </label>
          <br />
          {maybeButton}
          {/* <input type="submit" value="Generate" /> */}
          <br />

          <CommandsView content={this.state.commands} />
        </div>
      </div>
    );
  }
}

export default ObjectPage;
