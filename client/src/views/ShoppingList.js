import React from "react";
import API from "../utils/API";
import UserContext from '../UserContext'
import moment from 'moment';

// reactstrap components
import {
  Container, CardColumns, Input, ListGroup, ListGroupItem
} from "reactstrap";

// core components
import DefaultNavBar from "../components/Navbars/DefaultNavBar.js";
import RandomImageHeader from "../components/Headers/RandomImageHeader";
import Footer from "../components/Footers/Footer.js";
import MealItem from "../components/Meals/MealItem.js";

class ShoppingListPage extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {
      week: moment().startOf("week").toDate(),
      shoppingList: []
    }

    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  componentDidMount() {
    this.getShoppingList();
  }

  getShoppingList() {
    API.getShoppingList(this.state.week)
      .then((data) => {
        let shoppingList = data.data;
        shoppingList.sort();

        this.setState({
          shoppingList: shoppingList
        })
      });
  }

  componentWillMount() {
    document.body.classList.add("landing-page");
  }
  componentWillUnmount() {
    document.body.classList.remove("landing-page");
  }

  handleChangeInput(event) {
    let value = event.target.value;
    let name = event.target.name;
    this.setState(
      prevState => ({
        ...prevState,
        [name]: value
      }), this.getShoppingList
    );
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
        <div className="main">
          <div className="section text-center profile-content">
            <Container>
              <div className="search">
                <div className="search-input">
                  <Input type="select" name="week" id="week" bsSize="lg" onChange={this.handleChangeInput}>
                    {weeks}
                  </Input>
                </div>
              </div>

              {this.state.shoppingList.length === 0 ?
                <h3>No meals have been added for this week.</h3>
                :
                <ListGroup style={{ padding: "15px" }}>
                  {
                    this.state.shoppingList.map((v, i) => (
                      <ListGroupItem className="justify-content-between" action>
                        <h4 style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                          {v}
                        </h4>
                      </ListGroupItem>
                    ))
                  }
                </ListGroup>
              }

            </Container>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default ShoppingListPage;
