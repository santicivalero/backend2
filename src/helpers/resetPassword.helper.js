import { transport } from "./sendEmail.helper.js";

const sendResetEmail = async (email) => {
  await transport.sendMail({
    from: `BACKEND II <${process.env.GOOGLE_EMAIL}>`,
    to: email,
    subject: "RESET DE CONTRASEÑA",
    html: `
      <section>
        <h1>Reset de contraseña</h1>
        <p>Haz clic en el enlace para ingresar una nueva contraseña:</p>
        <a href="${process.env.URL}/reset-password/${email}">Ingresar nueva contraseña</a>
      </section>
    `,
  });
};

export default sendResetEmail;
