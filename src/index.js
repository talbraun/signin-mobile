import React,{ Component } from "react";
import ReactDOM from "react-dom";
//import Button from "@material-ui/core/Button";
//import Header from "./components/signin/Header";
import Main from "./components/signin/Main";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";

class App extends Component  {


state = {
  emailValue:'',
  passwordValue:''
}

setEmail = (e) =>{this.setState({emailValue:e.target.value})}
setPassword = (e) =>{this.setState({password:e.target.value})}

logIn= () =>{
//פה תכניס את הקריאה לשרת
//הערכים נמצאים בסטייט
//בהצלחה וחג שמח סלים, ד"ש לעופר והדס

}
render() {
  return (
    <div className="App">
      
      <Main
      email={e =>(this.setEmail(e))}
      password={e =>{this.setPassword(e)}}
      logIn = {this.logIn()}
      />
    </div>
  )}
  ;}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
