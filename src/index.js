import React,{ Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
//import Button from "@material-ui/core/Button";
//import Header from "./components/signin/Header";
import Main from "./components/signin/Main";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";
import Error from "./components/signin/Error"

class App extends Component  {


state = {

  emailValue:'',
  passwordValue:'',
  toCourseId:false

}

setEmail = (e) =>{this.setState({emailValue:e.target.value})}
setPassword = (e) =>{this.setState({password:e.target.value})}


logIn= () =>{
  
this.setState(()=>({toCourseId:true}))
}



render() {

  if(this.state.toCourseId === true){return <Redirect to='/error'/>}
  
  return (
    <div className="App">
   
       <Route path='/error' component={Error}/>
       <Route 
        path='/'
        render={(props) => <Main {...props}
          email={e =>(this.setEmail(e))}
          password={e =>{this.setPassword(e)}}
          logIn = {this.logIn}/>}
        exact/>



      
    </div>
  )}
  ;}

const app =(<BrowserRouter><Switch><App /></Switch></BrowserRouter>)
const rootElement = document.getElementById("root");
ReactDOM.render(app, rootElement);
