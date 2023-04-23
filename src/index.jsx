import "./style.css";
import ContentsRouter from "./components/contents_router";

import React from "react";
import ReactDOM from "react-dom";
import * as wasm from "wasm-mcfg";
wasm.default().then(() => {
  console.log(wasm.BlocksColors.from_string("cheze ff0000ff"));
});

ReactDOM.render(<ContentsRouter />, document.getElementById("root"));
