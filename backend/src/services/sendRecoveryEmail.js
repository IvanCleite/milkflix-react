import nodemailer from 'nodemailer';

export const sendRecoveryEmail = async (email) => {
  console.log('entrou na sendRecoveryEmail')
  // Cria uma conta de teste no Ethereal
  const testAccount = await nodemailer.createTestAccount();

  // Cria o transportador SMTP com Ethereal
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: 'thad.roberts@ethereal.email',
      pass: 'yaMqh3fU4yeG4SG4ev',
    },
  });

  // Define o conteúdo do e-mail
  const mailOptions = {
    from: '"Milkflix" <no-reply@milkflix.com.br>',
    to: email,
    subject: 'Recuperação de senha',
    html: `<p>Olá! Clique no link abaixo para redefinir sua senha:</p>
           <a href="http://localhost:5173/newPass?email=${email}">Redefinir senha</a>`,
  };

  const info = await transporter.sendMail(mailOptions);

  console.log('E-mail enviado:', info.messageId);
  console.log('Preview URL:', nodemailer.getTestMessageUrl(info)); // 👉 esse link permite ver o conteúdo no navegador
};
