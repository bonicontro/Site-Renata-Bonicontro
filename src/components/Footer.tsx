import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagram,
  faTiktok,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import "../assets/css/components/Footer.css";
import { faW } from "@fortawesome/free-solid-svg-icons";

interface Page {
  title: {
    rendered: string;
  };
  acf: {
    telefone: string;
    email_de_contato: string;
    facebook_tarot: string;
    instagram: string;
    tiktok: string;
    instagram_psicologa: string;
    facebook_pessoal: string;
  };
}

const Footer = () => {
  const [page, setPage] = useState<Page | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://bonicontro.com/renata/api/wp-json/wp/v2/pages/71"
      );
      setPage(result.data);
    };
    fetchData();
  }, []);

  return (
    <footer id="footer">
      <a
        href="#"
        id="contatoWhatsappFlutuante"
        className="contato-whatsapp"
        onClick={() =>
          window.open(
            `https://api.whatsapp.com/send?phone=+55${page?.acf.telefone.replace(
              /\D/g,
              ""
            )}&text=Olá!, Gostaria de saber sobre`,
            "_blank"
          )
        }
      >
        <FontAwesomeIcon icon={faWhatsapp} /> <span>saiba mais</span>
      </a>

      {page && (
        <>
          <div className="informacoes-de-contato">
            <div className="contact-info">
              <div className="phone">
                <p>
                  Telefone:{" "}
                  <a
                    href="#"
                    id="contatoRodape"
                    className="contato-whatsapp"
                    onClick={() =>
                      window.open(
                        `https://api.whatsapp.com/send?phone=+55${page?.acf.telefone.replace(
                          /\D/g,
                          ""
                        )}&text=Olá!, Gostaria de saber sobre`,
                        "_blank"
                      )
                    }
                  >
                    {" "}
                    <FontAwesomeIcon icon={faWhatsapp} /> {page.acf.telefone}
                  </a>
                </p>
              </div>
              <div className="email">
                <p>
                  Email:{" "}
                  <a href={`mailto:${page.acf.email_de_contato}`}>
                    {page.acf.email_de_contato}
                  </a>
                </p>
              </div>
            </div>

            <div className="social-media">
              <div className="imagens-inconsciente">
                <h3>Imagens do inconsciente</h3>
                <a
                  href={page.acf.facebook_tarot}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faFacebookSquare} />
                </a>
                <a
                  href={page.acf.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a
                  href={page.acf.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faTiktok} />
                </a>
              </div>
              <span id="divisorFooter"></span>
              <div className="psicologa">
                <h3>Psicologia</h3>
                <a
                  href={page.acf.instagram_psicologa}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a
                  href={page.acf.facebook_pessoal}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faFacebookSquare} />
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </footer>
  );
};

export default Footer;
