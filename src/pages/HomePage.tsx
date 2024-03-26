import Slider from "../components/Slider";
import Slide from "../components/Slide";
import cartaTarotMaos from "../assets/svgs/tarot-maos.svg";
import cartaTarotSol from "../assets/svgs/tarot-sol.svg";

import "../assets/css/pages/HomePage.css";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export type Post = {
  _embedded: any;
  featured_media: JSX.Element;
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
};
interface Carta {
  imageCarta: string | undefined;
  title: {
    rendered: string;
  };
  acf: {
    nome_da_carta: string;
    texto_da_carta: string;
    imagem_da_carta: number;
    featured_media: number;
  };
  _embedded: any;
}

interface Slide {
  content: JSX.Element;
}

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [carta, setCarta] = useState<Carta | null>(null);
  const [slides, setSlides] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://bonicontro.com/renata/api/wp-json/wp/v2/slides")
      .then((response) => response.json())
      .then((data) => {
        const promises = data.map((slide: { featured_media: any }) => {
          return fetch(
            `https://bonicontro.com/renata/api/wp-json/wp/v2/media/${slide.featured_media}`
          )
            .then((response) => response.json())
            .then((mediaData) => {
              return {
                ...slide,
                featured_media: mediaData.source_url,
              };
            });
        });

        Promise.all(promises)
          .then((slidesWithMedia) => {
            setSlides(slidesWithMedia);
            console.log(slidesWithMedia);
          })
          .catch((error) => console.error(error));
      });
  }, []);

  useEffect(() => {
    const fetchCarta = async () => {
      const response = await fetch(
        "https://bonicontro.com/renata/api/wp-json/wp/v2/pages/144?_embed"
      );
      const data = await response.json();
      const imageID = data["_embedded"]["wp:featuredmedia"][0].id;
      const imageData = await fetch(
        `https://bonicontro.com/renata/api/wp-json/wp/v2/media/${imageID}`
      ).then((response) => response.json());

      setCarta({
        ...data,
        imageCarta: imageData.source_url,
      });
    };

    const fetchPosts = async () => {
      const response = await fetch(
        "https://bonicontro.com/renata/api/wp-json/wp/v2/posts?per_page=4&_embed"
      );
      const data = await response.json();
      setPosts(data);
    };

    Promise.all([fetchPosts(), fetchCarta()])
      .then(() => console.log("Data fetched successfully."))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {/* if slides */}
      {slides.length > 0 && (
        <Slider
          slides={slides.map((slide, index) => (
            <Slide
              key={index}
              content={
                <div className="main-slide-content">
                  <div className="bloco">
                    <h1
                      dangerouslySetInnerHTML={{
                        __html: slide.title.rendered,
                      }}
                    />
                    <hr />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: slide.content.rendered,
                      }}
                    />
                    <hr />
                  </div>

                  <div className="bloco img-fluid">
                    <img
                      src={slide.featured_media}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                </div>
              }
            />
          ))}
        />
      )}
      {/* if no slides yet */}
      {!slides.length && (
        <div className="container-principal" style={{ height: "40vh" }}>
          <div className="isLoading"></div>
        </div>
      )}

      <section id="cartaSemana">
        <div className="container-principal">
          {carta ? (
            <>
              <div className="carta-da-semana">
                <div id="cartaDaSemana">
                  <img src={carta.imageCarta} alt={carta.title.rendered}></img>
                </div>

                <div className="texto-carta">
                  <h1>{carta.title.rendered}</h1>
                  <br />
                  <h2>{carta.acf.nome_da_carta}</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: carta.acf.texto_da_carta,
                    }}
                  ></div>
                </div>
              </div>
            </>
          ) : (
            <div className="isLoading"></div>
          )}
        </div>
      </section>
      <section id="latest-blog">
        <div className="container-principal">
          <h1>Últimos posts</h1>
          <div className="posts">
            {posts.map((post) => (
              <div key={post.id} className="post">
                <div className="thumb-noticia">
                  {post.featured_media && (
                    <img
                      src={`${post._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url}`}
                      alt={post.title.rendered}
                    />
                  )}
                </div>
                <h3>{post.title.rendered}</h3>

                <div className="short-desc">
                  <p
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                </div>
                <Link
                  to={`/blog/post/${post.id}`}
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Ver mais
                </Link>
              </div>
            ))}
          </div>
          <Link
            to="/blog"
            className="btn-ver-todos"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Ver todos os posts
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;
