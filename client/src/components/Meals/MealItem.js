import React from "react";
import {
  Card, CardBody, CardText, CardHeader,
  Button
} from "reactstrap";
function MealItem(props) {
  return (
    <Card style={{ width: '20rem' }}>
      <CardHeader>{props.day}</CardHeader>
      <CardBody>
        <CardText className="text-left">
          <ul>
            {props.meals.map((item, i) => (
              <li key={i}>{item.title}</li>
            ))}
          </ul>
        </CardText>
      </CardBody>
    </Card>
  );
}

export default MealItem;
