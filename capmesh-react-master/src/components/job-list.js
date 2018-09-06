import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

import JobComponent from './job';
const HOST = 'http://10.102.55.73:8080';



class JobListComponent extends Component {
  constructor(props) {
    super(props);
    this.state={
        jobList: [],
        company: {},
        userId: "Pawan", //session manager
        companyId : this.props.match.params.id,
    }    
  }
  componentWillMount(){
      this.allJobListOfCompany(this.state.companyId);
      this.getCompanyDetails(this.state.companyId);   
  }

allJobListOfCompany(companyId) {
        axios.post(HOST + '/orgs/getJobList/', { "companyId": companyId }).then(response => {
            //console.log("allJobListOfCompany", response.data);
            this.setState({jobList: response.data});
        }).catch(function (error) {
            console.log("error",error);
        });
    }

getCompanyDetails(companyId) {

    axios.post(HOST + '/orgs/get/', { "companyId": companyId }).then(response => {
    //   this.setState({followersCount: response.data[0].profile.followers.length});
    //   this.setState({aboutCompany: response.data[0].profile.about});
    //   this.setState({posts: response.data[0].profile.post});
      this.setState({company: response.data[0]});
    }).catch(function (error) {
      console.log(error);
    });
  }  

  render() {

    

    let job;
        if (this.state.jobList) {
            job = this.state.jobList.map(todo => {                
                return (
                    <JobComponent key={todo.jobId} job={todo} states={this.state}/>
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

export default JobListComponent;
