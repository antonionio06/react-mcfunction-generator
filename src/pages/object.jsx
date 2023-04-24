import React, { Component } from "react";
import CommandsView from "../components/commands_view";
class ObjectPage extends Component {
  state = {};
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

          <input type="submit" value="Generate" />
          <br />
          <button>Generate</button>
        </form>
        <CommandsView content="minecraft:dirt" />
      </div>
    );
  }
}

export default ObjectPage;
