import { useState, useEffect } from "react";
import { useParams } from "react-router";

export type Post = {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  } | null; // add null to the type of content
};

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(
        `https://bonicontro.com/renata/api/wp-json/wp/v2/posts/${id}?_embed`
      );
      const data = await response.json();
      setPost(data);
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const postContent =
    post.content && post.content.rendered ? post.content.rendered : "";

  return (
    <div className="main">
      <h1>{post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: postContent }} />
    </div>
  );
};

export default Post;
