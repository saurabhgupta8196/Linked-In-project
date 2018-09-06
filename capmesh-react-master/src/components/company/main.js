import React, { Component } from 'react';
import '../../App.css';
import CompanyUserProfile from './profile';
import axios from 'axios';
import Header from './header';

const HOST = 'http://10.102.55.73:8080';

// const services = new Service();
class MainCompanyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "WELCOME TEST",
      // companys: services.getCompanyDetails("C003"),
      company: {},
      alljobDetails: [],
      jobDetails: {},
      getApplicants: [],
      getApplicantsCount: 0,
      followersCount:0,
      aboutCompany:"",
      posts: [],
      //userId: "Pawan",
    };    
  } 
//**************************************************** */
  //get particular company details
  getCompanyDetails(companyId) {
    axios.post(HOST + '/rest-api/orgs/get/', { "companyId": companyId }).then(response => {
      console.log(response.data[0]);
      this.setState({followersCount: response.data[0].profile.followers.length});
      this.setState({aboutCompany: response.data[0].profile.about});
      this.setState({posts: response.data[0].profile.post});
      this.setState({company: response.data[0]});
    }).catch(function (error) {
      console.log(error);
    });
  }
//**************************************************** */
 componentWillMount() {
    this.getCompanyDetails(this.props.user); //
  }

render() {
    //console.log("In render", this.state.company);
    return (
      <div>
        <Header />
      <div className="">        
        {/*<Router >
          <Switch>    
            <Route exact path='/viewjobs' component={JobListComponent} />
          </Switch>
        </Router>*/}
        <CompanyUserProfile states={this.state}></CompanyUserProfile>
      </div>
      </div>
    );
  }
}
export default MainCompanyComponent;
