import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectUserHomepage,
  selectUserStories,
  selectUser,
} from "../store/user/selectors";
import StoryCard from "../components/StoryCard";
import Accordion from "react-bootstrap/Accordion";
import { formatDate } from "../store/actions";
import Button from "react-bootstrap/Button";
import EditHomepageForm from "../components/EditHomepageForm";
import NewStoryForm from "../components/NewStoryForm";

export default function MyHomePage() {
  const user = useSelector(selectUser);
  const [showEdit, setShowEdit] = useState(false);
  const [showNewStory, setShowNewStory] = useState(false);

  const homepage = useSelector(selectUserHomepage);
  const {
    color,
    backgroundColor,
    title,
    description,
    createdAt,
    updatedAt,
  } = homepage;

  const stories = useSelector(selectUserStories);

  const storiesList = stories
    ? stories
        .sort(function (a, b) {
          var dateA = new Date(a.createdAt),
            dateB = new Date(b.createdAt);
          return dateB - dateA;
        })
        .map((story) => (
          <StoryCard
            key={story.id}
            prop={story}
            backgroundColor={backgroundColor}
            color={color}
          />
        ))
    : null;

  function changeShowEdit() {
    return (
      showEdit ? setShowEdit(false) : setShowEdit(true), setShowNewStory(false)
    );
  }

  function changeShowNewStory() {
    return (
      showNewStory ? setShowNewStory(false) : setShowNewStory(true),
      setShowEdit(false)
    );
  }

  const renderEditHomepage = (
    <EditHomepageForm
      prop={homepage}
      visible={showEdit}
      setShow={(show) => setShowEdit(show)}
    />
  );

  const renderNewStory = !showNewStory ? null : (
    <NewStoryForm prop={homepage} setShow={(show) => setShowNewStory(show)} />
  );
  return (
    <>
      {!user.token ? (
        <>Please login first</>
      ) : (
        <>
          <div
            className="user-homepage-header"
            style={{ borderColor: `${backgroundColor}` }}
          >
            <h3>Hi {user.name}! Your homepage is looking awesome!</h3>
            <div
              className="user-homepage-buttons"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                padding: "5px",
              }}
            >
              <Button
                onClick={(e) => {
                  changeShowEdit();
                }}
              >
                Edit My Homepage
              </Button>

              <Button
                onClick={(e) => {
                  changeShowNewStory();
                }}
              >
                Post a cool story
              </Button>
            </div>
            <>{renderEditHomepage}</>
            <>{renderNewStory}</>
            <div
              className="user-homepage"
              style={{ backgroundColor: backgroundColor, color: color }}
            >
              <h3 style={{ textAlign: "center" }}>{title}</h3>
              <h6 style={{ textAlign: "center" }}>
                Created at: {formatDate(createdAt)} Last updated:{" "}
                {formatDate(updatedAt)}
              </h6>
              <p style={{ textAlign: "left" }}>{description}</p>

              <hr style={{ backgroundColor: color }} />

              <h4>Stories</h4>
              <Accordion defaultActiveKey="1">{storiesList}</Accordion>
            </div>
          </div>
        </>
      )}
    </>
  );
}
