import React, { Component } from "react";
class CommandsView extends Component {
  state = {};
  render() {
    console.log(this.props);
    return <pre>{this.props.content}</pre>;
  }
}

export default CommandsView;
