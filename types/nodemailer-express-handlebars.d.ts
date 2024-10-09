// types/nodemailer-express-handlebars.d.ts

declare module 'nodemailer-express-handlebars' {
    import { Transporter } from 'nodemailer';
    import { Options } from 'nodemailer/lib/mailer';
  
    interface HandlebarsOptions {
      viewEngine: {
        partialsDir: string;
        layoutsDir: string;
        defaultLayout: string | false;
        [key: string]: any;
      };
      viewPath: string;
      extName: string;
    }
  
    function hbs(options: HandlebarsOptions): any;
  
    export default hbs;
  }
  