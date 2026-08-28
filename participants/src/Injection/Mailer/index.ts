import { MailerServ } from "../../services/Mailer";

const apiKey = (process.env.RESEND_KEY || process.env.RESEND_API_KEY || process.env.SENDGRID_KEY || "") as string;
const mailSrv = MailerServ(apiKey);
export { mailSrv };
