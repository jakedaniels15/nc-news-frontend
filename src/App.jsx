import { useState, useEffect } from "react";
import "./App.css";
import ArticlePage from "./components/article-page";
import Header from "./components/header";
import SearchContainer from "./components/search-container";
import ArticleContainer from "./components/article-container";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const currentUser = "grumpy19";

function App() {
  const [search, setSearch] = useState("");
  const [allTopics, setAllTopics] = useState([]);
  const [filteredTopic, setFilteredTopic] = useState(null);
  const [articleData, setArticleData] = useState(null);
  const location = useLocation();
const match = location.pathname.match(/^\/topics\/(.+)$/);
const navigate = useNavigate();

 useEffect(() => {
  const fetchURL = match
    ? `https://jakes-news-project.onrender.com/api/articles?topic=${match[1]}`
    : "https://jakes-news-project.onrender.com/api/articles";

  fetch(fetchURL)
    .then((res) => res.json())
    .then((data) => {
      setArticleData(data.articles);
      setFilteredTopic(match ? match[1] : null);
    })
    .catch((err) => {
      console.error("Failed to load articles:", err);
      setArticleData(null);
    });
}, [location.pathname]);

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
      <Header />
      {location.pathname === "/" && (
        <SearchContainer
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
          allTopics={allTopics}
        />
      )}
      {location.pathname.startsWith("/topics/") && (
  <button onClick={() => navigate("/")} className="back-button">
    ← Back to Home
  </button>
)}
      <Routes>
        <Route path="/" element={<ArticleContainer articles={articleData} />} />
        <Route
          path="/topics/:topic"
          element={<ArticleContainer articles={articleData} />}
        />
        <Route
          path="/articles/:article_id"
          element={<ArticlePage currentUser={currentUser} />}
        />
      </Routes>
    </>
  );
}

export default App;
