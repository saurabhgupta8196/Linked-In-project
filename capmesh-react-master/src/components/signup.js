import React, { Component } from 'react';
import './signup.css';
import axios from "axios";
import { Link } from 'react-router-dom';
class Signup extends Component {
   state={
       
        userNameError :null,
        nameError : null,
        emailError : null,
        numError:null,
        passwordError:null,
        confirmPasswordError:null,

        userName:null,
        name:null,
        email:null,
        number:null,
        password:null,
        gender:null,
        dateOfBirth:null

    }
    verifyUserName(e){
        var userName = e.target.value;
        console.log('kuch bhi')
        if(userName.match(/^[a-zA-Z0-9]{6,15}$/)){
        this.setState({userNameError : null,userName});
        var url = 'http://10.102.55.73:8080/rest/api/users/uniqueUserName';
        axios.post(url,{userName:userName}).then(response => {
            console.log(response)
        if(!response.data){
            this.setState({userNameError : "Username already exists"});
        }
         });

    }
    else{
        this.setState({userNameError : "Username should be alphanumeric of length 6 to 15"});

    }
}
verifyName(e){
        var uName = e.target.value;
        if(uName.match(/^[a-zA-Z ]+$/)){
        this.setState({nameError : null,name : uName});
    }
    else{
        this.setState({nameError : "Name should contain only letters"});
    }
}
verifyEmail(e){
        var email = e.target.value;
        if(email.match(/^[\w/.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)){
        this.setState({emailError : null,email});
        var url = 'http://10.102.55.73:8080/rest/api/users-orgs/uniqueEmail';
        axios.post(url,{email:email}).then(response => {
        if(!response.data){
            this.setState({emailError : "Email already exists"});
        }
         });
    }
    else{
        this.setState({emailError : "Please enter valid email"});
    }
}
verifyNumber(e){
        var number = e.target.value;
        if(number.match(/^[9/8/7/6][0-9]{9}$/)){
        this.setState({numError : null,number});
    }
    else{
        this.setState({numError : "Please enter valid phone number of 10 digits"});
    }
}

verifyPassword(e){
        var password = e.target.value;
        if(password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/)){
        this.setState({passwordError : null,password});
    }
    else{
        this.setState({password,passwordError : "Password should contain atleast a capital letter,a small letter and a number of length 8-15 "});
    }
}

verifyConfirmPassword(e){
        var confirmPassword = e.target.value;
        if(confirmPassword === this.state.password){
        this.setState({confirmPasswordError : null});
    }
    else{
        this.setState({confirmPasswordError : "Passwords should match "});
    }
}
getGenderValue(e){
    this.setState({gender:e.target.value});
}
submitUserDetails(e){
      e.preventDefault()
     var a = this.state
    if(a.userNameError != null||a.nameError != null||a.emailError != null
    ||a.numError != null||a.passwordError != null||a.confirmPasswordError != null ){
        alert("Please fill all the fields correctly and Submit")
    }
    else{

        var userFormData = {
             userName: a.userName,
        name: a.name,
        email: a.email,
        mobile: a.number,
        gender: a.gender,
        dateOfBirth: document.getElementById("dob").value,
        password : a.password
    }
    
        var url = 'http://10.102.55.73:8080/rest-api/users/signup';
    axios.post(url,userFormData).then(response => {
         var myval = response.data;
      window.open('/LinkVerification/'+'user'+"/"+myval[0].userName+"/"+myval[0].verificationCode,'_blank',"height=500,width=700");
        window.open('/Login','_self');
    });
}

}

  render() {
      var img3 = require('./logo.JPG');
    return (
      <div className="Signup">
     <div id="bg-img">
         <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#"><img src={img3} alt="LOGO" /></a>               
            </div>
             <ul className="nav navbar-nav navbar-right">
            <li><Link to={'/'}><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
            <li><Link to={'/login'}><span className="glyphicon glyphicon-user"></span> Login</Link></li>

          </ul>
          </div>      
        </nav>
  <div className="containerCSS">
        
    <form onSubmit={this.submitUserDetails.bind(this)}>
      <Link to={'/Organization'}><input className="btn btn-primary btn-sm" type="button" id="orgSingup" value="Company Signup"/></Link>
      <h1 id="userH1">User Sign Up</h1>

      <div>
      <label className="control-label">User Name :</label>
      <input onChange={this.verifyUserName.bind(this)}  className="form-control" type="text" name="userName" required/>
      <div className="errorMessage">{this.state.userNameError}</div>
     </div>

     <div>
      <label className="control-label">Name :</label>
      <input className="form-control" onChange={this.verifyName.bind(this)}  type="text" name="name" required/>
      <div className="errorMessage">{this.state.nameError}</div>
     </div>

     <div>
      <label className="control-label"> Email : </label>
      <input className="form-control" onChange={this.verifyEmail.bind(this)} type="text" name="email" required/>
      <div className="errorMessage">{this.state.emailError}</div>
        </div>
      <div>
      <label className="control-label">Phone Number : </label>
      <input className="form-control" onChange={this.verifyNumber.bind(this)} type="number" name="number" required />
      
      <div className="errorMessage">{this.state.numError}</div>
      </div>
        
        <label className="control-label">Password : </label>
        <input className="form-control" onChange={this.verifyPassword.bind(this)} type="password" name="password"  required/>
        <div className="errorMessage">{this.state.passwordError}</div>
     

        <label className="control-label">Confirm Password : </label>
        <input className="form-control"  onChange={this.verifyConfirmPassword.bind(this)} type="password" name="confirmPassword"  required/>
       <div className="errorMessage">{this.state.confirmPasswordError}</div>

      <label className="control-label">Date Of Birth : </label>
      <input className="form-control"  type="date" name="dob"  id="dob" required/>      

      <label className="control-label">Gender : </label>
        <div onChange={this.getGenderValue.bind(this)}>
        <input type="radio" name="gender" value="Male"  required/> Male
        <input  type="radio" name="gender" value="Female"  required/> Female
            </div>

     
      <br/>
      <div>
        <input className="btn btn-success" id="sumbitBtnId" type="submit" value="Sign Up"  />

      </div>
      

    </form>
  </div>
</div>
      </div>
    );
  }
}

export default Signup;
