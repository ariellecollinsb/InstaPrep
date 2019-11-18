import React from "react";

// reactstrap components
import {
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import DefaultNavBar from "../components/Navbars/DefaultNavBar.js";
import HomePageHeader from "../components/Headers/HomePageHeader";
import Footer from "../components/Footers/Footer.js";

function HomePage() {
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });
  return (
    <>
      <DefaultNavBar />
      <HomePageHeader />
      <div className="main">
        <div className="section text-center">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <h2 className="title">What is InstaPrep?</h2>
                <h5 className="description">
                  This is a description of the website.  Write a quick description about what the website provides to its users as well as the benfits of using it.  This should take up a few lines
                </h5>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
