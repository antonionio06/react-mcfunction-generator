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
        <p>{ncommands + " commands generated"}</p>
        <textarea rows={50} cols={200}>
          {this.props.content}
        </textarea>
      </div>
    );
  }
}

export default CommandsView;
