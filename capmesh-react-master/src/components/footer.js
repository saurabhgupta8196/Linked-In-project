import React, { Component } from 'react';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div>
                <div class="fill-up-footer fixed-bottom">
                    <footer class="page-footer font-small indigo">
                        {/*<!-- Footer Links -->*/}
                        <div class="container text-center text-md-left">
                            {/*<!-- Grid row -->*/}
                            <div class="row ">
                                {/*<!-- Grid column -->*/}
                               
                                {/*<!-- Grid column -->*/}

                            </div>
                            {/*<!-- Grid row -->*/}

                        </div>
                        {/*<!-- Footer Links -->*/}

                        {/*<!-- Copyright -->*/}
                        <div class="footer-copyright text-center py-3">© 2018 Copyright:
      <a className='btn btn-link' href="https://10.102.55.73:4200/home"> JS Full stack 13th June batch @ Capgemini India Pvt. Ltd.</a>
                        </div>
                        {/*<!-- Copyright -->*/}

                    </footer>
                </div>

            </div>
        );
    }
}
 
export default Footer;