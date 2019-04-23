import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, withRouter, Route } from "react-router-dom";
//import Button from "@material-ui/core/Button";
//import Header from "./components/signin/Header";
import Main from "./components/signin/Main";
import Chat from "./components/signin/Chat";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";
//import Error from "./components/signin/Error";

class App extends Component {
  state = {
    idValue: "",
    passwordValue: "",
    toCourseId: false,
    personDetails: "",
    userName: "",
    avatarLink: ""
  };

  setEmail = e => {
    this.setState({ idValue: e.target.value });
  };
  setPassword = e => {
    this.setState({ passwordValue: e.target.value });
  };

  logIn = () => {
    const url =
      "https://proj.ruppin.ac.il/bgroup86/prod/api/login/?PersonId=" +
      this.state.idValue +
      "&Userpassword=" +
      this.state.passwordValue;
    fetch(url)
      .then(this.handleErrors)
      .then(response => response.json())
      .then(data => {
        this.setState({ personDetails: data });
        console.log(this.state.personDetails);
        const person = this.state.personDetails;
        const uPassword = this.state.passwordValue;
        const uID = this.state.idValue;
        this.setState({
          avatarLink: "https://proj.ruppin.ac.il/bgroup86/prod/" + person.Img
        });
        this.setState({
          userName:
            this.state.personDetails.FirstName.charAt(0).toUpperCase() +
            this.state.personDetails.FirstName.slice(1)
        });

        if (person.Userpassword === uPassword && person.Id === uID) {
          this.props.history.push("/coursecode");
        }
      });

    // this.props.history.push("/coursecode");
  };


  startLesson =() =>{
    /*const url =
    "https://proj.ruppin.ac.il/bgroup86/prod/api/login/?PersonId=" +
    this.state.idValue +
    "&Userpassword=" +
    this.state.passwordValue;
  fetch(url)
    .then(this.handleErrors)
    .then(response => response.json())
    .then(data => {
      this.setState({ personDetails: data });
      console.log(this.state.personDetails);
      const person = this.state.personDetails;
      const uPassword = this.state.passwordValue;
      const uID = this.state.idValue;
      this.setState({
        avatarLink: "https://proj.ruppin.ac.il/bgroup86/prod/" + person.Img
      });
      this.setState({
        userName:
          this.state.personDetails.FirstName.charAt(0).toUpperCase() +
          this.state.personDetails.FirstName.slice(1)
      });

     
    });*/
    if (true) {
      this.props.history.push("/chat");
    }
  }

  render() {
    return (
      <div className="App">
        <Route
          path="/"
          render={props => (
            <Main
              {...props}
              headerText={"Welcome"}
              buttonText={"Log In"}
              courseCodeBox={false}
              passwordBox={true}
              emailBox={true}
              email={e => this.setEmail(e)}
              password={e => {
                this.setPassword(e);
              }}
              logIn={() => {
                this.logIn();
              }}
            />
          )}
          exact
        />

        <Route
          path="/coursecode"
          render={props => (
            <Main
              {...props}
              avatar={true}
              avatarLink={this.state.avatarLink}
              headerText={"Hey, " + this.state.userName}
              buttonText={"Start Lesson"}
              courseCodeBox={true}
              passwordBox={false}
              emailBox={false}
              email={e => this.setEmail(e)}
              password={e => this.setPassword(e)}
              logIn={() => {
                this.startLesson();
              }}
              exact
            />
          )}
        />

        <Route path="/chat" render={props => <Chat {...props} />} exact />
      </div>
    );
  }
}

const A = withRouter(App);
const app = (
  <BrowserRouter>
    <Switch>
      <A />
    </Switch>
  </BrowserRouter>
);
const rootElement = document.getElementById("root");
ReactDOM.render(app, rootElement);
