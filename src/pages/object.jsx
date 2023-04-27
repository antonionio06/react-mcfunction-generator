import React, { Component } from "react";
import CommandsView from "../components/commands_view";
import ObjInput from "../components/obj_input";
import VectorInput from "../components/vector_input";
import * as wasm from "wasm-mcfg";
import OptionPicker from "../components/option_picker";
class ObjectPage extends Component {
  state = {
    obj_file: null,
    blockname: null,
    type: null,

    width: 0.05,
    origin: [0.0, 0.0, 0.0],

    block_size: 1.0 / 32,
    grid_size: [64, 64, 64],
    grid_corner: [0.0, 0.0, 0.0],

    commands: null,
  };
  handleSetObj = (x) => {
    this.setState({ obj_file: x });
  };
  handleSetBlockname = (e) => {
    this.setState({ blockname: e.target.value });
  };
  handleSetWidth = (e) => {
    this.setState({ width: parseFloat(e.target.value) });
  };
  handleSetOrigin = (vec) => {
    this.setState({ origin: parseFloat(vec) });
  };
  handleSetType = (type) => {
    this.setState({ type: type });
  };
  generateWireframe = async () => {
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
  generateSolid = async () => {
    let bg = wasm.BlockGrid.new(
      this.state.grid_size,
      this.state.grid_corner,
      this.state.block_size
    );
    bg.add_mesh(this.state.obj_file);
    console.log("aaaaa");
    bg.make_hollow();
    this.setState({
      commands: bg.gen_commands_solid(this.state.blockname),
    });
  };
  render() {
    let maybeButton = <></>;
    let continuation = <></>;
    if (this.state.type == "wireframe") {
      if (this.state.obj_file && this.state.width && this.state.blockname) {
        maybeButton = (
          <button onClick={this.generateWireframe}>Generate</button>
        );
      }
      continuation = (
        <div className="layer2">
          <label>
            Wireframe width:
            <input
              key={1}
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
            <VectorInput
              key={1}
              onChange={(val) => {
                this.setState({ origin: val });
              }}
              value={this.state.origin}
              step={0.1}
            />
          </label>
          <br />
          {maybeButton}
          <br />
        </div>
      );
    } else if (this.state.type == "voxelize") {
      if (
        this.state.obj_file &&
        this.state.grid_corner &&
        this.state.grid_size &&
        this.state.block_size &&
        this.state.blockname
      ) {
        maybeButton = <button onClick={this.generateSolid}>Generate</button>;
      }
      continuation = (
        <div className="layer2">
          <p style={{ color: "red", fontSize: "small" }}>
            Warning: the voxelation algorithm used is very bad and it'll only
            work if your object's mesh is closed (ie. any given straight line
            will intersect it an even number of times) and no vertices align
            with grid's lines (that can usually be assured by shifting grid's
            origin by 0.000001 in all directions or sth).
          </p>
          <label>
            Voxel size:
            <input
              key={2}
              type="number"
              name="inwidth"
              id="widthinput"
              value={this.state.block_size}
              step={1.0 / 32}
              min={0.0}
              onChange={(e) => {
                this.setState({ block_size: e.target.value });
              }}
            />
          </label>
          <br />
          <label>
            grid size (in blocks) (width, height, length)
            <VectorInput
              key={2}
              onChange={(val) => this.setState({ grid_size: val })}
              value={this.state.grid_size}
              step={1}
              min={0}
            />
          </label>
          <br />
          <label>
            Grid -x -y -z side corner:
            <VectorInput
              key={2}
              onChange={(val) => this.setState({ grid_corner: val })}
              value={this.state.grid_corner}
              step={0.1}
            />
          </label>
          <br />

          {maybeButton}
          <br />
        </div>
      );
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
        {continuation}
        <CommandsView content={this.state.commands} />
      </div>
    );
  }
}

export default ObjectPage;
