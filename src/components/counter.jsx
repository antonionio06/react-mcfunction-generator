import React, { Component } from "react";
//import "bootstrap/dist/css/bootstrap.css";
class Counter extends Component {
  state = {
    count: 0,
    imageUrl: "https://picsum.photos/200",
    words: ["黒歴史", "電話レンジ", "涙"],
  };
  styles = {
    fontSize: 100,
    fontWeight: "bold",
  };
  handleIncrement = () => {
    console.log("clicd");
    this.setState({ count: this.state.count + 1 });
  };
  renderWords() {
    if (this.state.words.length === 0) return <p>なんでもない</p>;
    return (
      <ul>
        {this.state.words.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }
  render() {
    return (
      <React.Fragment>
        <h2>みんな大嫌い</h2>
        <img src={this.state.imageUrl} alt="ランダムに選ばれた写真" />
        <span className="bg-primary" style={this.styles}>
          {this.formatCount()}
        </span>
        <button
          className="btn btn-secondary btn-big"
          onClick={this.handleIncrement}
        >
          殺す
        </button>
        {this.renderWords()}
      </React.Fragment>
    );
  }
  formatCount() {
    const { count } = this.state;
    return this.state.count === 0 ? "ゼロ" : count;
  }
}

export default Counter;
