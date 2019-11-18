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
        <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
        <Button>Button</Button>
      </CardBody>
    </Card>
  );
}

export default MealItem;
