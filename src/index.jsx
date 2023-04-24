import "./style.css";
import ContentsRouter from "./components/contents_router";
import React from "react";
import * as wasm from "wasm-mcfg";
import { createRoot } from "react-dom/client";

wasm.default();
const root = createRoot(document.getElementById("root"));
root.render(<ContentsRouter />);
