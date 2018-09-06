import React, { Component } from 'react';
import PostComponent from "./posts";
import axios from 'axios';

import '../../App.css';
import clogo from './clogo.png';
import logo from '../../logo.svg';
// import PostComponent from './posts';
// import JobListComponent from './job-list';
const HOST = 'http://10.102.55.73:8080';

// import cap from './img/cap.png';
// import cview from './img/cview.png';
// import viewjobs from './viewjobs';
// import cors from 'cors';

class CompanyUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state={
      
    }    
  }
  addJob(e) {
    e.preventDefault();
   //console.log("addJob", this.props.states.company.companyID, this.refs.jobPosition.value, this.refs.lastDate.value);
    axios.post(HOST + '/rest-api/orgs/postJob', { companyId: this.props.states.company.companyID, jobPosition: this.refs.jobPosition.value, timestamp: "2015-12-21T00:00:00Z", lastDate: this.refs.lastDate.value }).then(response => {
            alert("Added Successfully");
            this.refs.jobPosition.value = "";
            this.refs.lastDate.value = "";
            //console.log(response.data)
            return response.data;
        }).catch(function (error) {
            console.log(error);
        });
      this.refs.jobPosition.value = null;
      this.refs.lastDate.value = null;
  }


  addPost(e){
    e.preventDefault();
    axios.post(HOST + '/rest-api/orgs/add-post', { companyId: this.props.states.company.companyID, content: this.refs.postContent.value }).then(response => {
      //console.log(response.data)
      alert("OK");
      this.refs.postContent.value = "";
      return response.data;
    }).catch(function (error) {
      console.log(error);
    });
  }


  seejobs() {
    window.open('/cviewjobs/'+this.props.states.company.companyID, '_self');
  }


  handleAddJob() {}
  handleAddPost(){}
  componentWillMount(){}
render() {

    let post;
        if (this.props.states.posts) {
            post = this.props.states.posts.map(todo => {                
                return (
                    <PostComponent key={todo.postId} company={this.props.states.company} followersCount={this.props.states.followersCount} post={todo} />
                );
            }); 
        }
    
    //console.log("In profile", this.props.states.posts);
    //
    return (
    
      <div className="">

        <div className="shadows">
          <div className="float-none">
            <img className="img-rounded customImg" src={clogo} />
          </div>
          <div className="customHeader">
            <h1>{this.props.states.company.name}</h1>
            {/*</div>
        <div className="customStyle1">*/}
            <ul className="list-unstyled">
              <li>{this.props.states.company.location}&nbsp; | &nbsp;{this.props.states.company.areaOfWork}</li>
            </ul>
            <p><img src={logo} />&nbsp;&nbsp;Followers&nbsp;: &nbsp;{this.props.states.followersCount}</p>
          </div>
          <div className="btnFJ">
            
            <button className="btn btn-outline-primary btn-sm btn-follow"  data-toggle="modal" data-target="#postModal" onClick={this.handleAddPost.bind(this)}>&nbsp;+ &nbsp;ADD POST&nbsp;&nbsp;&nbsp;</button>


            <button className="btn btn-primary btn-sm btn-job" data-toggle="modal" data-target="#myModal"  onClick={this.handleAddJob.bind(this)}>ADD JOB</button>

            <button className="btn btn-primary btn-sm btn-job"  onClick={this.seejobs.bind(this)}>JOBS</button>

          </div>          
        </div>

        <div className="shadows1">
          <div className="about">
            <h4><b>About us</b></h4>
            <p>{this.props.states.aboutCompany}</p>
          </div>
          <div className="details">
            <h4><b>Company Details</b></h4>
            <div className="">
              <p><b>Headquarter : </b>&nbsp;{this.props.states.company.location}</p>
              <p><b>Email : </b>&nbsp;{this.props.states.company.email}</p>              
            </div>
          </div>
        </div>

        <div>
        <h2>Recent Updates</h2>
        {post}
          {/*<PostComponent posts={this.props.states.posts}></PostComponent>*/}
        </div> 

{/**/}
  <form id="jobForm" name="jobForm" onSubmit={this.addJob.bind(this)}>
                <div className="container">
                    {/*<button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal"> post</button>*/}
                    <div className="modal fade" id="myModal" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header" align="center">
                                    <h4 className="modal-title">Post a Job</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div className="modal-body" align="center">
                                    <div className="form-group">
                                        <input className="form-control" ref="companyname" value={this.props.states.company.name} type="text" name="companyname" placeholder="Company" size="30" disabled required/>
                                        
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" ref="jobPosition" type="text" placeholder="Job Title" size="30" required/>
                                        
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" type="date" ref="lastDate" placeholder="Last Date" required/>
                                    </div>
                                    <input className="btn btn-success" type="submit" value="Submit" />
                                </div>
                                <div className="modal-footer " >
                                    <button className="btn btn-danger" type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </form>


            {/**/}
  <form name="jobForm" onSubmit={this.addPost.bind(this)}>
                <div className="container">
                    {/*<button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal"> post</button>*/}
                    <div className="modal fade" id="postModal" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header" align="center">
                                    <h4 className="modal-title">Add Post</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div className="modal-body" align="center">
                                    
                                    <div className="form-group">
                                        <textarea className="form-control" ref="postContent" type="text" placeholder="Add Post content here" size="30" required/>
                                        
                                    </div>
                                    
                                    <input className="btn btn-success" type="submit" value="Submit" />
                                </div>
                                <div className="modal-footer " >
                                    <button className="btn btn-danger" type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </form>
      </div>
    
    );
  }
}

export default CompanyUserProfile;
