import React, { Component } from "react";
import ReactDOM from "react-dom";
import ChatMessage from "./ChatMessage";
import Fab from "@material-ui/core/Fab";
import { FaPaperPlane } from "react-icons/fa";
import { withStyles } from "@material-ui/core/styles";

import "react-chat-widget/lib/styles.css";

import "./css/Chat.css";

const styleUi = theme => ({
  fab: {
    float: "right",
    position: "inherit"
    // margin: "2px"
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

const addB = handStatus => {
  if (handStatus === -1) {
    return true;
  } else {
    return false;
  }
};

const lessB = handStatus => {
  if (handStatus === 1) {
    return true;
  } else {
    return false;
  }
};

const Chat = React.forwardRef((props, ref) => {
  let styles = {
    marginBottom: "0px",
    padding: "1rem 1rem"
  };
  let styles2 = { margin: "auto", padding: "15% 0 5% 0", display: "block" };
  let chatext = {
    paddingTop: "0",
    textAlign: "left",
    paddingBottom: "0"
  };

  const { classes } = props;
  const userIdValue = props.userId;

  const messageObjects = props.messages;

  const messagesO = Object.keys(messageObjects).map((key, index) => {
    return (
      <ChatMessage
        key={key}
        addB={addB(messageObjects[key].userLikesStatus[userIdValue])}
        lessB={lessB(messageObjects[key].userLikesStatus[userIdValue])}
        clickAdd={e =>
          props.clickAdd(
            e,
            key,
            messageObjects[key].userLikesStatus[userIdValue],
            messageObjects[key].likes,
            1
          )
        }
        clickLess={e =>
          props.clickAdd(
            e,
            key,
            messageObjects[key].userLikesStatus[userIdValue],
            messageObjects[key].likes,
            -1
          )
        }
        numOfLikes={messageObjects[key].likes}
        content={messageObjects[key].content}
      />
    );
  });

  console.log(messagesO);

  /*const chatMessageComponents = messageObjects.map(message => (
    <ChatMessage
      addB={props.addB}
      lessB={props.lessB}
      clickAdd={props.clickAdd}
      clickLess={props.clickLess}
      numOfLikes={message.likes}
      content={message.content}
    />
  ));*/

  return (
    <div className="main container m100">
      <div style={styles2}>
        <div
          className="jumbotron col-11 box noedge"
          id="sidebar"
          style={styles}
        >
          <div id="scroller" className="yours messages">
            {messagesO}
          </div>
        </div>
        <div
          ref={ref}
          className="jumbotron col-11 noedge chatext"
          style={chatext}
        >
          <textarea
            ref={ref}
            className="txtarea"
            placeholder="Type your message"
            rows="2"
            onChange={props.userMessage}
          />
          <Fab
            onClick={props.sendNewMessage}
            color="secondary"
            aria-label="Edit"
            className={classes.fab}
          >
            <FaPaperPlane />
          </Fab>
        </div>
        {props.specialQ === true ? (
          <div className="jumbotron col-11 box" style={styles} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
});

export default withStyles(styleUi)(Chat);
