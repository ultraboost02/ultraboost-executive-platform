import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    await resend.emails.send({
      from: 'UltraBoost <noreply@ultraboost.pro>',
      to: 'tech@ultraboost.pro',
      subject: 'Test UltraBoost 🚀',
      html: '<h1>Ça marche 🔥</h1><p>Resend est connecté avec succès.</p>',
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Erreur email' });
  }
}