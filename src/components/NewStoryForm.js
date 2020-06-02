import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { addStory } from "../store/user/actions";

export default function NewStoryForm(props) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [showTestImage, setShowTestImage] = useState(false);
  const { backgroundColor } = props.prop;
  const dispatch = useDispatch();

  function submitNewStory(e) {
    e.preventDefault();
    dispatch(addStory(name, content, imgUrl));
    props.setShow(false);
  }

  function changeShowTestImage() {
    return showTestImage ? setShowTestImage(false) : setShowTestImage(true);
  }
  const renderTestImage = () => {
    if (imgUrl && showTestImage) {
      return (
        <Image
          className="test-image"
          src={imgUrl}
          rounded
          alt="Image not working :("
        />
      );
    }
    if (!imgUrl && showTestImage) {
      return "Please provide a valid image url";
    } else return null;
  };

  const buttonText = showTestImage ? "Hide Test-Image" : "Show Test-Image";

  return (
    <div className="new-story" style={{ borderColor: `${backgroundColor}` }}>
      <h4>Add a new story!</h4>
      <Container>
        <Form as={Col} md={{ span: 12 }} className="mt-5">
          <Form.Row>
            <Col>
              <Form.Group controlId="formName">
                <Form.Label>Story name</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  type="text"
                  placeholder="Cool story name braw"
                />
              </Form.Group>

              <Form.Group controlId="formContent">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  type="text"
                  placeholder="Cool story content braw"
                  as="textarea"
                  rows="9"
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="formImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  value={imgUrl}
                  onChange={(event) => setImgUrl(event.target.value)}
                  type="text"
                  placeholder="image url"
                />
              </Form.Group>

              <Button
                variant="primary"
                onClick={(e) => {
                  changeShowTestImage();
                }}
              >
                {buttonText}
              </Button>

              <Row>
                <Col style={{ height: "14rem", width: "100%" }}>
                  {renderTestImage()}
                </Col>
              </Row>
            </Col>
          </Form.Row>
          <Form.Group className="mt-5">
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => {
                submitNewStory(e);
              }}
            >
              Submit your new story
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
}
