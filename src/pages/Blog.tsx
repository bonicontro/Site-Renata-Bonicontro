import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/pages/BlogPage.css";

interface Post {
  _embedded: any;
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  slug: string;
  featured_media: number;
  media_details: {
    width: number;
    height: number;
    file: string;
  };
}

interface CustomResponse extends Response {
  headers: any;
}

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const perPage = 9;
    fetch(
      `https://bonicontro.com/renata/api/wp-json/wp/v2/posts?per_page=${perPage}&page=${currentPage}&_embed`
    )
      .then((response: CustomResponse) => {
        setTotalPages(parseInt(response.headers.get("X-WP-TotalPages")));
        return response.json();
      })
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => console.error(error));
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="main container-principal">
      <h1 className="titulo-pagina">Últimos Posts</h1>
      <div className="posts-wrapper">
        {posts.map((post) => (
          <div key={post.id} className="post-preview">
            <div className="post-preview-image">
              {post.featured_media && (
                <img
                  src={`${post._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url}`}
                  alt={post.title.rendered}
                />
              )}
            </div>
            <div className="post-preview-content">
              <h2>{post.title.rendered}</h2>
              <div
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              ></div>
            </div>
            <Link to={`/blog/post/${post.id}`} className="btn-read-more">
              Leia mais
            </Link>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={handleFirstPage} disabled={currentPage === 1}>
            {"<<"}
          </button>
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            {"<"}
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={pageNumber === currentPage ? "active" : ""}
              >
                {pageNumber}
              </button>
            )
          )}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
          <button
            onClick={handleLastPage}
            disabled={currentPage === totalPages}
          >
            {">>"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
