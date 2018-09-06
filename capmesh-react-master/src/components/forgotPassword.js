import React, { Component } from 'react';
import './forgotPassword.css';
import axios from "axios";
const HOST = 'http://10.102.55.73:8080';
var name;
class forgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            err:null,
            message:null,
            name:null,
        };
    }
    findAcc(p) {
        if(this.props.match.params.userType=="users"){
        this.setState({name:this.refs.userName.value});
        p.preventDefault();
        axios.post(HOST + '/rest-api/user/forget-password', {
            userName: this.refs.userName.value,

        }).then(response => {
            this.setState({ data: response.data });
            // console.log(this.state.data);
            if (this.state.data) {
                this.setState({ message: "Verification code is sent" });
                window.open("/login","_self");
                console.log(this.state.data)
              window.open('/mail/user/' + this.state.data+'/'+this.state.name, "", "width=800, height=500");// Opens a new window  
    }
            else {
                this.setState({ err: "*Username Not Found" });
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
    else{
          this.setState({id:this.refs.userName.value});
        p.preventDefault();
        axios.post(HOST + '/rest-api/orgs/forget-password', {
            companyID: this.refs.userName.value,

        }).then(response => {
            this.setState({ data: response.data });
             console.log(this.state.data);
            if (this.state.data) {
                this.setState({ message: "Verification code is sent" });
                window.open("/login","_self");
              window.open('/mail/company/' + this.state.data+'/'+this.state.id, "", "width=800, height=500");// Opens a new window  
    }
            else {
                this.setState({ err: "*ID Not Found" });
            }
        }).catch(function (error) {
            console.log(error);
        });
        console.log(this.state.data);
    }
}

    cancel(){
        window.open("/login","_self");
    }
    render() {
        return (
            <div>
                <div className="container" >
                    <div className="col-xs-4">
                        <div id="divid" >
                            <form onSubmit={this.findAcc.bind(this)}>
                                <h1> First, let's find your account</h1>
                                <h3>Please enter your Username/ID </h3><label>Username/ID*: &nbsp;</label>
                                <input className="form-control" type="text" ref="userName" name="Username" id="name" placeholder="Enter your Username/ID" required /><p id="err">{this.state.err}</p><p id="msg">{this.state.message}</p>
                                <br />
                                <button type="button" onClick={this.cancel.bind(this)} className="btn btn-default">Cancel </button> &nbsp; &nbsp; &nbsp;
                                <button type="submit" className="btn btn-primary" >Find Account </button>

                            </form>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default forgotPassword;
