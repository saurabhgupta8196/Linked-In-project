import React, { Component } from 'react';
import '../../App.css';
import clogo from './clogo.png';
import logo from '../../logo.svg';



class PostComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
  render() {
    //console.log("In posts", this.props.post);
    return (
      <div className="shadows2">
          <div className="">
            <img className="img-rounded postImg" src={clogo} alt="Image" />
          </div>
          <div className="customHeaderX">
            <h6>{this.props.company.name}</h6>
            {/*</div>
        <div className="customStyle1">*/}
            <ul className="list-unstyled">
              <li><p><img src={logo} alt="Image"/>&nbsp;&nbsp;Followers&nbsp;: &nbsp;{this.props.followersCount} </p></li>
            </ul>            
          </div>
          <div className="postSection">
            <div>
              <p>
                {this.props.post.content}
                </p>
            </div>            
          </div>
        </div>
    );
  }
}

export default PostComponent;
