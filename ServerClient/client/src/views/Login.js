import React from "react";
import UserContext from '../UserContext'
import OAuth from '../components/OAuth'
import { Redirect } from 'react-router-dom'
// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";

// core components
import DefaultNavBar from "../components/Navbars/DefaultNavBar.js";
import API from "../utils/API";
const providers = ['google', 'github'];

class LoginPage extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: "",
        password: ""
      },
      authenticated: false
    }
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    document.body.classList.add("login-page");
  }
  componentWillUnmount() {
    document.body.classList.remove("login-page");
  }

  handleChangeInput(event) {
    let value = event.target.value;
    let name = event.target.name;
    this.setState(
      prevState => ({
        user: {
          ...prevState.user,
          [name]: value
        }
      })
    );
  }

  handleFormSubmit(event) {
    event.preventDefault();
    API.loginLocal(this.state.user)
      .then((response) => {
        if (response) {
          this.context.setUser({
            ...response.data.passport.user,
            registered: true
          });
        }
      });
  }

  authRedirect() {
    if (this.state.authenticated) {
      return <Redirect to='/profile' />
    }
  }

  render() {
    return (
      <>
        {this.authRedirect()}
        <DefaultNavBar />
        <div
          className="page-header"
          style={{
            backgroundImage: "url(" + require("../assets/img/header-bgs/3.jpg") + ")"
          }}
        >
          <div className="filter" />
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" lg="4">
                <Card className="card-register ml-auto mr-auto">
                  <h3 className="title mx-auto">Welcome</h3>
                  <h5 className=" mx-auto">Sign in with social accounts... </h5>
                  <div className="social-line text-center">
                    {providers.map(provider =>
                      <OAuth
                        provider={provider}
                        key={provider}
                        socket={this.context.socket}
                      />
                    )}
                  </div>
                  <hr />
                  <h5 className="mx-auto">Or with a password... </h5>
                  <Form className="register-form">
                    <label>Email</label>
                    <Input name="username" placeholder="Email" type="text" onChange={this.handleChangeInput} />
                    <label>Password</label>
                    <Input name="password" placeholder="Password" type="password" onChange={this.handleChangeInput} />
                    <Button block className="btn-round mt-3" color="danger" onClick={this.handleFormSubmit}>
                      Login
                  </Button>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Container>
          <div className="footer register-footer text-center">
            <h6>
              © {new Date().getFullYear()}, Arielle Collins
          </h6>
          </div>
        </div>
      </>
    );
  }
}

export default LoginPage;
