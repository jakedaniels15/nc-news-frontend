import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header";
import SearchContainer from "./components/search-container";
import ArticleContainer from "./components/article-container";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [search, setSearch] = useState("");
  const [allTopics, setAllTopics] = useState([]);
  const [filteredTopic, setFilteredTopic] = useState(null);
  const [articleData, setArticleData] = useState(null);

  useEffect(() => {
    fetch("https://jakes-news-project.onrender.com/api/topics")
      .then((res) => res.json())
      .then((data) => {
        const topicSlugs = data.topics.map((t) => t.slug);
        setAllTopics(topicSlugs);
      })
      .catch((err) => console.error("Failed to load topics:", err));
  }, []);

  function handleSearch(topicInput) {
    const topic = topicInput.toLowerCase();
    const isValid = allTopics.includes(topic);
    if (isValid) {
      fetch(
        `https://jakes-news-project.onrender.com/api/articles?topic=${topic}`
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("Fetched data:", data);
          console.log("Articles:", data.articles);

          setArticleData(data.articles);
          setFilteredTopic(topic);
        })
        .catch((err) => {
          console.error(err.message);
          setArticleData(null);
        });
    } else {
      setArticleData([]);
    }
  }
  return (
    <>
      <Router>
      <Header />
      <SearchContainer
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        allTopics={allTopics}
      />
      <ArticleContainer articles={articleData} />
      </Router>
    </>
  );
}

export default App;
