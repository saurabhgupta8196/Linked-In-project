import React, { Component } from 'react';
import './ChangePassword.css'
import axios from "axios";
const HOST = 'http://10.102.55.73:8080';

class ChangePassword extends Component {
constructor(props) {
    super(props);
    this.state = {
      data: [],
       passwordError: null,
       passwordNotmatched: null,
        password: null
    };
  }
  verifyPassword(e){
        var password = e.target.value;
        if(password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/)){
        this.setState({passwordError : null,password});
    }
    else{
        this.setState({password,passwordError : "*Password should contain atleast a capital letter,a small letter and a number of length 8-15 "});
    }
}

verifyConfirmPassword(e){
        var confirmPassword = e.target.value;
        if(confirmPassword === this.state.password){
        this.setState({confirmPasswordError : null});
    }
    else{
        this.setState({confirmPasswordError : "*Passwords should match "});
    }
}
    submitUserDetails(e) {
    e.preventDefault();
   if(this.props.match.params.userType=="user"){
    axios.post(HOST + '/rest/api/users/change-password', {
      password: this.state.password ,
      userName:this.props.match.params.name,
    }).then(response => {
      this.setState({ data: response.data });
       if (this.state.data=="update done")
       {
           window.open("/passwordUpdate","_self");
       }
       else
       {
           alert("Password not updated");
       }
    }).catch(function (error) {
      console.log(error);
    });
   }
   else
   {
       axios.post(HOST + '/rest-api/orgs/change-password', {
      password: this.state.password ,
      companyID:this.props.match.params.name,
    }).then(response => {
      this.setState({ data: response.data });
       if (this.state.data=="done")
       {
           window.open("/passwordUpdate","_self");
       }
       else
       {
           alert("Password not updated");
       }
    }).catch(function (error) {
      console.log(error);
    });
   } 
  }
    render() {
        return (
                  <div className="Signup">
                           <div id="bg-img">
                               <div id="container1">
             <form >
      <h1>Change Password</h1>
      <label className="control-label">Password : </label>
        <input className="form-control" onChange={this.verifyPassword.bind(this)} type="password" id="password1" required/>
        <div className="errorMessage" id="err">{this.state.passwordError}</div>
     

        <label className="control-label">Confirm Password : </label>
        <input className="form-control"  onChange={this.verifyConfirmPassword.bind(this)} type="password" id="password2"  required/>
       <div className="errorMessage" id="err">{this.state.confirmPasswordError}</div>

        <div>
        <input className="btn btn-success" id="btn1" type="button" value="Change Password" onClick={this.submitUserDetails.bind(this)} />

      </div>
    </form>
    </div>
    </div>
    </div>
        );
    }
}

export default ChangePassword;