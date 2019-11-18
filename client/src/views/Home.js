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
                  Are you a foodie, who enjoys spending time in the kitchen, cooking for your family and friends? 
                  Do you live a hectic lifestyle that restricts your culinary exploits to the weekends- mainly Sundays? 
                  Are you ready to discover creative meal concepts and a way to have you eating healthy and happy all week long?
                  If your answer is yes to those, InstaPrep is an app that can make it happen!
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
