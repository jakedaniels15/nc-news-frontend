import { useState, useEffect } from "react";
import ArticleItem from "./article-item";

function ArticleContainer({ articles, selectedSort, setSelectedSort, invalidTopic }) {
if (!articles) return <p>Loading articles...</p>;
if (invalidTopic) {
  return <p>Topic not found. Try choosing one from the list. 🐦</p>;
}

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  // Calculate how many total pages of results there are
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  // Determine the starting index of the current page
  const startIndex = (currentPage - 1) * itemsPerPage;

  // Slice the filtered list to get only the Pokémon for the current page
  const paginatedArticles = articles.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      <section>
        <h3>Articles</h3>
      <div className="sort-container">
        <select
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
          className="sort-dropdown"
        >
          <option value="">Sort by...</option>
          <option value="created_at-asc">Date ↑</option>
          <option value="created_at-desc">Date ↓</option>
          <option value="comment_count-asc">Comments ↑</option>
          <option value="comment_count-desc">Comments ↓</option>
          <option value="votes-asc">Votes ↑</option>
          <option value="votes-desc">Votes ↓</option>
        </select>
      </div>
        <section className="articles">
          {paginatedArticles.map((article) => (
            <ArticleItem key={article.article_id} article={article} />
          ))}
        </section>
      </section>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default ArticleContainer;
