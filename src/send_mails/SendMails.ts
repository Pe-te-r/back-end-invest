import * as nodemailer from 'nodemailer';
import 'dotenv/config';
import * as path from 'path';
import * as ejs from 'ejs';
import * as fs from 'fs';

export const sendMail = async (
  template: string, 
  receiver: string, 
  subject: string, 
  username?: string,
  code?: string

) => {
  // Create a transporter object using Gmail's SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: true,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.PASSWORD,
    },
  });

  // Load and render the EJS template
  let html_code;
  if(template === 'register'){

    const templatePath = path.join(__dirname, 'views', `${template}.ejs`);
    html_code = ejs.render(fs.readFileSync(templatePath, 'utf8'), {
      username: username,
      
    });
  }else if(template === 'code'){
    const templatePath = path.join(__dirname, 'views', `${template}.ejs`);
    html_code = ejs.render(fs.readFileSync(templatePath, 'utf8'), {
      username: username,
      verificationCode:code
    });
    
  }

  // Define email options
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: receiver,
    subject: subject,
    html: html_code, // Use rendered HTML code from EJS
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Error occurred: ', error.message);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
};
