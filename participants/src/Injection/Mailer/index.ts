import { MailerServ } from "../../services/Mailer";

const mailSrv = MailerServ(process.env.SENDGRID_KEY as string);
export { mailSrv };
