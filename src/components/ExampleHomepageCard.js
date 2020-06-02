import React from "react";
import Card from "react-bootstrap/Card";

export default function ExampleHomepageCard(props) {
  const { title, description, backgroundColor, color } = props.prop;

  return (
    <Card
      className="example-homepage-card"
      style={{
        width: "24rem",
        backgroundColor: `${backgroundColor}`,
        color: `${color}`,
        margin: "auto",
      }}
    >
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
