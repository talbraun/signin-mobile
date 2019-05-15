import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Switch,
  withRouter,
  Route,
  HashRouter
} from "react-router-dom";
import Header from "./components/signin/Header";
import Main from "./components/signin/Main";
import Chat from "./components/signin/Chat";
import SignUp from "./components/signin/SignUp";
import * as firebase from "firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  state = {
    idValue: "",
    passwordValue: "",
    toCourseId: false,
    personDetails: "",
    userName: "",
    avatarLink: "",
    addB: true,
    lessB: false,
    numOfLikes: 0,
    lessonCode: "",
    lessonDetails: "",
    userMessage: "",
    chatMode: false,
    messages: "",
    enters: "",
    alert: false
  };

  setEmail = e => {
    this.setState({ idValue: e.target.value });
  };
  setPassword = e => {
    this.setState({ passwordValue: e.target.value });
  };

  signUp = () => {
    this.props.history.push("/signUp");
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
        if (
          (this.state.personDetails.Userpassword !== null) &
          (this.state.personDetails.Id !== null)
        ) {
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
        } else {
          const MySwal2 = withReactContent(Swal);

          MySwal2.fire({
            onOpen: () => {
              MySwal2.clickConfirm();
            }
          }).then(() => {
            return MySwal2.fire({
              type: "error",
              title: "Oops...",
              text: "that's not a match."
            });
          });
        }
      });

    // this.props.history.push("/coursecode");
  };

  startLesson = () => {
    
    const url =
      "https://proj.ruppin.ac.il/bgroup86/prod/api/lesson/?lessonCode=" +
      this.state.lessonCode;

    fetch(url)
      .then(this.handleErrors)
      .then(response => response.json())
      .then(data => {
        this.userIsEnteredTheLesson();
        this.updateLikesStatus();
        this.setState({ lessonDetails: data });
        if (this.state.lessonDetails.IsActive === true) {
          this.props.history.push("/chat");
          this.setState({ chatMode: true });
        } else {
          const MySwal = withReactContent(Swal);

          MySwal.fire({
            onOpen: () => {
              MySwal.clickConfirm();
            }
          }).then(() => {
            return MySwal.fire({
              type: "error",
              title: "Oops...",
              text: "the lesson hasn't began"
            });
          });
        }
      });
  };

  clickAdd = () => {
    this.setState({ addB: false, lessB: true });
    let likes = this.state.numOfLikes;
    likes++;
    this.changeLikes(likes);
  };

  clickLess = () => {
    this.setState({ addB: true, lessB: false });
    let likes = this.state.numOfLikes;
    likes--;
    this.changeLikes(likes);
  };

  updateLikes = (e, key, handStatus, likes, update) => {
    var messageKey = key;
    var idToString = this.state.idValue.toString();

    if (update === -1) {
      this.setState({ addB: true, lessB: false });
    } else {
      this.setState({ addB: false, lessB: true });
    }

    var updates = {};
    updates["messages/" + key + "/likes"] = likes + update;
    updates["messages/" + key + "/userLikesStatus/" + idToString] = update;

    var ref = firebase
      .database()
      .ref()
      .update(updates);
  };

  changeLikes = e => {
    this.setState({ numOfLikes: e });
  };

  //sign in log
  userIsEnteredTheLesson = () => {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;

    const data = {
      lessonCode: this.state.lessonCode,
      time: dateTime,
      id: this.state.idValue
    };

    firebase
      .database()
      .ref("enters/")
      .push(data);
  };
  updateLikesStatus = () => {
    //get all the ids that was connected to the lesson

   
    var entersLog;
    var ref = firebase.database().ref("enters/");
    ref
      .orderByChild("lessonCode")
      .equalTo(this.state.lessonCode)
      .on("value", snapshot => {
        var data = snapshot.val();
        if (Object.keys(data).length !== 0) {
          entersLog = Object.keys(data).map(key => {
            return data[key].id;
          });

          var arr = [...entersLog];
          var uniq = [...new Set(arr)];

          this.setState({ enters: uniq });
        }
        console.log("enters: " + entersLog);
      });
  };

  sendNewMessage = () => {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;
    var idToString = this.state.idValue.toString();
    var enters = this.state.enters;
    var ob = {};

    for (var i = 0; i < enters.length; i++) {
      ob[enters[i]] = -1;
    }

    const data = {
      timeStamp: dateTime,
      lessonCode: this.state.lessonCode,
      content: this.state.userMessage,
      userLikesStatus: { ...ob },
      likes: 0,
      handStatus: -1
    };
    firebase
      .database()
      .ref("messages")
      .push(data);

    this.textInput.current.value = "";
  };

  fung = e => {
    this.setState({ userMessage: e.target.value });
  };

  render() {
    //call firebase when user insert lesson code
    if ((this.state.lessonCode !== "") & (this.state.chatMode === true)) {
      var ref = firebase.database().ref("messages/");
      ref
        .orderByChild("lessonCode")
        .equalTo(this.state.lessonCode)
        .on("value", snapshot => {
          var data = snapshot.val();
          if (Object.keys(data).length !== 0) {
            this.setState({ messages: data });
          }

          console.log("check: " + data);
        });

      this.setState({ chatMode: false });
    }

    return (
      <div className="App">
        {this.state.chatMode === true ? <Header /> : ""}

        <Route
          path="/"
          render={props => (
            <Main
              {...props}
              chatMode={() => {
                this.setState({ chatMode: false });
              }}
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
              signUp={() => {
                this.signUp();
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
              chatMode={() => {
                this.setState({ chatMode: false });
              }}
              avatar={true}
              avatarLink={this.state.avatarLink}
              headerText={"Hey, " + this.state.userName}
              buttonText={"Start Lesson"}
              courseCodeBox={true}
              passwordBox={false}
              emailBox={false}
              email={e => this.setEmail(e)}
              lessonCode={e => this.setState({ lessonCode: e.target.value })}
              logIn={e => {
                this.startLesson();
              }}
              alert={this.state.alert}
              exact
            />
          )}
        />

        <Route
          path="/chat"
          render={props => (
            <Chat
              ref={this.textInput}
              {...props}
              userId={this.state.idValue}
              messages={this.state.messages}
              chatMode={() => this.setState({ chatMode: true })}
              specialQ={true}
              userAvatar={props.avatarLink}
              //addB={this.state.addB}
              //lessB={this.state.lessB}
              clickAdd={this.updateLikes}
              clickLess={this.updateLikes}
              sendNewMessage={() => this.sendNewMessage()}
              userMessage={e => this.fung(e)}
            />
          )}
          exact
        />

        <Route path="/signup" render={props => <SignUp {...props} exact />} />
      </div>
    );
  }
}

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDQ8ghymol2jGYqp2mHq3LonsKG4HsawyI",
  authDomain: "ask-q-22639.firebaseapp.com",
  databaseURL: "https://ask-q-22639.firebaseio.com",
  projectId: "ask-q-22639",
  storageBucket: "ask-q-22639.appspot.com",
  messagingSenderId: "47378671089"
};
export default (!firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app());

const A = withRouter(App);
const app = (
  <HashRouter>
    <Switch>
      <A />
    </Switch>
  </HashRouter>
);
const rootElement = document.getElementById("root");
ReactDOM.render(app, rootElement);
