import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { formatDate } from "../store/actions";

import Card from "react-bootstrap/Card";

export default function HomepageCard(props) {
  const {
    id,
    title,
    description,
    backgroundColor,
    color,
    createdAt,
  } = props.prop;

  return (
    <Card
      className="homepage-card"
      style={{
        width: "18rem",
        backgroundColor: `${backgroundColor}`,
        color: `${color}`,
      }}
    >
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>
          <Link to={`homepage/${id}`}>
            <Button
              variant="primary"
              style={{
                backgroundColor: `${color}`,
                color: `${backgroundColor}`,
              }}
            >
              Visit page
            </Button>
          </Link>
        </Card.Text>
      </Card.Body>
      <Card.Footer>{formatDate(createdAt)}</Card.Footer>
    </Card>
  );
}
