import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3333;

const mailTransporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT || 587),
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

app.get("/", (_req, res) => {
  res.json({ message: "Backend do portfólio rodando" });
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      error: "Campos obrigatórios: name, email, message.",
    });
  }

  console.log("[Nova mensagem de contato]", {
    name,
    email,
    message,
    receivedAt: new Date().toISOString(),
  });

  const toAddress = process.env.MAIL_TO || process.env.MAIL_USER;

  if (!toAddress) {
    return res.status(201).json({
      message:
        "Mensagem registrada no servidor, mas o envio de e-mail ainda não está configurado.",
    });
  }

  mailTransporter
    .sendMail({
      from: `Portfolio da Luana <${process.env.MAIL_USER}>`,
      to: toAddress,
      subject: "Nova mensagem de contato pelo portfólio",
      text: `Nome: ${name}\nEmail: ${email}\nMensagem:\n${message}`,
      html: `<p><strong>Nome:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Mensagem:</strong><br/>${message}</p>`,
    })
    .then(() => {
      return res.status(201).json({
        message:
          "Mensagem enviada com sucesso! Já chegou no meu e-mail. Obrigada por entrar em contato!",
      });
    })
    .catch((error) => {
      console.error("Erro ao enviar e-mail de contato", error);
      return res.status(500).json({
        error:
          "Recebi sua mensagem, mas ocorreu um erro ao enviar o e-mail. Tente novamente mais tarde.",
      });
    });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
