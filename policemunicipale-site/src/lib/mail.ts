import nodemailer from "nodemailer";

export const MAIL_FROM = "info@policemunicipale.ch";
export const MAIL_TO_SYNDICATE = "info@policemunicipale.ch";

export type MailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

export type SendMailInput = {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
  attachments?: MailAttachment[];
};

export type SmtpStatus =
  | { configured: true }
  | { configured: false; reason: string };

export function getSmtpStatus(): SmtpStatus {
  const host = process.env.SMTP_HOST?.trim();
  const port = process.env.SMTP_PORT?.trim();
  const user = process.env.SMTP_USER?.trim();
  const password = process.env.SMTP_PASSWORD?.trim();

  if (!host || !port || !user || !password) {
    return {
      configured: false,
      reason:
        "Envoi de courriel non configuré : définissez SMTP_HOST, SMTP_PORT, SMTP_USER et SMTP_PASSWORD.",
    };
  }

  const portNumber = Number(port);
  if (!Number.isFinite(portNumber) || portNumber <= 0) {
    return {
      configured: false,
      reason: "SMTP_PORT invalide.",
    };
  }

  return { configured: true };
}

export async function sendMail(input: SendMailInput): Promise<void> {
  const status = getSmtpStatus();
  if (!status.configured) {
    throw new Error(status.reason);
  }

  const host = process.env.SMTP_HOST!.trim();
  const port = Number(process.env.SMTP_PORT!.trim());
  const user = process.env.SMTP_USER!.trim();
  const password = process.env.SMTP_PASSWORD!.trim();

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass: password },
  });

  await transporter.sendMail({
    from: `SPMG <${MAIL_FROM}>`,
    to: input.to,
    subject: input.subject,
    text: input.text,
    replyTo: input.replyTo,
    attachments: input.attachments?.map((file) => ({
      filename: file.filename,
      content: file.content,
      contentType: file.contentType,
    })),
  });
}
