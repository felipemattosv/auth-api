import * as nodemailer from 'nodemailer';
import * as SMTPTransport from 'nodemailer/lib/smtp-transport';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.NODEMAILER_EMAIL,
    clientId: process.env.GOOGLE_CLOUD_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLOUD_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_CLOUD_REFRESH_TOKEN,
  },
} as SMTPTransport.Options);

export default transporter;
