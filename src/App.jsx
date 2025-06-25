import { useState, useEffect } from "react";
import "./App.css";
import ArticlePage from "./components/article-page";
import Header from "./components/header";
import SearchContainer from "./components/search-container";
import ArticleContainer from "./components/article-container";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

const currentUser = "grumpy19";

function App() {
  const [search, setSearch] = useState("");
  const [allTopics, setAllTopics] = useState([]);
  const [filteredTopic, setFilteredTopic] = useState(null);
  const [articleData, setArticleData] = useState(null);
  const [selectedSort, setSelectedSort] = useState("");
  const [invalidTopic, setInvalidTopic] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const match = location.pathname.match(/^\/topics\/(.+)$/);
  const topic = match ? match[1] : null;

  // Fetch list of valid topics
  useEffect(() => {
    fetch("https://jakes-news-project.onrender.com/api/topics")
      .then((res) => res.json())
      .then((data) => {
        const topicSlugs = data.topics.map((t) => t.slug);
        setAllTopics(topicSlugs);
      })
      .catch((err) => console.error("Failed to load topics:", err));
  }, []);

  // Fetch articles and validate topic
  useEffect(() => {
    if (topic && allTopics.length > 0 && !allTopics.includes(topic)) {
      setInvalidTopic(true);
      setArticleData([]);
      return;
    }

    setInvalidTopic(false);

    const params = [];
    if (topic) params.push(`topic=${topic}`);
    if (selectedSort) {
      const [sort_by, order] = selectedSort.split("-");
      params.push(`sort_by=${sort_by}&order=${order}`);
    }

    const fetchURL =
      "https://jakes-news-project.onrender.com/api/articles" +
      (params.length ? "?" + params.join("&") : "");

    fetch(fetchURL)
      .then((res) => res.json())
      .then((data) => {
        setArticleData(data.articles);
        setFilteredTopic(topic);
      })
      .catch((err) => {
        console.error("Failed to load articles:", err);
        setArticleData([]);
      });
  }, [location.pathname, selectedSort, allTopics]);

  // Handle topic search
  function handleSearch(topicInput) {
    const lower = topicInput.toLowerCase();
    if (allTopics.includes(lower)) {
      navigate(`/topics/${lower}`);
    } else {
      setArticleData([]);
      setInvalidTopic(true);
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
        <Route
          path="/"
          element={
            <ArticleContainer
              articles={articleData}
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
              invalidTopic={invalidTopic}
            />
          }
        />
        <Route
          path="/topics/:topic"
          element={
            <ArticleContainer
              articles={articleData}
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
              invalidTopic={invalidTopic}
            />
          }
        />
        <Route
          path="/articles/:article_id"
          element={<ArticlePage currentUser={currentUser} />}
        />
        <Route path="*" element={<p>Sorry, that page doesn’t exist. 😕</p>} />
      </Routes>
    </>
  );
}

export default App;