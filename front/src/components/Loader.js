import { Spin } from "antd";
import React from "react";

function Loader({ text, size }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "0 16px",
      }}
    >
      <Spin
        description={text ? text : "Loading..."}
        size={size ? size : "medium"}
      />
    </div>
  );
}

export default Loader;
