import React, { Component } from 'react';
import './Mail.css';
import axios from "axios";
const HOST = 'http://10.102.55.73:8080';

class Mail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }
    verify(e) {
        e.preventDefault();
        if(this.props.match.params.userType=="user"){
        var UserName=this.props.match.params.name;
        console.log(this.props.match.params.id);
        axios.post(HOST + '/rest/api/users/verification', {
            verificationCode:this.props.match.params.id,
            userName: this.props.match.params.name,

        }).then(response => {
            this.setState({ data: response.data });
            console.log(this.state.data);
            if (this.state.data == "done"){
                window.open("/changePassword/user/"+UserName, "");
                window.close("/forgotPassword")
                window.close();
            }
            else
            {
                alert("Not Verified");

            }
            
        }).catch(function (error) {
            console.log(error);
        });
    }
    else{
        var companyID=this.props.match.params.name;
        axios.post(HOST + '/rest/api/orgs/verification', {
            VerificationCode:this.props.match.params.id,
            companyID: this.props.match.params.name,

        }).then(response => {
            this.setState({ data: response.data });
            if (this.state.data == "done"){
                window.open("/changePassword/company/"+companyID, "");
                window.close("/forgotPassword")
                window.close();
            }
            else
            {
                alert("Not Verified");

            }
            
        }).catch(function (error) {
            console.log(error);
        });
    }
    
}
render() {
    return (
        <div>
            <br />
    
            <table align="center">
                <tr>
                    <td align="center">
                        <table>
                            <tr>
                                <td align="center">
                                    <h3>Verification Code</h3>
                                    
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table align="center" width="570" >
                                        <tr>
                                            <td className="content-cell">
                                                <h4>Hi,</h4>
                                                <p>You recently requested to reset your password for your CapMesh account. Use the button below to reset it. </p>
                                                <table className="body-action" align="center">
                                                    <tr>
                                                        <td align="center">
                                                            <table width="100%">
                                                                <tr>
                                                                    <td align="center">
                                                                        <table>
                                                                            <tr>
                                                                                <td>
                                                                                    <button className="btn btn-success" onClick={this.verify.bind(this)} >Reset your password</button>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                                <p> If you did not request a password reset, please ignore this email.</p>
                                                <p>Thanks,
                        <br />The CapMesh Team</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table className="email-footer" align="center" width="570" >
                                        <tr>
                                            <td className="content-cell" align="center">
                                                <p className="sub align-center">&copy; 2018 CapMesh. All rights reserved.<br />MIDC Park.</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    );
}
}

export default Mail;
