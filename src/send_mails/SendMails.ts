import * as nodemailer from 'nodemailer';
import 'dotenv/config';
import * as path from 'path';
import hbs from 'nodemailer-express-handlebars'; // Change this line


export const sendMail = async (template: string, receiver: string, subject: string, username?: string,resetCode?:string) => {
  // Create a transporter object using the Gmail SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'sandbox.smtp.mailtrap.io',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.PASSWORD,
    },
  });

  const hbsOptions = {
    viewEngine: {
      extName: '.handlebars',
      partialsDir: path.join(__dirname, 'views'),
      layoutsDir: path.join(__dirname, 'views'),
      defaultLayout: false,
    },
    viewPath: path.join(__dirname, 'views'),
    extName: '.handlebars',
  };

  // Debug: Print the resolved viewPath
  console.log('Resolved viewPath:', path.join(__dirname, 'views'));

  // Attach the handlebars plugin to the nodemailer transporter
  transporter.use('compile', hbs(hbsOptions));

  // Define email options
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: receiver,
    subject: subject,
    template: template,
    context: {
      username: username,
      resetCode: resetCode
    }
  };
  
  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Error occurred: ', error.message);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
};




