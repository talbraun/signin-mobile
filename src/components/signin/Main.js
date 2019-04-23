import React from "react";
import ReactDOM from "react-dom";
import "./css/Main.css";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
//import Omer from "../../imges/pp.jpg";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Main = props => {
  let styles = {
    marginBottom: "0px"
  };
  let styles2 = { margin: "auto", padding: "10% 0 15% 0" };
  let styles3 = {
    bigAvatar: {
      margin: 10,
      width: 60,
      height: 60
    }
  };

  return (
    <div className="main container m100">
      <div
        className="row justify-content-center vertical-center"
        style={styles2}
      >
        <div className="jumbotron col-11 box" style={styles}>
          {props.avatar === true ? (
            <Grid container justify="center" alignItems="center">
              <Avatar
                alt="Remy Sharp"
                src={props.avatarLink}
                className={styles3.bigAvatar}
              />
            </Grid>
          ) : (
            ""
          )}

          <div className="box-header">{props.headerText}</div>
          <div className="box-main">
            {props.emailBox === true ? (
              <TextField
                onChange={props.email}
                id="outlined-email-input"
                label="ID"
                type="number"
                name="email"
                color="red"
                autoComplete="NUMBER"
                margin="normal"
                variant="outlined"
              />
            ) : (
              ""
            )}

            {props.passwordBox === true ? (
              <TextField
                onChange={props.password}
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
              />
            ) : (
              ""
            )}

            {props.courseCodeBox === true ? (
              <TextField
                //onChange={props.password}
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
              />
            ) : (
              ""
            )}

            <Button onClick={props.logIn} variant="contained" color="primary">
              {props.buttonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
