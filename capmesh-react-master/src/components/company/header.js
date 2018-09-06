import React, { Component } from 'react';
import logo from './logo.JPG';
import './header.css'
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
          

                <div  className="navbar navbar-black navbar-static-top">
                    <div className="navbar-header">
                        <button className="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-collapse"> <span className="sr-only">Toggle</span> 
                        <span className="icon-bar"></span> 
                        <span className="icon-bar"></span> 
                        <span className="icon-bar"></span> 
                        </button>
                        <a href="#postModal" role="button" data-toggle="modal" className="navbar-brand logo">Capmesh</a> 
                    </div>
                    <nav style={{float: "right"}} className="collapse navbar-collapse" role="navigation">
                        <ul className="nav navbar-nav">
                            <li> <a href="#postModal" role="button" data-toggle="modal"><i className="glyphicon glyphicon-home"/> Home</a> </li>                        
                            <li> <a href="#postModal" role="button" data-toggle="modal"><i className="glyphicon glyphicon-cloud"/> My Network</a> </li>
                            <li> <a href="#postModal" role="button" data-toggle="modal"><i className="glyphicon glyphicon-briefcase"/> Jobs</a> </li>
                            <li> <a href="#postModal" role="button" data-toggle="modal"><i className="glyphicon glyphicon-comment"/> Message</a> </li>
                            <li> <a href="#postModal" role="button" data-toggle="modal"><i className="glyphicon glyphicon-user"/> Me</a> </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right hidden-xs">
                            <li> <a href="#postModal" role="button" data-toggle="modal"><i className="fa fa-comment"></i></a></li>
                            <li> <a href="#postModal" role="button" data-toggle="modal"><i className="fa fa-flag"></i></a></li>
                            <li> <a href="#postModal" role="button" data-toggle="modal"><i className="fa fa-users"></i></a></li>
                            <li> <a href="#postModal" role="button" data-toggle="modal"><i className="fa fa-user"></i></a></li>
                        </ul>
                    </nav>
                </div>

          
        );
    }
}
 
export default Header;

/**
 * 
 */