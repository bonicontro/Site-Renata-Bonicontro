import React, { useState, useEffect } from "react";
import axios from "axios";

interface Page {
  title: {
    rendered: string;
  };
  acf: {
    telefone: string;
    email_de_contato: string;
    facebook: string;
    twitter: string;
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
    return <div>Loading...</div>;
  }

  return (
    <div className="main">
      <h1>{page.title.rendered}</h1>
      <div className="contact-info">
        <div className="phone">
          <p>Telefone: {page.acf.telefone}</p>
        </div>
        <div className="email">
          <p>Email: {page.acf.email_de_contato}</p>
        </div>
        <div className="social-media">
          <a
            href={page.acf.facebook}
            target="_blank"
            rel="noopener noreferrer"
          ></a>
          <a
            href={page.acf.twitter}
            target="_blank"
            rel="noopener noreferrer"
          ></a>
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
              value={formData.name}
              onChange={handleFormChange}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
            />
          </label>
          <label>
            Menssagem
            <textarea
              name="message"
              value={formData.message}
              onChange={handleFormChange}
            />
          </label>
          <button type="submit">Enviar mensagem</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
