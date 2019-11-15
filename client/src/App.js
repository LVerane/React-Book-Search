import React from "react";
import Books from "./pages/Books";
import Saved from "./pages/Saved";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Books} />
          <Route exact path="/books" component={Books} />
          <Route exact path="/books/saved/:id" component={Saved} />
          <Route component={NoMatch} />
        </Switch>
        {/* <Books /> */}
      </div>
    </Router>
    // <div>
    //   <Nav />
    // </div>
  );
}

export default App;
