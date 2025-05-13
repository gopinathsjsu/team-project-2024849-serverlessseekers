// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { NextResponse } from 'next/server';
import { sendBookingConfirmation } from '@/lib/emailSender';

export async function GET() {
  await sendBookingConfirmation({
    to: 'testuser@example.com',
    name: 'Rahul',
    restaurant: 'Olive Garden',
    time: '7:00 PM',
    date: 'May 13, 2025',
  });

  return NextResponse.json({ message: 'Email sent successfully' });
}
