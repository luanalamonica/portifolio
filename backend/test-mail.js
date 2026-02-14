const path = require('path');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config({ path: path.resolve(__dirname, '.env') });

async function main() {
  console.log('Usando MAIL_USER =', process.env.MAIL_USER);
  console.log('Enviando para MAIL_TO =', process.env.MAIL_TO);

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT || 587),
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `Teste portfolio <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      subject: 'Teste de envio manual',
      text: 'Se você recebeu este e-mail, o SMTP está funcionando.',
    });

    console.log('E-mail enviado com sucesso. ID:', info.messageId);
  } catch (error) {
    console.error('Falha ao enviar e-mail de teste:');
    console.error(error);
  }
}

main();
