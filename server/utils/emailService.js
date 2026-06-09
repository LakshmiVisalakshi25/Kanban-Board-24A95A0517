import * as Brevo from "@getbrevo/brevo";

const apiInstance = new Brevo.TransactionalEmailsApi();
apiInstance.authentications["apiKey"].apiKey = process.env.BREVO_API_KEY;

export async function sendOTPEmail(toEmail, otp) {
  const sendSmtpEmail = new Brevo.SendSmtpEmail();

  sendSmtpEmail.subject = "Password Reset OTP - Kanban Board";
  sendSmtpEmail.to = [{ email: toEmail }];
  sendSmtpEmail.sender = { 
    name: "Kanban Board", 
    email: process.env.BREVO_SENDER_EMAIL  // must be verified in Brevo
  };
  sendSmtpEmail.htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 400px; margin: auto; padding: 30px; border: 1px solid #e0e0e0; border-radius: 10px;">
      <h2 style="color: #2563eb;">Password Reset</h2>
      <p>Your OTP for password reset is:</p>
      <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #2563eb; padding: 20px; background: #f0f4ff; border-radius: 8px; text-align: center;">
        ${otp}
      </div>
      <p style="color: #666; margin-top: 20px;">This OTP expires in <strong>10 minutes</strong>.</p>
      <p style="color: #999; font-size: 12px;">If you didn't request this, ignore this email.</p>
    </div>
  `;

  await apiInstance.sendTransacEmail(sendSmtpEmail);
}