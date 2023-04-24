import React, { Component } from "react";
class CommandsView extends Component {
  state = {};
  render() {
    if (this.props.content) {
      return <pre>{this.props.content}</pre>;
    } else {
      return;
    }
  }
}

export default CommandsView;
