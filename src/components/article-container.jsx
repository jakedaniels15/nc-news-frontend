import { useState, useEffect } from "react";
import ArticleItem from "./article-item";

function ArticleContainer({ articles }) {
  if (!articles) return <p>Loading articles...</p>;

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
