import React, { Component } from 'react';


class Home extends Component {
    render() {
        console.log(this.props)
        return (
            <h1>{this.props.user}</h1>

        );
    }
}

export default Home;