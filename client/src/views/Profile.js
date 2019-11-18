import React from "react";
import { Redirect } from "react-router-dom"
import UserContext from '../UserContext'
import {
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import DefaultNavBar from "../components/Navbars/DefaultNavBar.js";
import RandomPageHeader from "../components/Headers/RandomImageHeader.js";
import Footer from "../components/Footers/Footer.js";

class ProfilePage extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }
  componentDidMount() {
    if (this.context.isAuthenticated()) {
      this.setState(
        prevState => ({
          user: this.context.user
        })
      );
    }
  }
  componentWillMount() {
    document.body.classList.add("profile-page");
  }
  componentWillUnmount() {
    document.body.classList.remove("profile-page");
  }

  authRedirect() {
    if (!this.context.isAuthenticated()) {
      return <Redirect to='/login' />
    }
  }

  render() {
    return (
      <>
        {this.authRedirect()}
        <DefaultNavBar />
        <RandomPageHeader />
        <div className="section profile-content">
          <Container>
            <div className="owner">
              <div className="avatar">
                <img
                  alt="..."
                  className="img-circle img-no-padding img-responsive"
                  src={this.state.user.photo ? this.state.user.photo : require('../assets/img/default-avatar.png')}
                />
              </div>
              <div className="name">
                <h4 className="title">
                  {this.state.user.name} <br />
                </h4>
                <h6 className="description">About</h6>
              </div>
            </div>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="6">
                <p>
                  {this.state.user.age} year old {this.state.user.gender} <br />
                  {this.state.user.about}
                </p>
              </Col>
            </Row>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="6">
                <h6 className="description">Interests</h6>
                {!this.state.user.interests ? null :
                  this.state.user.interests.map(item => (
                    <div key={item}>{item}</div>
                  ))
                }
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </>
    );
  }

}

export default ProfilePage;
