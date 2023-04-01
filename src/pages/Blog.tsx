import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch(
      "https://bonicontro.com/renata/api/wp-json/wp/v2/posts?per_page=9&_embed"
    )
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="main">
      <h1>Últimos Posts</h1>
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
            <Link to={`/blog/post/${post.id}`} className="btn-read-more">
              Leia mais
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;
