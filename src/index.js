import React from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import Header from "./components/signin/Header";
import Main from "./components/signin/Main";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";

function App() {
  return (
    <div className="App">
      
      <Main />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
