import Menu from "../components/Menu";
import Slider from "../components/Slider";
import Slide from "../components/Slide";
import Footer from "../components/Footer";

import "../assets/css/pages/HomePage.css";

const HomePage: React.FC = () => (
  <>
    <Menu />
    <Slider
      slides={[
        <Slide
          content={
            <div className="main-banner-content">
              <div className="blocos">
                <div className="bloco1">
                  <h1>
                    Imagens do <br />
                    insconsciente
                  </h1>
                  <h3>
                    esoteric products, tarot,
                    <br /> sessions, courses.
                  </h3>
                  <p>
                    Ao contrário do que muitos pensam, o Tarot não traz soluções
                    mágicas. O objetivo do oráculo é fornecer estratégias e
                    previsões que ajudem na realização de objetivos e na
                    superação de erros e problemas.
                  </p>
                  <hr />
                  <h2>Redes Sociais</h2>
                  <ul>
                    <a href="">
                      <li>Rede</li>
                    </a>
                    <a href="">
                      <li>Rede</li>
                    </a>
                    <a href="">
                      <li>Rede</li>
                    </a>
                    <a href="">
                      <li>Rede</li>
                    </a>
                  </ul>
                </div>
                <div className="bloco2">
                  <object
                    data="../src/assets/svgs/tarot-sol.svg"
                    type="image/svg+xml"
                  ></object>
                </div>
              </div>
            </div>
          }
        />,
        <Slide
          content={
            <div className="main-banner-content">
              <div className="blocos">
                <div className="bloco1">
                  <h1>Jogos de Tarot</h1>
                  <h3>
                    esoteric products, tarot,
                    <br /> sessions, courses.
                  </h3>
                  <p>
                    O Tarot é um conjunto de 78 cartas chamadas de arcanos, que
                    estão divididos em dois grupos: os Arcanos Maiores, com 22
                    cartas, e os Arcanos Menores, com 56. Assim como outros
                    oráculos, o Tarot funciona segundo o princípio de
                    aleatoriedade.
                  </p>
                  <hr />
                  <h2>Não deixe para depois!</h2>
                  <button>Marque uma consulta!</button>
                </div>
                <div className="bloco2">
                  <object
                    data="../src/assets/svgs/tarot-maos.svg"
                    type="image/svg+xml"
                  ></object>
                </div>
              </div>
            </div>
          }
        />,
      ]}
    />
    <section id="cartaSemana">
      <div className="container-principal">
        <h1>Carta da semana</h1>
        <div className="carta-da-semana">
          <div className="img-fluid">
            <img
              src="../src/assets/svgs/tarot-sol.svg"
              className="carta"
              alt=""
            />
          </div>
          <div className="texto-carta">
            <h2>Nome da carta</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Deleniti, iure similique quasi provident facilis necessitatibus
              sapiente libero, natus quis ex, voluptas quod itaque deserunt
              voluptatum praesentium doloribus. Corrupti, maxime blanditiis.
            </p>
          </div>
        </div>
      </div>
    </section>
    <Footer></Footer>
  </>
);

export default HomePage;
