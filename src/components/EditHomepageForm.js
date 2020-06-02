import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Col } from "react-bootstrap";
import { updateUserHomepage } from "../store/user/actions";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import ExampleHomepageCard from "../components/ExampleHomepageCard";

export default function EditHomepageForm(props) {
  const { title, backgroundColor, description, color } = props.prop;
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newBackgroundColor, setNewBackgroundColor] = useState(backgroundColor);
  const [newColor, setNewColor] = useState(color);

  const dispatch = useDispatch();

  function submitNewHomepage(e) {
    e.preventDefault();
    dispatch(
      updateUserHomepage(newTitle, newDescription, newBackgroundColor, newColor)
    );
    props.setShow(false);
  }

  const visibility = props.visible ? "block" : "none";

  const newHomepage = {
    title: newTitle,
    description: newDescription,
    backgroundColor: newBackgroundColor,
    color: newColor,
  };

  return (
    <div
      className="edit-homepage"
      style={{ borderColor: `${backgroundColor}`, display: `${visibility}` }}
    >
      <h4>Edit your homepage</h4>
      <Container>
        <Form as={Col} md={{ span: 12 }} className="mt-5">
          <Form.Row>
            <Col>
              <Form.Group controlId="formTitle">
                <Form.Label>New Title</Form.Label>
                <Form.Control
                  value={newTitle}
                  onChange={(event) => setNewTitle(event.target.value)}
                  type="text"
                />
              </Form.Group>

              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  value={newDescription}
                  onChange={(event) => setNewDescription(event.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group controlId="formTextColor">
                <Form.Label>Text-Color</Form.Label>
                <Form.Control
                  value={newColor}
                  onChange={(event) => setNewColor(event.target.value)}
                  type="color"
                />
              </Form.Group>
              <Form.Group controlId="formBackgroundColor">
                <Form.Label>Background-Color</Form.Label>
                <Form.Control
                  value={newBackgroundColor}
                  onChange={(event) =>
                    setNewBackgroundColor(event.target.value)
                  }
                  type="color"
                />
              </Form.Group>
            </Col>

            <Col>
              <h5>Preview</h5>
              <ExampleHomepageCard prop={newHomepage} />
            </Col>
          </Form.Row>
          <Form.Group className="mt-5">
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => {
                submitNewHomepage(e);
              }}
            >
              Submit your edits
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
}
