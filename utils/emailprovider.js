import nodemailer from 'nodemailer'

// Mailtrap SMTP credentials from your Mailtrap account
const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.EMAIL_USERNAME, // Mailtrap SMTP user
    pass: process.env.EMAIL_PASSWORD, // Mailtrap SMTP password
  },
});


export const sendEmail = (recipientEmail, subject, text) => {
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: recipientEmail, 
      subject: subject, 
      html: text,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  };