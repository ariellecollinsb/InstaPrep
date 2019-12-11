import React from "react";

// reactstrap components
import {
  Button,
  Card, CardImg, CardBody, CardTitle, CardText, CardColumns, CardHeader,
  Input, Label, FormGroup,
  Container,
  Row, Col,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Toast, ToastBody
} from "reactstrap";

import moment from 'moment';

// core components
import DefaultNavBar from "../components/Navbars/DefaultNavBar.js";
import RandomImageHeader from "../components/Headers/RandomImageHeader";
import Footer from "../components/Footers/Footer.js";
import UserContext from '../UserContext'
import API from "../utils/API";

class BlogPage extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {
      blog: []
    }
  }


  componentDidMount() {
    API.getBlog()
      .then((response) => {
        this.setState({
          blog: response.data
        })
      });
  }

  render() {
    let weeks = [];
    let current = moment().startOf("week");
    let end = current.clone().add(3, 'w');
    let index = 0;
    while (current <= end) {
      weeks.push(<option value={current.toDate()} key={index++}>{current.format("dddd, MM/DD/YYYY")}</option>);
      current = current.clone().add(1, 'w');
    }
    return (
      <>
        <DefaultNavBar />
        <RandomImageHeader />
        <div className="section">
          <Container>
            <Row className="ml-auto mr-auto text-center row-cols-1 row-cols-md-2 row-cols-lg-3">
              {!this.state.blog ? null : this.state.blog.map((item, i) => (
                <Col key={"column_" + i} className="ml-auto mr-auto text-center mb-4">
                  <Card className="card-plain" style={{ width: '20rem' }} key={i}>
                    <a href={item.link} target={"_blank"}><CardImg top width="100%" src={item.image} alt="Card image cap" /></a>
                    <CardBody>
                      <CardTitle tag="a" href={item.link} target={"_blank"}>{item.title}.</CardTitle>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
        <Footer />
      </>
    );
  }
}

export default BlogPage;
