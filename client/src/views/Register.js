import React from "react";
import UserContext from '../UserContext'
import API from "../utils/API";
import { Redirect } from 'react-router-dom';

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col, FormGroup, Label } from "reactstrap";

// core components
import DefaultNavBar from "../components/Navbars/DefaultNavBar.js";

class RegisterPage extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      newUser: {
        email: "",
        password: "",
        name: "",
        age: 0,
        gender: "Male",
        interests: [],
        about: ""
      },
      registered: false,
      genderOptions: ["Male", "Female", "Other"],
      interestOptions: ["Meal Prep", "Fitness", "Nutrition"]
    }
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChangeTextarea = this.handleChangeTextarea.bind(this);
    this.handleChangeInterests = this.handleChangeInterests.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);

    document.body.classList.add("register-page");
  }
  componentWillMount() {
    document.body.classList.add("register-page");
  }
  componentWillUnmount() {
    document.body.classList.remove("register-page");
  }

  oauthDisplay() {
    if (this.context.isAuthenticated()) {
      return <>
        <img
          className="img-thumbnail img-responsive"
          src={this.context.user.photo}
          style={{ width: "50px", borderRadius: "0" }}
        />
        <label className="ml-3">{this.context.user.name}</label><br />
      </>
    }
  }

  handleChangeInput(event) {
    let value = event.target.value;
    let name = event.target.name;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          [name]: value
        }
      })
    );
  }

  handleChangeTextarea(event) {
    let value = event.target.value;
    let name = event.target.name;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          [name]: value
        }
      })
    );
  }

  handleChangeInterests(event) {
    const newSelection = event.target.value;
    let newSelectionArray;

    if (this.state.newUser.interests.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.newUser.interests.filter(
        s => s !== newSelection
      );
    } else {
      newSelectionArray = [...this.state.newUser.interests, newSelection];
    }

    this.setState(prevState => ({
      newUser: { ...prevState.newUser, interests: newSelectionArray }
    }));
  }

  handleFormSubmit(event) {
    event.preventDefault();
    var email = this.state.newUser.email;
    var name = this.state.newUser.name;
    var provider = "";

    if (this.context.isAuthenticated()) {
      email = this.context.user.email;
      name = this.context.user.name;
      provider = this.context.user.provider;
    }
    const newUser = {
      ...this.state.newUser,
      email: email,
      name: name,
      provider: provider
    }
    API.saveUser(newUser)
      .then(response => {
        const data = {
          ...this.context.user,
          ...response.data
        }
        console.log(data);
        this.context.setUser(data);
        this.setState({
          registered: true
        }, () => console.log(this.state));
      })
      .catch(error => {
        alert("Error saving user.");
      });
  }

  handleClearForm(event) {
    event.preventDefault();
    this.setState({
      newUser: {
        name: "",
        age: "",
        gender: "",
        interests: [],
        about: ""
      }
    });
  }

  authRedirect() {
    if (this.state.registered) {
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
                  <h3 className="title mx-auto">Register</h3>
                  <Form className="register-form">
                    {this.context.isAuthenticated() ?
                      this.oauthDisplay()
                      :
                      <>
                        <label>Email</label>
                        <Input name="email" placeholder="Email" type="text" onChange={this.handleChangeInput} />
                        <label>Password</label>
                        <Input name="password" placeholder="Password" type="password" onChange={this.handleChangeInput} />
                        <label>Name</label>
                        <Input name="name" placeholder="Name" type="text" onChange={this.handleChangeInput}></Input>
                      </>
                    }
                    <label>Age</label>
                    <Input name="age" placeholder="Age" type="number" onChange={this.handleChangeInput}></Input>
                    <label>Gender</label>
                    <Input name="gender" type="select" onChange={this.handleChangeInput}>
                      {
                        this.state.genderOptions.map((item) => (<option key={item}>{item}</option>))
                      }
                    </Input>
                    <label>About Me</label>
                    <Input name="about" placeholder="About Me" type="textarea" onChange={this.handleChangeTextarea}></Input>
                    <label>Interests</label><br />
                    {
                      this.state.interestOptions.map((item) => (
                        <FormGroup check key={item}>
                          <Label check>
                            <Input type="checkbox" onChange={this.handleChangeInterests} value={item} />{' '}
                            {item}
                            <span className="form-check-sign">
                              <span className="check"></span>
                            </span>
                          </Label>
                        </FormGroup>

                      ))
                    }
                    <Button block className="btn-round mt-3" color="danger" onClick={this.handleFormSubmit}>
                      Register
                  </Button>
                  </Form>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col className="ml-auto mr-auto" lg="4">
                <div className="text-center">
                  <h6>
                    © {new Date().getFullYear()}, Arielle Collins
                  </h6>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default RegisterPage;
