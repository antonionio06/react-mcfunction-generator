import "./style.css";
import ContentsRouter from "./components/contents_router";

import React from "react";
//import * as wasm from "wasm-mcfg";

import { createRoot } from "react-dom/client";

// wasm.default().then(() => {
//   console.log(wasm.BlocksColors.from_string("cheze ff0000ff"));
// });
const root = createRoot(document.getElementById("root"));
//ReactDOM.render(<ContentsRouter />, document.getElementById("root"));
root.render(<ContentsRouter />);
