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

class DiscoverPage extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      savedMeals: [],
      selectedMeal: {
        meal: undefined,
        week: undefined,
        day: undefined
      },
      toast: false,
      modal: false
    }
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.showToast = this.showToast.bind(this);
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    })
  }

  showToast() {
    this.setState({
      toast: true
    })

    setTimeout(() => {
      this.setState({
        toast: false
      });
    }, 1000);
  }

  componentDidMount() {
    API.getRandomRecipe()
      .then((response) => {
        this.setState({
          searchResults: response.data
        })
      });
  }

  handleKeyDown(event) {
    if (event.keyCode === 13) {
      API.getRecipes(event.target.value)
        .then((response) => {
          this.setState({
            searchResults: response.data
          })
        })
    };
  }
  handleChangeInput(event) {
    let value = event.target.value;
    let name = event.target.name;
    this.setState(
      prevState => ({
        selectedMeal: {
          ...prevState.selectedMeal,
          [name]: value
        }
      })
    );
  }

  onAddMealClick(meal) {
    this.setState(
      prevState => ({
        modal: true,
        selectedMeal: {
          ...prevState.selectedMeal,
          meal: meal,
          week: moment().startOf("week").toDate(),
          day: "Sunday",
        }
      })
    );
  }

  addMeal() {
    API.addMeal(this.state.selectedMeal);
    this.toggleModal();
    this.showToast();
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
        <div className="fixed-top d-flex justify-content-center " style={{ zIndex: 1000 }} data-animation="true">
          <Toast isOpen={this.state.toast}>
            <ToastBody>
              Meal Added
          </ToastBody>
          </Toast>
        </div>
        <DefaultNavBar />
        <RandomImageHeader />
        <div className="section profile-content">
          <Container>
            <div className="search">
              <div className="search-input">
                <Input placeholder="Search..." bsSize="lg" onKeyDown={this.handleKeyDown} />
              </div>
            </div>
            <Row className="ml-auto mr-auto text-center row-cols-1 row-cols-md-2 row-cols-lg-3">

              {/*<Container>
                  <CardColumns> */}
              {!this.state.searchResults ? null : this.state.searchResults.map((item, i) => (
                <Col key={"column_" + i} className="ml-auto mr-auto text-center mb-4">
                  <Card className="card-plain" style={{ width: '20rem' }} key={i}>
                    <CardHeader>{item.title}</CardHeader>
                    <CardBody>
                      <CardText>{item.ingredients}.</CardText>
                      <Button href={item.href} target={"_blank"}>View</Button>
                      {' '}
                      <Button className="btn-success" data-meal={JSON.stringify(item)} onClick={() => this.onAddMealClick(item)}>Add</Button>
                    </CardBody>
                  </Card>
                </Col>
              ))}
              {/*</CardColumns>
                </Container>*/}
            </Row>
          </Container>
        </div>
        <Modal isOpen={this.state.modal}>
          <ModalHeader toggle={this.toggleModal}>Add Meal</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="week">Week</Label>
              <Input type="select" name="week" id="week" onChange={this.handleChangeInput}>
                {weeks}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="day">Day</Label>
              <Input type="select" name="day" id="day" onChange={this.handleChangeInput}>
                <option>Sunday</option>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.addMeal()}>Save</Button>{' '}
            <Button color="secondary" onClick={() => this.toggleModal()}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Footer />
      </>
    );
  }
}

export default DiscoverPage;
