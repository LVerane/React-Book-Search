import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        React Reading List
      </a>
      <a className="navbar-brand" href="/">
        Home
      </a>
      <a className="navbar-brand" href="/books/saved">
        Saved
      </a>
    </nav>
  );
}

export default Nav;
