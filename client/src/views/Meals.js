import React from "react";
import API from "../utils/API";
import UserContext from '../UserContext'
import moment from 'moment';

// reactstrap components
import {
  Container, CardColumns, Input
} from "reactstrap";

// core components
import DefaultNavBar from "../components/Navbars/DefaultNavBar.js";
import RandomImageHeader from "../components/Headers/RandomImageHeader";
import Footer from "../components/Footers/Footer.js";
import MealItem from "../components/Meals/MealItem.js";

class MealsPage extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {
      week: moment().startOf("week").toDate(),
      days: []
    }

    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  componentDidMount() {
    this.getMeals();
  }

  getMeals() {
    let sort = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6
    }
    API.getMeals(this.state.week)
      .then((meals) => {
        console.log("Meals", meals);
        let days = [];
        if (meals.data.days && meals.data.days.length > 0) {
          days = meals.data.days;
          days.sort((a, b) => {
            if (sort[a.day] < sort[b.day]) { return -1; }
            if (sort[a.day] > sort[b.day]) { return 1; }
            return 0;
          });
        }

        this.setState({
          days: days
        })
      })
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
      }), this.getMeals
    );
  }

  render() {
    let weeks = [];
    let current = moment().utc().startOf("week");
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

              {this.state.days.length === 0 ?
                <h3>No meals have been added for this week.</h3>
                : ""}
              <CardColumns>
                {this.state.days.map((item, i) => (
                  <MealItem {...item} key={item.day} />
                ))}
              </CardColumns>
            </Container>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default MealsPage;
