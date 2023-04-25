import React, { Component } from "react";
import "../style.css";
class CommandsView extends Component {
  state = {};
  copyToClipboard = () => {
    navigator.clipboard.writeText(this.props.content);
  };
  render() {
    if (!this.props.content) {
      return;
    }
    let ncommands = this.props.content.split("\n").length - 1;
    return (
      <div className="layer1">
        <button onClick={this.copyToClipboard}>Copy</button>
        <span>{ncommands + " commands generated"}</span>
        <textarea rows={50} cols={200} readOnly value={this.props.content} />
      </div>
    );
  }
}

export default CommandsView;
