import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";

const ContactForm = () => {
  return (
    <Formik
      initialValues={{ name: "", email: "", message: "" }}
      validate={(values) => {
        const errors: Record<string, string> = {};
        if (!values.name) {
          errors.name = "Nome obrigatório";
        }
        if (!values.email) {
          errors.email = "Email obrigatório";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Endereço de email inválido";
        }
        if (!values.message) {
          errors.message = "Mensagem obrigatória";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        axios
          .post("https://bonicontro.com/renata/api/contact.php", values, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(() => {
            alert("Mensagem enviada com sucesso!");
            setSubmitting(false);
          })
          .catch(() => {
            alert("Envio falhou, por favor, tente novamente.");
            setSubmitting(false);
          });
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="name">Nome</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label htmlFor="message">Mensagem</label>
            <Field as="textarea" name="message" />
            <ErrorMessage name="message" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Enviar
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
