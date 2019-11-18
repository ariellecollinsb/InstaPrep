import React from "react";
import UserContext from '../UserContext'
import API from "../utils/API";

// reactstrap components
import { Button, Card, Container, Row, Col } from "reactstrap";

// core components
import DefaultNavBar from "../components/Navbars/DefaultNavBar.js";

class LogoutPage extends React.Component {
  static contextType = UserContext;

  componentWillMount() {
    document.body.classList.add("logout-page");
  }
  componentWillUnmount() {
    document.body.classList.remove("logout-page");
  }
  componentDidMount() {
    API.logout().then(() => {
      this.context.setUser({});
    });
  }
  render() {
    return (
      <>
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
                  <h3 className="title mx-auto">Log Out</h3>
                  <h5 className=" mx-auto">You have now logged out </h5>

                  <Button block className="btn-round mt-3" color="danger" href="/">
                    Return
                  </Button>
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

export default LogoutPage;
