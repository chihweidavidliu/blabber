import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Home from "./containers/Home";
import Chat from "./containers/Chat";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/chat" component={Chat} />
    </Router>
  );
}

export default App;
