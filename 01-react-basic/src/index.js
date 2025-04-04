import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Title from "./component/Title"
import Space from "./component/Space"

import "./styles.css"

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <div className="layout">
      <div className="main-container">
        <Title value="this is title"/>
        <Space space={10} />
        <div>hello world</div>
      </div>
    </div>
  </StrictMode>
)