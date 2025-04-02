import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Title from "./component/Title"
import TodoItem from "./component/TodoItem";
import AddItem from "./component/AddItem";

import "./styles.css"

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <div>hello world</div>
  </StrictMode>
)