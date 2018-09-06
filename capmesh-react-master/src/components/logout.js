import React, { Component } from 'react';

class Logout extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        sessionStorage.removeItem('userName')
        window.location = 'http://10.102.55.73:3000'
    }
    render() { 
        return ( 
            <div></div>
         );
    }
}
 
export default Logout;