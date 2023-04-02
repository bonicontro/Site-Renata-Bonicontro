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
  const [isLoading, setIsLoading] = useState<boolean>(false); // New state variable

  useEffect(() => {
    const perPage = 9;
    setIsLoading(true); // Set loading state to true before fetch

    fetch(
      `https://bonicontro.com/renata/api/wp-json/wp/v2/posts?per_page=${perPage}&page=${currentPage}&_embed`
    )
      .then((response: CustomResponse) => {
        setTotalPages(parseInt(response.headers.get("X-WP-TotalPages")));
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setIsLoading(false); // Set loading state to false after fetch
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false); // Set loading state to false if fetch errors out
      });
  }, [currentPage]);

  // ...rest of your code

  return (
    <div className="main container-principal">
      <h1 className="titulo-pagina">Últimos Posts</h1>

      {/* Render loading indicator when isLoading is true */}
      {isLoading && <div className="isLoading"></div>}

      <div className="posts-wrapper">
        {/* Render posts when isLoading is false */}
        {!isLoading &&
          posts.map((post) => (
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

      {/* ...rest of your code */}
    </div>
  );
};

export default Blog;
