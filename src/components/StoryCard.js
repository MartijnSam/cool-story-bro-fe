import React from "react";
import { formatDate } from "../store/actions";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

export default function StoryCard(props) {
  const { id, name, content, imgUrl, updatedAt, createdAt } = props.prop;
  const color = props.color;
  const backgroundColor = props.backgroundColor;

  return (
    <Card className="story-card" key={id}>
      <Accordion.Toggle
        as={Card.Header}
        eventKey={id}
        style={{ backgroundColor: `${color}`, color: `${backgroundColor}` }}
      >
        <h5>{name}</h5>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={id}>
        <Card.Body
          style={{
            backgroundColor: `${backgroundColor}`,
            color: `${color}`,
            borderStyle: "solid",
            borderWidth: "3px",
            borderColor: `${color}`,
          }}
        >
          <div className="story-cont">
            <Card.Img
              variant="top"
              src={imgUrl}
              style={{
                borderStyle: "solid",
                borderWidth: "3px",
                borderColor: `${color}`,
                borderRadius: "8px",
                float: "left",
                display: "inline",
                width: "45%",
                margin: "15px 15px 5px 5px",
              }}
            ></Card.Img>
            <h4
              style={{
                textAlign: "center",
              }}
            >
              {name}
            </h4>
            <Card.Text
              style={{
                padding: "10px",
                margin: "auto",
                marginTop: "5px",
              }}
            >
              {content}
            </Card.Text>
          </div>
          <Card.Footer style={{ clear: "both" }}>
            Created: {formatDate(createdAt)} Last update:{" "}
            {formatDate(updatedAt)}
          </Card.Footer>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}
