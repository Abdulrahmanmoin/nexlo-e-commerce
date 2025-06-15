import sgMail from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY is not defined in environment variables');
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendVerificationEmail = async (email: string, fullName: string, verificationCode: number) => {
  const msg = {
    to: email,
    from: process.env.SENDGRID_SENDER_EMAIL!, // Replace with your verified SendGrid sender
    subject: 'Verify Your Email: 𝗡𝗲𝘅𝗹𝗼',
    html: `
      <div>
        <h1>Hello ${fullName}!</h1>
        <p>Thank you for signing up. Please use the following verification code to verify your account:</p>
        <h2 style="color: #00466a;">${verificationCode}</h2>
        <p>This code will expire in 2 hours.</p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
};