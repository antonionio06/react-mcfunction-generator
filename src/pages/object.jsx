import React, { Component } from "react";
import CommandsView from "../components/commands_view";
import ObjInput from "../components/obj_input";
import VectorInput from "../components/vector_input";
import * as wasm from "wasm-mcfg";
import OptionPicker from "../components/option_picker";
class ObjectPage extends Component {
  state = {
    obj_file: null,
    obj_info: null,
    blockname: null,
    type: null,

    entities_not_blocks: false,
    tag: "",
    brightnessint: -1,
    brightness: undefined,

    width: 0.05,
    origin: [0.0, 0.0, 0.0],

    block_size: 1.0 / 32,
    grid_size: [64, 64, 64],
    grid_corner: [0.0, 0.0, 0.0],
    hollow: true,

    commands: null,
  };
  handleSetObj = (obj_bytes, obj_info) => {
    this.setState({ obj_file: obj_bytes, obj_info: obj_info });
  };
  handleSetBlockname = (e) => {
    this.setState({ blockname: e.target.value });
  };
  handleSetOrigin = (vec) => {
    this.setState({ origin: parseFloat(vec) });
  };
  handleSetType = (type) => {
    this.setState({ type: type });
  };

  generateWireframe = () => {
    // let res = await fetch("/react-mcfunction-generator/obj/suzanne.obj");
    // let objbytes = new Uint8Array(await res.arrayBuffer());
    // let bg = wasm.BlockGrid.new([32, 32, 32], this.state.origin, 0.0625);
    this.setState({
      commands: wasm.add_mesh(
        this.state.obj_file,
        this.state.tag,
        this.state.origin,
        this.state.width,
        this.state.blockname,
        this.state.brightness
      ),
    });
  };
  generateVoxels = async () => {
    let bg = wasm.BlockGrid.new(
      this.state.grid_size,
      this.state.grid_corner,
      this.state.block_size
    );
    bg.add_mesh(this.state.obj_file);
    if (this.state.hollow) {
      bg.make_hollow();
    }
    if (this.state.entities_not_blocks) {
      this.setState({
        commands: bg.gen_commands(
          this.state.blockname,
          this.state.tag,
          this.state.brightness
        ),
      });
    } else {
      this.setState({
        commands: bg.gen_commands_solid(this.state.blockname),
      });
    }
  };
  entityOptionsInput = (
    <>
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
            let brightness = brightnessint == -1 ? undefined : brightnessint;
            this.setState({
              brightnessint: brightnessint,
              brightness: brightness,
            });
          }}
        />
      </label>
    </>
  );
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
        <div className="layer1 match-parent">
          <label>
            Wireframe width:
            <input
              key={1}
              type="number"
              value={this.state.width}
              step={0.01}
              onChange={(e) => {
                this.setState({ width: parseFloat(e.target.value) });
              }}
              className="layer2"
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
              class1="layer2"
              class2="layer3"
            />
          </label>
          <br />
          {this.entityOptionsInput}
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
        maybeButton = <button onClick={this.generateVoxels}>Generate</button>;
      }
      continuation = (
        <div className="layer1 match-parent">
          <p style={{ color: "red", fontSize: "small" }}>
            the voxelization algorithm used is very bad and it'll only work if
            your object's mesh is closed (ie. any given straight line will
            intersect it an even number of times) and no vertices align with
            grid's lines (that can usually be assured by shifting grid's origin
            by 0.000001 in all directions or sth).
          </p>
          <label>
            Voxel size:
            <input
              key={2}
              type="number"
              name="inwidth"
              className="layer2"
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
              class1="layer2"
              class2="layer3"
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
              class1="layer2"
              class2="layer3"
            />
          </label>
          <br />
          <label>
            Make it hollow (for optimization purposes)
            <input
              type="checkbox"
              checked={this.state.hollow}
              onChange={(e) => this.setState({ hollow: e.target.checked })}
            />
          </label>
          <br />
          <label>
            Make it out of display entities (instead just building it with
            blocks)
            <input
              type="checkbox"
              checked={this.state.entities_not_blocks}
              onChange={(e) =>
                this.setState({ entities_not_blocks: e.target.checked })
              }
            />
          </label>
          <br />

          {this.state.entities_not_blocks ? (
            <div className="layer2">{this.entityOptionsInput}</div>
          ) : (
            <></>
          )}

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
            onChange={this.handleSetBlockname}
            className="layer1"
          />
        </label>
        <br />
        <label>
          .obj file:
          <ObjInput
            handleSetObj={this.handleSetObj}
            objInfo={this.state.obj_info}
          />
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
