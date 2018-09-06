import React, { Component } from 'react';
import './signup.css';
import axios from "axios";
import { Link } from 'react-router-dom';

class Organization extends Component {
   state={
       
        companyIDError :null,
        companyNameError : null,
        emailError : null,
        areaOfWorkError:null,
        passwordError:null,
        confirmPasswordError:null,

        companyID:null,
        name:null,
        email:null,
        areaOfWork:null,
        about:null,
        password:null

    }
    verifyCompanyID(e){
        var companyID = e.target.value;
        if(companyID.match(/^[a-zA-Z0-9]{6,15}$/)){
        this.setState({companyIDError : null,companyID});
        var url = 'http://10.102.55.73:8080/rest/api/orgs/uniqueCompanyID';
        axios.post(url,{companyID:companyID}).then(response => {
        if(!response.data){
            this.setState({companyIDError : "Company ID already exists"});
        }
         });

    }
    else{
        this.setState({companyIDError : "Company ID should be alphanumeric of length 6 to 15"});

    }
}
verifyCompanyName(e){
        var uName = e.target.value;
        if(uName.match(/^[a-zA-Z ]+$/)){
        this.setState({companyNameError : null,name : uName});
    }
    else{
        this.setState({companyNameError : "Name should contain only letters"});
    }
}
verifyEmail(e){
        var email = e.target.value;
        if(email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)){
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
verifyAreaOfWork(e){
        var areaOfWork = e.target.value;
        
        this.setState({areaOfWork});
    
}
verifyAbout(e){
        var about = e.target.value;
        
        this.setState({about});
    
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
submitOrgsDetails(e){
       e.preventDefault()
    var a = this.state
    if(a.companyIDError != null||a.companyNameError != null||a.emailError != null
    ||a.areaOfWorkError != null||a.passwordError != null||a.confirmPasswordError != null ){
        alert("Please fill all the fields correctly and Submit")
    }
    else{

        var orgsFormData = {
             companyID: a.companyID,
        name: a.name,
        email: a.email,
        areaOfWork: a.areaOfWork,
        about:a.about,
        password : a.password
        }
        var url = 'http://10.102.55.73:8080/rest-api/orgs/signup';
    axios.post(url,orgsFormData).then(response => {
         var myval = response.data;
       window.open('/LinkVerification/'+'company'+"/"+myval[0].companyID+"/"+myval[0].verificationCode,'_blank',"height=500,width=700");
        window.open('/Login','_self');
    });
   

    }
}
  render() {
    return (
      <div className="Signup">
     <div className="bg-img">
         <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#"><img src="https://2016.export.gov/Pennsylvania/build/groups/public/@eg_us_nc/documents/webcontent/eg_us_nc_077246.jpg"
                alt="Dispute Bills" /></a>               
            </div>
             <ul className="nav navbar-nav navbar-right">
            <li><Link to={'/'}><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
            <li><Link to={'/login'}><span className="glyphicon glyphicon-user"></span> Login</Link></li>

          </ul>
          </div>      
        </nav>
  <div className="containerCSS">
        
    <form onSubmit={this.submitOrgsDetails.bind(this)}>
      <h1 id="alignmentH1">Company Sign Up</h1>
      <div>
      <label className="control-label">Company ID :</label>
      <input onChange={this.verifyCompanyID.bind(this)}  className="form-control" type="text" name="companyID" required/>
      <div className="errorMessage">{this.state.companyIDError}</div>
     </div>

     <div>
      <label className="control-label">Company Name :</label>
      <input className="form-control" onChange={this.verifyCompanyName.bind(this)}  type="text" name="companyName" required/>
      <div className="errorMessage">{this.state.companyNameError}</div>
     </div>

     <div>
      <label className="control-label"> Email : </label>
      <input className="form-control" onChange={this.verifyEmail.bind(this)} type="text" name="email" required/>
      <div className="errorMessage">{this.state.emailError}</div>
        </div>
      <div>
      <label className="control-label">Area of Work : </label>
      <input className="form-control" onChange={this.verifyAreaOfWork.bind(this)} type="text" name="areaOfWork" required />
      
      </div>
      <div>
      <label className="control-label">About : </label>
      <input className="form-control" onChange={this.verifyAbout.bind(this)} type="text" name="about" required />
      
      </div>
        
        <label className="control-label">Password : </label>
        <input className="form-control" onChange={this.verifyPassword.bind(this)} type="password" name="password"  required/>
        <div className="errorMessage">{this.state.passwordError}</div>
     

        <label className="control-label">Confirm Password : </label>
        <input className="form-control"  onChange={this.verifyConfirmPassword.bind(this)} type="password" name="confirmPassword"  required/>
       <div className="errorMessage">{this.state.confirmPasswordError}</div>

     
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

export default Organization;
