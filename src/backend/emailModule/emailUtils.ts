import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (
  email: string,
  name: string,
  token: string
) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify?token=${token}`;

  const mailOptions = {
    from: `"Free People Support" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verifica tu cuenta en Free People',
    html: `
      <h1>Hola ${name}, bienvenido!</h1>
      <p>Gracias por registrarte. Por favor confirma tu cuenta haciendo click en el siguiente enlace:</p>
      <a href="${verificationLink}" style="padding: 10px 20px; background-color: #8b0000; color: white; text-decoration: none; border-radius: 5px;">Verificar Email</a>
      <p>Si no fuiste tú, ignora este mensaje.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
