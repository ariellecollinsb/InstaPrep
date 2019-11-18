import React from "react";

// reactstrap components
import {
  Card, CardHeader, CardBody,
  ListGroup, ListGroupItem,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import StaticNavBar from "../components/Navbars/StaticNavBar";
import Footer from "../components/Footers/Footer.js";

function AttributionsPage() {
  React.useEffect(() => {
    document.body.classList.add("attributions-page");
    return function cleanup() {
      document.body.classList.remove("attributions-page");
    };
  });
  return (
    <>
      <StaticNavBar />
      <div className="main">
        <div className="section text-center">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <h2 className="title">Attributions</h2>
                <h4>This website was made with help from...</h4>
                <br /><br /><br />
              </Col>
            </Row>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <Card>
                  <CardHeader>Website Template</CardHeader>
                  <CardBody>
                    CreativeTim - <a target="_blank" rel="noopener noreferrer" href="http://www.creative-tim.com/product/paper-kit-react?ref=pkr-index-page">PaperKit React</a>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <Card>
                  <CardHeader>Unsplash Images</CardHeader>
                  <CardBody>
                    <ListGroup flush>
                      <ListGroupItem><a target="_blank" rel="noopener noreferrer" href="https://unsplash.com/photos/4_jhDO54BYg">Dan Gold</a></ListGroupItem>
                      <ListGroupItem><a target="_blank" rel="noopener noreferrer" href="https://unsplash.com/photos/-YHSwy6uqvk">Lilly Banse</a></ListGroupItem>
                      <ListGroupItem><a target="_blank" rel="noopener noreferrer" href="https://unsplash.com/photos/M4E7X3z80PQ">Brooke Lark</a></ListGroupItem>
                      <ListGroupItem><a target="_blank" rel="noopener noreferrer" href="https://unsplash.com/photos/-r5KSMkyoSc">Peter Wendt</a></ListGroupItem>
                      <ListGroupItem><a target="_blank" rel="noopener noreferrer" href="https://unsplash.com/photos/8xxW3z31k8A">David Fartek</a></ListGroupItem>
                    </ListGroup>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AttributionsPage;
