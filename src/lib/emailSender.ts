// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Resend } from 'resend';


const resend = new Resend('RESEND_API_KEY'); 

type EmailPayload = {
  to: string;
  name: string;
  restaurant: string;
  time: string;
  date: string;
};

export async function sendBookingConfirmation({
  to,
  name,
  restaurant,
  time,
  date,
}: EmailPayload): Promise<void> {
  try {
    await resend.emails.send({
      from: 'booking@yourrestaurantapp.com',
      to: to,
      subject: 'Your Table is Booked!',
      html: `
        <p>Hi ${name},</p>
        <p>Your reservation at <strong>${restaurant}</strong> for <strong>${date} at ${time}</strong> is confirmed.</p>
        <p>We look forward to seeing you!</p>
      `,
    });
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error('❌ Failed to send email:', error);
  }
}
