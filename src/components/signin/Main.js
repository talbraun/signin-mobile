import React from "react";
import ReactDOM from "react-dom";
import "./css/Main.css";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Omer from "../../imges/pp.jpg";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Main = (props) => {
  
    let styles = {
      marginBottom : '0px'}

return(
  <div className="main container m100">
    <div className="row justify-content-center vertical-center">
      <div className="jumbotron col-8 box" style={styles}>
        <Grid container justify="center" alignItems="center">
          <Avatar alt="Remy Sharp" src={Omer} className="avatar" />
        </Grid>

        <p>WELCOME</p>
        <TextField
          id="outlined-email-input"
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
        />

        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
        />
        <Button variant="contained" color="primary">
          LOGIN
        </Button>
      </div>
    </div>
  </div>
)};

export default Main;
