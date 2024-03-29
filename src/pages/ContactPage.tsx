import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  faFacebookSquare,
  faInstagram,
  faTiktok,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faBrain } from "@fortawesome/free-solid-svg-icons";

import "../assets/css/pages/ContactPage.css";

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

const ContactPage = () => {
  const [page, setPage] = useState<Page | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");

  useEffect(() => {
    axios
      .get("https://bonicontro.com/renata/api/wp-json/wp/v2/pages/71")
      .then((response) => setPage(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(formData);
    event.preventDefault();
    axios
      .post("https://bonicontro.com/renata/api/contact.php", formData)
      .then((response) => setFormStatus("Success"))
      .catch((error) => setFormStatus("Error"));
  };

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  if (!page) {
    return <div className="isLoading"></div>;
  }

  return (
    <div className="main container-principal">
      <h1>{page.title.rendered}</h1>
      <div className="informacoes-de-contato">
        <div className="coluna-info">
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
            <div className="social-media">
              <h3>Imagens do inconsciente</h3>

              <div className="icones-redes">
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
              <h3>Psicologia</h3>
              <div className="icones-redes">
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

          <div className="contact-form">
            <h2>Envie uma mensagem</h2>
            {formStatus === "Success" ? (
              <div className="success-message">
                Obrigada! retornarei o assim que possível.
              </div>
            ) : formStatus === "Error" ? (
              <div className="error-message">
                Oops! algo deu errado, por favor, tente novamente mais tarde!.
              </div>
            ) : null}
            <form onSubmit={handleFormSubmit}>
              <label>
                Nome
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Menssagem
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleFormChange}
                  rows={5}
                />
              </label>
              <button type="submit">Enviar mensagem</button>
            </form>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default ContactPage;
