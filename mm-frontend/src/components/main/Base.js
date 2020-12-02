import React from "react";
import Header from "../shared/Header/Header";
import Left from "../shared/Left/Left";
import Right from "../shared/Right/Right";

function Base({ children }) {
  return (
    <div style={{backgroundColor: "#EAF0F1"}}>
      <Header />
      <div style={{ display: "flex", flex: 1}}>
      <Left/>
      <div style={{ flex: 2 , minHeight: "100vh"}}>{children}</div>
      <Right/>
      </div>
    </div>
  );
}

export default Base;
