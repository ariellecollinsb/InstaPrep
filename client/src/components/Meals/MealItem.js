import React from "react";
import {
  Card, CardBody, CardText, CardHeader, ListGroup, ListGroupItem, Button
} from "reactstrap";
function MealItem(props) {
  return (
    <Card style={{ width: '20rem' }} className="card-plain">
      <CardHeader>{props.day}</CardHeader>
      <CardBody>
        <CardText className="text-left">
          <ListGroup flush>
            {props.meals.map((item, i) => (
              <ListGroupItem key={i} tag="a" href={item.href} target="_blank" action>{item.title}</ListGroupItem>
            ))}
          </ListGroup>
        </CardText>
      </CardBody>
    </Card>
  );
}

export default MealItem;
