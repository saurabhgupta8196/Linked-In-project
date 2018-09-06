import React, { Component } from 'react';
import './App.css';
import CompanyProfile from './company-profile';
import axios from 'axios';

const HOST = 'http://10.102.55.73:8080';

// const services = new Service();
class Apps extends Component {

  constructor(props) {
    super(props);
    this.state = {
      test: "WELCOME TEST",
      currentCompanyId: '', //from url params
      company: {},
      alljobDetails: [],
      jobDetails: {},
      getApplicants: [],
      getApplicantsCount: 0,
      followersCount:0,
      aboutCompany:"",
      posts: [],
      userId: sessionStorage.getItem('userName'), //current userName
      followers: [],
    };    
  } 

//**************************************************** */
  //get particular company details
  getCompanyDetails(companyId) {

    axios.post(HOST + '/rest-api/orgs/get/', { "companyId": companyId }).then(response => {
      this.setState({followersCount: response.data[0].profile.followers.length});
      this.setState({aboutCompany: response.data[0].profile.about});
      this.setState({posts: response.data[0].profile.post});
      this.setState({company: response.data[0]});
      this.setState({followers: response.data[0].profile.followers});
    }).catch(function (error) {
      console.log(error);
    });
  }


//**************************************************** */
 
  componentWillMount() {
    this.getCompanyDetails(this.props.match.params.id);   
  }
componentWillUpdate(){
  this.getCompanyDetails(this.props.match.params.id);
}


  render() {
    //console.log("In render", this.state.company);
    return (
      <div className="">        
        {/*<Router >
          <Switch>    
            <Route exact path='/viewjobs' component={JobListComponent} />
          </Switch>
        </Router>*/}
        <CompanyProfile states={this.state}></CompanyProfile>
      </div>
    );
  }
}

export default Apps;
