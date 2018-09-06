import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

import CompanyJobComponent from './job';
const HOST = 'http://10.102.55.73:8080';



class CompanyJobListComponent extends Component {
  constructor(props) {
    super(props);
    this.state={
        jobList: [],
        company: {},
    }    
  }
  componentWillMount(){
      this.allJobListOfCompany(this.props.match.params.id);
      this.getCompanyDetails(this.props.match.params.id);   
  }
allJobListOfCompany(companyId) {
        axios.post(HOST + '/rest-api/user/orgs/getJobList/', { "companyId": companyId }).then(response => {
            
            this.setState({jobList: response.data});
        }).catch(function (error) {
            console.log("error",error);
        });
    }
getCompanyDetails(companyId) {

    axios.post(HOST + '/rest-api/orgs/get/', { "companyId": companyId }).then(response => {

      this.setState({company: response.data[0]});
    }).catch(function (error) {
      console.log(error);
    });
  }  

  render() {
      //console.log(this.state.jobList);   
    let job;
        if (this.state.jobList) {
            job = this.state.jobList.map(todo => {                
                return (
                    <CompanyJobComponent key={todo.jobId} job={todo} states={this.state}/>
                );
            }); 
        }
    return (
        <div className="">
            <div className="">
                {job}
            </div>
        </div>
    );
  }
}
export default CompanyJobListComponent;
