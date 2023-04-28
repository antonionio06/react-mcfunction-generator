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
    return (
      <div className="layer1">
        <button
          onClick={this.copyToClipboard}
          className={copied ? "active" : ""}
        >
          Copy
        </button>
        <span>{ncommands + " commands generated"}</span>
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
