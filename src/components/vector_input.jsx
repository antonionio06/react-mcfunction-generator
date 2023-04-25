import React, { Component } from "react";
class VectorInput extends Component {
  state = {};
  value = this.props.value;
  handleChange = (e, i) => {
    //value = this.props.value;
    this.value[i] = parseFloat(e.target.value);
    this.props.onChange(this.value);
  };
  render() {
    return (
      <div className="layer1">
        <span style={{ color: "red" }}>x</span>
        <input
          type="number"
          className="layer2"
          defaultValue={this.props.value[0]}
          onChange={(e) => this.handleChange(e, 0)}
          step={0.1}
        />
        <span style={{ color: "green" }}>y</span>
        <input
          type="number"
          className="layer2"
          defaultValue={this.props.value[1]}
          onChange={(e) => this.handleChange(e, 1)}
          step={0.1}
        />
        <span style={{ color: "blue" }}>z</span>
        <input
          type="number"
          className="layer2"
          defaultValue={this.props.value[2]}
          onChange={(e) => this.handleChange(e, 2)}
          step={0.1}
        />
      </div>
    );
  }
}

export default VectorInput;