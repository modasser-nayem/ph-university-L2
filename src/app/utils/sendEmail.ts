import nodemailer from 'nodemailer';
import config from '../config';

const sendEmail = async (to: string, resetLink: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: config.EMAIL_HOST_USER,
      pass: config.EMAIL_HOST_PASS,
    },
  });

  await transporter.sendMail({
    from: config.EMAIL_HOST_USER, // sender address
    to, // list of receivers
    subject: 'Reset your password within ten mins!', // Subject line
    text: 'Forget your PH University password, here password reset link', // plain text body
    html: `<b>Click here: </b>${resetLink}`, // html body
  });
};

export default sendEmail;
