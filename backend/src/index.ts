import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { Resend } from "resend";
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

const resendApiKey = process.env.RESEND_API_KEY;
const resendFromEmail = process.env.RESEND_FROM_EMAIL;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

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

  const subject = "Nova mensagem de contato pelo portfólio";
  const text = `Nome: ${name}\nEmail: ${email}\nMensagem:\n${message}`;
  const html = `<p><strong>Nome:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Mensagem:</strong><br/>${message}</p>`;

  const sendWithResend = async () => {
    if (!resend || !resendFromEmail) {
      return false;
    }

    try {
      await resend.emails.send({
        from: resendFromEmail,
        to: [toAddress],
        subject,
        text,
        html,
      });
      return true;
    } catch (error) {
      console.error("Erro ao enviar e-mail via Resend", error);
      return false;
    }
  };

  const sendWithGmailSmtp = () => {
    return mailTransporter.sendMail({
      from: `Portfolio da Luana <${process.env.MAIL_USER}>`,
      to: toAddress,
      subject,
      text,
      html,
    });
  };

  (async () => {
    let sent = false;

    if (resend) {
      sent = await sendWithResend();
    }

    if (!sent) {
      await sendWithGmailSmtp();
    }
  })()
    .then(() => {
      return res.status(201).json({
        message:
          "Mensagem enviada com sucesso! Já chegou no meu e-mail. Obrigada por entrar em contato!",
      });
    })
    .catch((error: unknown) => {
      console.error("Erro ao enviar e-mail de contato", error);
      return res.status(500).json({
        error:
          "Recebi sua mensagem, mas ocorreu um erro ao enviar o e-mail. Tente novamente mais tarde.",
        details:
          error instanceof Error
            ? error.message
            : "Erro desconhecido ao enviar e-mail.",
      });
    });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
