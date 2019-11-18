import React from "react";

// reactstrap components
import {
  Button,
  Card, CardImg, CardBody, CardTitle, CardText, CardColumns, CardHeader,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import DefaultNavBar from "../components/Navbars/DefaultNavBar.js";
import RandomImageHeader from "../components/Headers/RandomImageHeader";
import Footer from "../components/Footers/Footer.js";
import UserContext from '../UserContext'
import API from "../utils/API";

class DiscoverPage extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      searchResults: []
    }
  }

  componentDidMount() {
    API.getRandomRecipe()
      .then((response) => {
        this.setState({
          searchResults: response.data
        })
      });
  }

  addMeal(meal) {
    console.log(meal)
  }

  render() {
    return (
      <>
        <DefaultNavBar />
        <RandomImageHeader />
        <div className="section profile-content">
          <Container>
            <div className="search">
              <div className="search-input">
                <Input placeholder="Search..." bsSize="lg" />
              </div>
            </div>
            <Row className="ml-auto mr-auto text-center">
              <Col className="ml-auto mr-auto text-center" md="12">
                <Container>
                  <CardColumns>
                    {!this.state.searchResults ? null : this.state.searchResults.map((item, i) => (
                      <Card style={{ width: '20rem' }} key={i}>
                        <CardHeader>{item.title}</CardHeader>
                        <CardBody>
                          <CardText>{item.ingredients}.</CardText>
                          <Button href={item.href} target={"_blank"}>View</Button>
                          {' '}
                          <Button data-meal={JSON.stringify(item)} onClick={() => this.addMeal(item)}>Add</Button>
                        </CardBody>
                      </Card>
                    ))}
                  </CardColumns>
                </Container>
              </Col>

            </Row>

          </Container>
        </div>
        <Footer />
      </>
    );
  }
}

export default DiscoverPage;
