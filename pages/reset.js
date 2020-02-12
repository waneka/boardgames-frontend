import React from "react";
import Reset from "../components/Reset";

function reset(props) {
  return <Reset resetToken={props.query.resetToken} />;
}

export default reset;
