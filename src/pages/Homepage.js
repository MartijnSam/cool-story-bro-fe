import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectHomepages } from "../store/homepages/selectors";
import { fetchData } from "../store/homepages/actions";
import HomepageCard from "../components/HomepageCard";
import CardDeck from "react-bootstrap/CardDeck";

export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData);
  }, [dispatch]);

  const homepages = useSelector(selectHomepages);

  const homepageList = homepages
    .sort(function (a, b) {
      var dateA = new Date(a.updatedAt),
        dateB = new Date(b.updatedAt);
      return dateB - dateA;
    })
    .map((homepage) => <HomepageCard key={homepage.id} prop={homepage} />);

  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
      }}
    >
      <h4>Homepages</h4>

      <hr></hr>
      <CardDeck>{homepageList}</CardDeck>
    </div>
  );
}
