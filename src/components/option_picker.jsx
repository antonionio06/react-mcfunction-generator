import React, { Component } from "react";
class OptionPicker extends Component {
  state = {};
  clicked = (e) => {
    this.props.onChange(e.target.innerText);
  };
  render() {
    return (
      <>
        {this.props.options.map((x, i) => {
          let classes = ["toggle-button-inactive"];
          if (x == this.props.value) {
            classes.push("toggle-button-active");
          }
          if (i == 0) {
            classes.push("round-left");
          }
          if (i == this.props.options.length - 1) {
            classes.push("round-right");
          }
          return (
            <button
              className={classes.join(" ")}
              onClick={this.clicked}
              key={x}
            >
              {x}
            </button>
          );
        })}
      </>
    );
  }
}

export default OptionPicker;
