import React, { useEffect, useState } from "react";
import "../assets/css/pages/AboutPage.css";

interface Post {
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  featured_media: number;
}

const AboutPage = () => {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    fetch(`https://bonicontro.com/renata/api/wp-json/wp/v2/pages/2`)
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch((error) => console.error(error));
  }, []);

  if (!post) {
    return <div className="isLoading"></div>;
  }

  return (
    <div className="main container-principal">
      <h1 className="titulo-pagina">{post.title.rendered}</h1>
      <div className="conteudo">
        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        {/* {post.featured_media && (
          <img
            src={`https://bonicontro.com/renata/api/wp-json/wp/v2/media/${post.featured_media}`}
            alt={post.title.rendered}
          />
        )} */}
      </div>
    </div>
  );
};

export default AboutPage;
