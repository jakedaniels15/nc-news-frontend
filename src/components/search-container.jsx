import { useState, useEffect } from "react";
import TopicCard from "./topic-card";
import { Link } from "react-router-dom";

function SearchContainer({ handleSearch, search, setSearch, allTopics }) {
  const filtered = allTopics.filter((name) =>
    name.startsWith(search.toLowerCase())
  );

  return (
    <>
      <section className="topicSearch">
        <h2>Filter by Topic</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(search);
          }}
        >
          <label htmlFor="topicName"></label>
          <input
            id="topicName"
            type="text"
            name="topicName"
            placeholder="Enter Topic Here"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          ></input>
        </form>
        <p>Hot topics</p>
      <div className="suggested-topics">
  {["Coding", "Football", "Cooking"].map((topic) => (
    <Link
      key={topic}
      to={`/topics/${topic.toLowerCase()}`}
      className="topic-button"
    >
      {topic}
    </Link>
  ))}
</div>
      </section>
    </>
  );
}

export default SearchContainer;
