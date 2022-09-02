import { User } from '@prisma/client';
import * as sgMail from '@sendgrid/mail';

const SEND_GRID_KEY =
  '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';

export function sendEmail(user: User) {
  sgMail.setApiKey(SEND_GRID_KEY);
  const msg = {
    to: user.email,
    from: 'usabl.tester@gmail.com',
    subject: 'You are invited to try Cal Track',
    text: `You are invited to use CalTrack. Login details \n email: ${user.email} \n pass: ${user.password}`,
    html: `You are invited to use CalTrack. Login details <br> email: <b>${user.email}</b> <br> pass: <b>${user.password}</b>`,
  };
  sgMail
    .send(msg)
    .then(() => {})
    .catch((error) => {
      console.error(error);
    });
}
