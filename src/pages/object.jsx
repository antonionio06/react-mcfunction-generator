import React, { Component } from "react";
import CommandsView from "../components/commands_view";
import * as wasm from "wasm-mcfg";
class ObjectPage extends Component {
  state = {
    commands: "",
  };
  generate = async () => {
    let res = await fetch("/react-mcfunction-generator/obj/suzanne.obj");
    let objbytes = new Uint8Array(await res.arrayBuffer());
    this.setState({
      commands: wasm.add_mesh(
        objbytes,
        "monke",
        [0.0, 0.0, 0.0],
        0.05,
        "minecraft:snow_block",
        15
      ),
    });
  };
  render() {
    return (
      <div>
        <form>
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

          {/* <input type="submit" value="Generate" /> */}
          <br />
          <button onClick={this.generate}>Generate</button>
        </form>
        <CommandsView content={this.state.commands} />
      </div>
    );
  }
}

export default ObjectPage;
