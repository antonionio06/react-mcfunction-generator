import React, { Component } from "react";
import CommandsView from "../components/commands_view";
import ObjInput from "../components/obj_input";
import * as wasm from "wasm-mcfg";
class ObjectPage extends Component {
  state = {
    obj_file: null,
    commands: "",
  };
  handleSetObj = (x) => {
    this.setState({ obj_file: x });
    console.log(x);
  };
  generate = async () => {
    // let res = await fetch("/react-mcfunction-generator/obj/suzanne.obj");
    // let objbytes = new Uint8Array(await res.arrayBuffer());
    this.setState({
      commands: wasm.add_mesh(
        this.state.obj_file,
        "monke",
        [0.0, 0.0, 0.0],
        0.05,
        "minecraft:snow_block",
        15
      ),
    });
  };
  render() {
    let maybeButton = <></>;
    if (this.state.obj_file) {
      maybeButton = <button onClick={this.generate}>Generate</button>;
    }
    return (
      <div>
        <label>Block:</label>
        <input
          type="text"
          name="intext"
          id="blockinput"
          placeholder="minecraft:dirt"
        />
        <br />
        <label>.obj file:</label>
        <input type="file" name="infile" id="objinput" />
        <br />

        <label>Wireframe width:</label>
        <input
          type="number"
          name="inwidth"
          id="widthinput"
          step="any"
          defaultValue="0.05"
        />
        <br />
        <label>Scale object by:</label>
        <input
          type="number"
          name="inscale"
          id="scaleinput"
          step="any"
          defaultValue="1.0"
        />
        <br />
        <ObjInput handleSetObj={this.handleSetObj} />
        {maybeButton}
        {/* <input type="submit" value="Generate" /> */}
        <br />

        <CommandsView content={this.state.commands} />
      </div>
    );
  }
}

export default ObjectPage;
