import React, { Component } from 'react';
import './loginPage.css';
import axios from "axios";
import { Link } from 'react-router-dom';


const HOST = 'http://10.102.55.73:8080';
class loginPage extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      data: [],
      userType: null,
    };
  }

  getUsertype(e) {
    e.preventDefault();
    if (document.getElementById("users").checked) {
      this.setState({ userType: document.getElementById("users").value });
      window.open("/forgotPassword/users", "_self")
    }
    else if (document.getElementById("company").checked) {
      this.setState({ userType: document.getElementById("company").value });
      window.open("/forgotPassword/company", "_self")
    }
    else
    {
      alert("Please select User Type");
    }
  }

  formsubmit(p) {
    p.preventDefault();
    if (document.getElementById("users").checked) {
      axios.post(HOST + '/rest-api/user/login', {
        userName: this.refs.name.value,
        password: this.refs.password.value,
      }).then(response => {
        this.setState({ data: response.data });
        if (this.state.data == "logged In") {
          sessionStorage.userName = this.refs.name.value
          let user = this.refs.name.value
          console.log(user)
          window.open("http://10.102.55.73:4200/auth/"+user, "_self");
        }
        else if (this.state.data == "not verified") {
          window.open("/notVerified/users/" + this.refs.name.value, "_self");
        }
        else if (this.state.data == "Account deleted") {
          alert("Account Deleted");
        }
        else if (this.state.data == "Username not found") {
          alert("UserName Not Found");
        }
        else if (this.state.data == "Incorrect Password") {
          alert("Incorrect Password");
        }
        else {
          alert("not logged in");
        }
      }).catch(function (error) {
        console.log(error);
      });
      this.setState({ userType: document.getElementById("users").value });
    }
    else if (document.getElementById("company").checked) {
      this.setState({ userType: document.getElementById("company").value });
      axios.post(HOST + '/rest-api/orgs/login', {
        companyID: this.refs.name.value,
        password: this.refs.password.value,
      }).then(response => {
        this.setState({ data: response.data });
        alert(this.state.data);
        if (this.state.data == "logged In") {
          sessionStorage.userName = this.refs.name.value
          window.open("/orgs", "_self");
        }
        else if (this.state.data == "not verified") {
          window.open("/notVerified/company/" + this.refs.name.value, "_self");
        }
        else if (this.state.data == "Account deleted") {
          alert("Account Deleted");
        }
        else if (this.state.data == "Username not found") {
          alert("ID Not Found");
        }
        else if (this.state.data == "Incorrect Password") {
          alert("Incorrect Password");
        }
        else {
          alert("hello");
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
    else
    {
      alert("Please select User Type");
    }
  }
  render() {
    var img3 = require('./logo.JPG');
    return (
      <div id="bg-img">
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/login"><img src={img3} alt="LOGO" /></a>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="/signup" ><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
              <li><a href="/login"><span className="glyphicon glyphicon-log-in"></span> LogIn</a></li>
            </ul>
          </div>
        </nav>
        <div id="container">
          <form onSubmit={this.formsubmit.bind(this)}>
            <h1>Login</h1>
            <input type="radio" name="userType" id="users" value="User" /> User
        <input type="radio" name="userType" id="company" value="Company" /> Company
        <br />
            <label ><b>UserName/Company Id</b></label>
            <input type="text" id="text" placeholder="Enter UserName/Company Id" ref="name" name="name" required />
            <label><b>Password</b></label>
            <input type="password" id="password" placeholder="Enter Password" ref="password" name="psw" required />
            <div align="center">
              <button type="submit" className="btn" id="btn">Login</button>
            </div>
            <div><br />
              <a onClick={this.getUsertype.bind(this)} href="javascript:void(0);" > Forgot Password?</a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default loginPage;
