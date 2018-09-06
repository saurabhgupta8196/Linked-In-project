import React, { Component } from 'react';
import '../App.css';
import clogo from './img/clogo.png';
import backgroundimage from './img/backgroundimage.jpg';
import logo from '../logo.svg';
import PostComponent from './posts';
import JobListComponent from './job-list';
import axios from 'axios';
const HOST = 'http://10.102.55.73:8080';

// import cap from './img/cap.png';
// import cview from './img/cview.png';
// import viewjobs from './viewjobs';
// import cors from 'cors';

class CompanyProfile extends Component {
  
  constructor(props) {
    
    super(props);
    this.state={
      // userId: "Akhil",
    }
  }
  
  seejobs(companyId) {
    window.open('/viewjobs/'+companyId, '_self');
  }

  componentWillMount(){ 
    //this.checkStatus();     
  }

  handleFollowAndUnfollow(followSts, companyId, userId){    
    
    if (followSts === "FOLLOW") {

      axios.post(HOST + '/orgs/add-follower/', { "companyId": companyId, "follower": userId }).then(response => {

        alert("1" + response.data[0]);
      }).catch(function (error) {
        console.log(error);
        alert("Error1");
      });

    }
    if (followSts === "UNFOLLOW") {

      axios.post(HOST + '/orgs/remove-follower/', { "companyId": companyId, "follower": userId }).then(response => {
       
        alert("2" + response.data[0]);        
      }).catch(function (error) {
        console.log(error); alert("Error2");
      });

    }
    // window.open('/profile', '_self');
  }
  render() {
    
    let post;
    if (this.props.states.posts) {
      post = this.props.states.posts.map(todo => {
        return (
          <PostComponent key={todo.postId} company={this.props.states.company} followersCount={this.props.states.followersCount} post={todo} />
        );
      });
    }
    let followSts = "FOLLOW";
    for (let follower of this.props.states.followers) {
      if (follower === this.props.states.userId) {
        followSts = "UNFOLLOW";
        break;
      }
    }



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

            <button className="btn btn-outline-primary btn-sm btn-follow" onClick={this.handleFollowAndUnfollow.bind(this, followSts, this.props.states.company.companyID, this.props.states.userId)}>{followSts}</button>

            <button className="btn btn-primary btn-sm btn-job"  onClick={this.seejobs.bind(this, this.props.states.company.companyID)}>JOBS</button>
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

        <div className="recent">
        <h2>Recent Updates</h2>
        {post}
          {/*<PostComponent posts={this.props.states.posts}></PostComponent>*/}
        </div>   
      </div>
    
    );
  }
}

export default CompanyProfile;
