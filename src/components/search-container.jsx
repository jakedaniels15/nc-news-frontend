import { useState, useEffect } from "react";
import TopicCard from "./topic-card";
import { Link } from "react-router-dom";

function SearchContainer({ handleSearch, search, setSearch, allTopics }) {
  const filtered = allTopics.filter((name) =>
    name.startsWith(search.toLowerCase())
  );

return (
  <div className="search-container">
    <section className="topicSearch">
      <h2>🔍 What do you want to read about?</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(search);
        }}
      >
        <label htmlFor="topicName" className="visually-hidden">Topic search</label>
        <input
          id="topicName"
          type="text"
          name="topicName"
          placeholder="Type a topic…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="topic-input"
        />
        <button type="submit" className="search-button">Go</button>
      </form>
      <p>🔥 Hot topics</p>
      <div className="suggested-topics">
        <Link to="/topics/coding" className="topic-button">💻 Coding</Link>
        <Link to="/topics/football" className="topic-button">⚽ Football</Link>
        <Link to="/topics/cooking" className="topic-button">🍳 Cooking</Link>
      </div>
    </section>
  </div>
);
}

export default SearchContainer;
