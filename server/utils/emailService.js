const SibApiV3Sdk = require("sib-api-v3-sdk");

const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const transactionalApi = new SibApiV3Sdk.TransactionalEmailsApi();

async function sendOTP(toEmail, otp) {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = "Password Reset OTP - Kanban Board";
  sendSmtpEmail.to = [{ email: toEmail }];
  sendSmtpEmail.sender = {
    name: "Kanban Board",
    email: process.env.BREVO_SENDER_EMAIL,
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

  await transactionalApi.sendTransacEmail(sendSmtpEmail);
}

module.exports = { sendOTP };