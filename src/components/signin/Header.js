import React from "react";
import ReactDOM from "react-dom";
import "./css/Header.css";
import { Navbar } from "react-bootstrap";
import Logo from "../../imges/logo.jpeg";

const Header = props => (
  <div>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">{"ASK-Q"}</Navbar.Brand>
    </Navbar>
  </div>
);

export default Header;
