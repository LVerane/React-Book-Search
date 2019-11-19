import React from "react";

// Exporting the Container, Row, and Col components from this file

// This Container component allows us to use a bootstrap container without worrying about class names
export function Container({ fluid, children }) {
  return <div className={`container${fluid ? "-fluid" : ""}`}>{children}</div>;
}

export function ViewBtn(props) {
  return (
    <a className="btn btn-success" {...props} tabIndex="0">
      View
    </a>
  );
}
