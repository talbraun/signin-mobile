import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import { FaHandPaper, FaRegHandPaper, FaFontAwesome } from "react-icons/fa";

import "./css/ChatMessage.css";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  icon: {
    margin: theme.spacing.unit * 2
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    "&:hover": {
      color: red[800]
    }
  }
});

function ChatMessage(props) {
  const { classes } = props;

  return (
    <div className="message">
      <p>{props.content}</p>
      <div className="rank">
        {props.addB === true ? (
          <FaRegHandPaper onClick={props.clickAdd} size={"1.9em"} />
        ) : (
          ""
        )}
        {props.lessB === true ? (
          <FaHandPaper onClick={props.clickLess} size={"1.9em"} />
        ) : (
          ""
        )}
        <div className="numberCircle">{props.numOfLikes}</div>
      </div>
    </div>
  );
}

ChatMessage.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(ChatMessage);
