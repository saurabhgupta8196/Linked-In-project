import React, { Component } from 'react';

class passwordUpdate extends Component {
    pwdUpdate(){
        window.close();
    }
    render() {
        return (
            <div align="center">
                <h2>Your password is changed </h2>
                <button type="submit" onClick={this.pwdUpdate.bind(this)} className="btn btn-success" >Go To Login Page</button>
            </div>
        );
    }
}

export default passwordUpdate;