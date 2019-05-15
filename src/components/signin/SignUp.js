import React, { Component } from "react";
import ReactDOM from "react-dom";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import "./css/Main.css";
import "./css/SignUp.css";

let styles2 = { margin: "auto", padding: "10% 0 15% 0" };
let styles = {
  marginBottom: "0px"
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  state = {
    Id: "",
    FirstName: "",
    LastName: "",
    Email: "",
    UserPassword: "",
    Gender: "",
    Type: "",
    Img: ""
  };

  updateFirstName = e => {
    this.setState({ FirstName: e.target.value });
  };
  updateLastName = e => {
    this.setState({ LastName: e.target.value });
  };
  updateID = e => {
    this.setState({ Id: e.target.value });
  };
  updateEmail = e => {
    this.setState({ Email: e.target.value });
  };
  updatePassword = e => {
    this.setState({ UserPassword: e.target.value });
  };
  updateGender = e => {
    this.setState({ Gender: e.target.value });
  };
  updateUserType = e => {
    this.setState({ Type: e.target.value });
  };

  SignUp = () => {
    alert("enter to signup");
    const url =
      "https://proj.ruppin.ac.il/bgroup86/prod/api/person/?PersonId=" +
      this.state.Id +
      "&PersonType=" +
      this.state.Type;
    fetch(url)
      .then(this.handleErrors)
      .then(response => response.json())
      .then(data => {
        if (data === false) {
          alert("Sorry the ID is registered ");
        } else {
          alert("add to data base");

          var data2 = {
            Id: this.state.Id,
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            Email: this.state.Email,
            Userpassword: this.state.UserPassword,
            Gender: this.state.Gender,
            Type: this.state.Type,
            Img: ""
          };
          var url2 =
            "https://proj.ruppin.ac.il/bgroup86/prod/api/Person/?Id=" +
            data2.Id +
            "&FirstName=" +
            data2.FirstName +
            "&LastName=" +
            data2.LastName +
            "&Email=" +
            data2.Email +
            "&Userpassword=" +
            data2.Userpassword +
            "&Gender=" +
            data2.Gender +
            "&Type=" +
            data2.Type +
            "&Img=" +
            data2.Img;
          fetch(url2)
            .then(this.handleErrors)
            .then(response => response.json())
            .then(data3 => {
              alert("success");
              console.log(data3);
            });
        }
      });
  };

  render() {
    return (
      <div className="main container m100">
        <div
          className="row justify-content-center vertical-center"
          style={styles2}
        >
          <div className="jumbotron col-11 box" style={styles}>
            <h1>Sign Up</h1>

            <TextField
              onChange={e => this.updateFirstName(e)}
              id="outlined-name"
              label="First Name"
              className="left"
              variant="outlined"
              margin="normal"
            />
            <TextField
              id="outlined-name"
              label="Last Name"
              className="left"
              variant="outlined"
              onChange={e => this.updateLastName(e)}
              margin="normal"
            />

            <TextField
              id="outlined-email-input"
              label="ID"
              className="right"
              type="number"
              name="email"
              color="red"
              autoComplete="NUMBER"
              margin="normal"
              variant="outlined"
              onChange={e => this.updateID(e)}
            />
            <TextField
              id="outlined-email-input"
              label="Email"
              //className={classes.textField}
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              onChange={e => this.updateEmail(e)}
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              //className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
              onChange={e => this.updatePassword(e)}
            />
            <div className="radiob">
              <FormControl className="left" component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label="Gender"
                  name="gender1"
                  //className={classes.group}
                  value={this.state.value}
                  onChange={e => this.updateGender(e)}
                >
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl component="fieldset">
                <FormLabel component="legend">User Type</FormLabel>
                <RadioGroup
                  aria-label="Gender"
                  name="gender1"
                  //className={classes.group}
                  value={this.state.value}
                  onChange={e => this.updateUserType(e)}
                >
                  <FormControlLabel
                    value="Student"
                    control={<Radio />}
                    label="Student"
                  />
                  <FormControlLabel
                    value="Lecturer"
                    control={<Radio />}
                    label="Lecturer"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <Button
              onClick={e => this.SignUp()}
              variant="contained"
              color="secondary"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SignUp);
