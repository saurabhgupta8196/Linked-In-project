import React, { Component } from 'react';
import '../App.css';


class ApplicantComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
componentWillMount() {}
 render() {
  return (
      <li className="">
          <a href="#">{this.props.applicant}</a>
      </li>
    );
  }
}
export default ApplicantComponent;
