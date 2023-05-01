import React, { Component } from "react";
import "../style.css";
class CommandsView extends Component {
  state = {
    copied: false,
  };
  copyToClipboard = () => {
    this.setState({ copied: true });
    navigator.clipboard.writeText(this.props.content);
  };
  render() {
    if (!this.props.content) {
      return;
    }
    //resetting the state on render is probably an anti-pattern, but i'm too lazy to implement it other way.
    let copied = this.state.copied;
    this.state.copied = false;
    let ncommands = this.props.content.split("\n").length - 1;
    let length_info = (
      <span className="inline-block">{ncommands + " commands generated"}</span>
    );
    if (ncommands > 0x10000) {
      length_info = (
        <span className="warning inline-block">
          {ncommands} commands generated, single .mcfunction file will only
          execute {0x10000} of them. Split it into multiple files
        </span>
      );
    }
    return (
      <div
        className="layer1"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div>
          <button
            onClick={this.copyToClipboard}
            className={copied ? "active" : ""}
          >
            Copy
          </button>
          {length_info}
        </div>
        <br />
        <textarea
          rows={50}
          cols={200}
          readOnly
          value={this.props.content}
          className="layer2"
        />
      </div>
    );
  }
}

export default CommandsView;
