import transporter from "src/nodemailer/nodemailer-config";

class SendEmailService {
  async execute(destiny: string, subject: string, body: string): Promise<boolean> {

    try {
      await transporter.sendMail({
        from: process.env.NODEMAILER_EMAIL,
        to: destiny,
        subject: subject,
        html: body
      });

      return true;
    } catch {
      return false;
    }
  }
}

export { SendEmailService };
