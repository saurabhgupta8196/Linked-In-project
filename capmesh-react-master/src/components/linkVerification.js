import React, { Component } from 'react';
import axios from "axios";

class LinkVerification extends Component {
    Id = null;
    verifiedUser(){
      console.log((this.props.match.params.whichone));
      if(this.props.match.params.whichone==='user'){
        this.Id = "userName";
          var userName =  this.props.match.params.id;
     var verificationCode = this.props.match.params.verificationCode;
      var url = 'http://10.102.55.73:8080/rest-api/users/activate/'+userName+"/"+verificationCode;
        axios.delete(url).then(response => {
          var mywindow=window.open('','_self');
          mywindow.document.write("successfully verified")
         });
      }
      else if(this.props.match.params.whichone==='company'){
        this.Id = "company ID"
          var companyID =  this.props.match.params.id;
     var verificationCode = this.props.match.params.verificationCode;
      var url = 'http://10.102.55.73:8080/rest-api/orgs/activate/'+companyID+"/"+verificationCode;
        axios.delete(url).then(response => {
          var mywindow=window.open('','_self');
          mywindow.document.write("successfully verified")
         });
      }
   else
   {
     alert("please don't change link");
   }

    }
  render() {
    return (
       <div>
        <p>Your account has been created successfully....!!!</p>
        <p color="red">Please, click on the below link to verify your account</p>
       {this.props.match.params.whichone} Id : {this.props.match.params.id}<br/>
        verification Link : <a onClick={this.verifiedUser.bind(this)}>{this.props.match.params.verificationCode}</a>
       </div>  
    );
  }
}

export default LinkVerification;



