import React from "react";

const Display = props => {
  const check = props.if ? <div>{props.children}</div> : null;
  return <div>{check}</div>;
};

export default Display;
