import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import ApplicantComponent from './applicant';

const HOST = 'http://10.102.55.73:8080';
class CompanyJobComponent extends Component {
  constructor(props) {
    super(props);
    this.state={
        applicantList: [],
        applySts: "APPLY",
        followSts: "FOLLOW",        
        applicantCount: {},
        show: false,
        display: "none",
    }    
  }
  componentWillMount(){
    // this.getApplicantList(this.props.states.company.companyID, this.props.job.jobId);
    // this.getApplicantCount(this.props.states.company.companyID, this.props.job.jobId); 
  }

    changeShow(){
       
        if(this.state.display === "none")
            this.setState({display: "block"});
        else this.setState({display: "none"});
    }

    //getting applicant-list count for particular job of a particular company
    getApplicantCount(companyId, jobId) {
        axios.post(HOST + '/rest-api/orgs/applicant-count', { "companyId": companyId, "jobId": jobId }).then(response => {
            //console.log("getApplicantCount", response.data)
            this.setState({applicantCount: response.data});
            //return response.data;
        }).catch(function (error) {
            console.log(error);
        });
    }

  //getting applicant-list for particular job of a particular company
  
    getApplicantList(companyId, jobId) {
        axios.post(HOST + '/rest-api/orgs/applicant-list', { "companyId": companyId, "jobId": jobId }).then(response => {
            console.log(response.data);
            this.setState({applicantList: response.data});            
        }).catch(function (error) {
            console.log(error);
        });        
    }
  remove(companyId, jobId){
      axios.post(HOST + '/rest-api/orgs/removeJob', { "companyId": companyId, "jobId": jobId }).then(response => {
          console.log(companyId, jobId);
          alert("job Deleted");
          //return response.data;
      }).catch(function (error) {
          console.log(error);
      });
      window.open('/cviewjobs/'+this.props.states.company.companyID, '_self');
  }


  handleApplicant(companyId, jobId){
      this.changeShow();
      console.log(companyId, jobId);
      this.getApplicantList(companyId, jobId);
      this.getApplicantCount(companyId, jobId);        
      //window.open('/applicants', '_self');
  }
render() {
    //console.log(this.props);
    
    let applicant;
        if (this.state.applicantList) {
            applicant = this.state.applicantList.map(todo => {                
                return (
                    <ApplicantComponent applicant={todo}/>
                );
            }); 
        }
    return (
        
      <div className="jobList">
          <div className="float-left">
              <p><b>Job Position:</b> {this.props.job.position}</p>
          </div>          
          <div className="float-none">
              <p><b>Last Date to Apply:</b> {this.props.job.lastDate}</p>
          </div>
          <div className="float-right">
              {/*<button className="btn btn-success" onClick={this.handleApplicant.bind(this, this.props.states.company.companyID, this.props.job.jobId)}> SEE APPLICANTS</button>*/}

              <button className="btn btn-success" onClick={this.handleApplicant.bind(this, this.props.states.company.companyID, this.props.job.jobId)}> SEE APPLICANTS</button>

              {/* <button className="btn btn-danger btn-job" onClick={this.remove.bind(this, this.props.states.company.companyID, this.props.job.jobId)}>REMOVE</button> */}
          </div>
          <div id="showApplicants" style={{display: this.state.display}}>
              <h4><b>Total Applicants: {this.state.applicantCount.length}</b></h4>
              <ul>
                 {applicant}
              </ul>
          </div>
      </div>
    );
  }
}

export default CompanyJobComponent;
