import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
const HOST = 'http://10.102.55.73:8080';
class JobComponent extends Component {
  constructor(props) {
    super(props);
    this.state={
        applicantList: [],
        
        followSts: "FOLLOW",
    }    
  }
  componentWillMount(){
      console.log("In Job", this.props);
      this.getApplicantList(this.props.states.companyId, this.props.job.jobId);
  }

  
  //getting applicant-list for particular job of a particular company
    getApplicantList(companyId, jobId) {
        axios.post(HOST + '/orgs/applicant-list/', { "companyId": companyId, "jobId": jobId }).then(response => {
            console.log(response.data);
            this.setState({applicantList: response.data});            
        }).catch(function (error) {
            console.log(error);
        });        
    }

  apply(flag, companyId, jobId, userId){
      //console.log(companyId, jobId, userId);
       
      if(flag === "APPLIED"){ alert("You are already applied to this job....");}
      else{
              axios.post(HOST + '/orgs/add-applicant/', { "companyId": companyId, "jobId": jobId, "applicant": userId }).then(response => {
                  //console.log("addApplicant", response.data);
                  alert("Applied Successfully....");
              }).catch(function (error) {
                  console.log(error);
              });
         window.open('/viewjobs/'+this.props.states.companyId, '_self');
         
         
      }
            window.location.reload();
  }


  render() {
     var applySts = "APPLY";      
     var styleClass = "btn btn-primary";
      for(let applicant of this.state.applicantList){
          if (applicant === this.props.states.userId) {
              applySts = "APPLIED";
              styleClass = "btn btn-info";
          } 
      } 

    return (
      <div className="jobList">
          <div className="d-inline">
          <div className="float-left">
              <p><b>Job Position:</b> {this.props.job.position}</p>
          </div>
          <div className="pull-right">
              <button className={styleClass} onClick={this.apply.bind(this, applySts, this.props.states.company.companyID, this.props.job.jobId, this.props.states.userId)}>{applySts}</button>
          </div>
          </div>
          <div className="float-none">
              <p><b>Last Date to Apply:</b> {this.props.job.lastDate}</p>
          </div>
      </div>
    );
  }
}

export default JobComponent;
