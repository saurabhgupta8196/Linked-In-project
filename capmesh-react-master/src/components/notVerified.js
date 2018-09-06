import React, { Component } from 'react';
import axios from "axios";

class NotVerified extends Component {
    generateLink(){
        if(this.props.match.params.userType == "users"){
        var url = 'http://10.102.55.73:8080/rest-api/user/verify';
    axios.post(url, {
      userName: this.props.match.params.username,
    }).then(response => {
      console.log(response.data);
         var myval = response.data;
       var mywindow = window.open('/LinkVerification/user/'+myval[0].userName+"/"+myval[0].verificationCode,'_blank',"height=500,width=1000");
    });
}
else {
     var url = 'http://10.102.55.73:8080/rest-api/orgs/verify';
    axios.post(url, {
      companyID: this.props.match.params.username,
    }).then(response => {
      console.log(response.data);
         var myval = response.data;
       var mywindow = window.open('/LinkVerification/company/'+myval[0].companyID+"/"+myval[0].verificationCode,'_blank',"height=500,width=1000");
    });

}
    }
    render() {
        return (
            <div align="center">
                <h2>Your Account is NotVerified</h2><br/>
                 To verify your Account <br/>
                 <br/>
                 <button type="button" className="btn btn-primary" onClick= {this.generateLink.bind(this)}>Click Here</button>
             
                </div>


         );
    }
}

export default NotVerified;