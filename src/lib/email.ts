import nodemailer from "nodemailer";

function env(name: string): string {
  return process.env[name]?.trim() ?? "";
}

export function isEmailConfigured(): boolean {
  return Boolean(env("SMTP_HOST") && env("SMTP_PORT") && env("SMTP_USER") && env("SMTP_PASS") && env("SMTP_FROM"));
}

type SendEmailArgs = {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
};

export async function sendEmail({ to, subject, text, html }: SendEmailArgs): Promise<void> {
  if (!isEmailConfigured()) {
    throw new Error("Email non configuré (SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS/SMTP_FROM).");
  }

  const host = env("SMTP_HOST");
  const port = Number(env("SMTP_PORT"));
  const user = env("SMTP_USER");
  const pass = env("SMTP_PASS");
  const from = env("SMTP_FROM");

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    ...(html ? { html } : {}),
  });
}

