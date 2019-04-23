import React from "react";
import ReactDOM from "react-dom";
import { Widget } from "react-chat-widget";

import "react-chat-widget/lib/styles.css";

import "./css/Chat.css";

const Chat = props => {
  let styles = {
    marginBottom: "0px"
  };
  let styles2 = { margin: "auto", padding: "15% 0 25% 0" };

  const handleNewUserMessage = neMessage => {
    //  console.log(`New message incomig! ${newMessage}`);
    // Now send the message throught the backend API
  };

  return (
    <div className="main container m100">
      <div
        className="row justify-content-center vertical-center"
        style={styles2}
      >
        <div className="jumbotron col-11 box" style={styles}>
          <Widget />
        </div>
      </div>
    </div>
  );
};

export default Chat;
