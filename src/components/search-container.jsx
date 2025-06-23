import { useState, useEffect } from "react";
import TopicCard from "./topic-card";

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
              setSearch(e.target.value); // Update the search value
            }}
          ></input>
        </form>
        <ul className="suggestions">
          {filtered.map((topic) => (
            <li key={topic} onClick={() => handleSearch(topic)}>
              {topic}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default SearchContainer;
