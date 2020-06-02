import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectHomepage, selectStories } from "../store/homepage/selectors";
import { fetchHomepageData } from "../store/homepage/actions";
import StoryCard from "../components/StoryCard";
import Accordion from "react-bootstrap/Accordion";
import { useParams } from "react-router-dom";
import { formatDate } from "../store/actions";

export default function HomePage() {
  const dispatch = useDispatch();
  const params = useParams();
  const homepageId = params.homepageid;

  useEffect(() => {
    dispatch(fetchHomepageData(homepageId));
  }, [dispatch, homepageId]);

  const homepage = useSelector(selectHomepage);
  const {
    color,
    backgroundColor,
    title,
    description,
    createdAt,
    updatedAt,
    user,
  } = homepage;

  const stories = useSelector(selectStories);

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

  return (
    <div
      className="homepage-detail"
      style={{ backgroundColor: backgroundColor, color: color }}
    >
      <h3 style={{ textAlign: "center" }}>{title}</h3>
      <h5 style={{ textAlign: "center" }}>By: {user ? user.name : null}</h5>
      <h6 style={{ textAlign: "center" }}>
        Created at: {formatDate(createdAt)} Last updated:{" "}
        {formatDate(updatedAt)}
      </h6>
      <p>{description}</p>

      <hr style={{ backgroundColor: color }} />

      <h4>Stories</h4>
      <Accordion defaultActiveKey="1">{storiesList}</Accordion>
    </div>
  );
}
