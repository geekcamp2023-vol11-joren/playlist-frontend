/* @refresh reload */
import "./index.css";
import "./variable.scss";

import { render } from "solid-js/web";

import App from "./App";

const root = document.getElementById("root");

render(() => <App />, root!);
