import React from "react";

// reactstrap components
import {
  Container, CardColumns,
} from "reactstrap";

// core components
import DefaultNavBar from "../components/Navbars/DefaultNavBar.js";
import RandomImageHeader from "../components/Headers/RandomImageHeader";
import Footer from "../components/Footers/Footer.js";
import MealItem from "../components/Meals/MealItem.js";

function HomePage() {
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });

  const mealPlan = [
    {
      day: "Monday"
    },
    {
      day: "Tuesday"
    },
    {
      day: "Wednesday"
    },
    {
      day: "Thursday"
    },
    {
      day: "Friday"
    },
  ];

  return (
    <>
      <DefaultNavBar />
      <RandomImageHeader />
      <div className="main">
        <div className="section text-center">
          <Container>
            <CardColumns>
              {mealPlan.map((item, i) => (
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

export default HomePage;
