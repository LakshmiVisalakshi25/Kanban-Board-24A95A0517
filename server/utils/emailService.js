const nodemailer = require(
  "nodemailer"
);

// TRANSPORTER
const transporter =
  nodemailer.createTransport({
    service: "gmail",

    auth: {
      user:
        process.env.EMAIL_USER,

      pass:
        process.env.EMAIL_PASS,
    },
  });

// DEADLINE REMINDER EMAIL
async function sendReminder(
  email,
  task
) {
  try {
    await transporter.sendMail({
      from:
        process.env.EMAIL_USER,

      to: email,

      subject:
        "Task Deadline Reminder",

      html: `
        <h2>Task Reminder</h2>

        <p>Your task
        <strong>${task.title}</strong>
        is due on
        <strong>${task.dueDate}</strong>.
        </p>

        <p>Please complete it before the deadline.</p>
      `,
    });

    console.log(
      `Reminder sent to ${email}`
    );
  } catch (error) {
    console.log(
      "Email Error:",
      error
    );
  }
}

// OTP EMAIL
async function sendOTP(
  email,
  otp
) {
  try {
    await transporter.sendMail({
      from:
        process.env.EMAIL_USER,

      to: email,

      subject:
        "Password Reset OTP",

      html: `
        <h2>Password Reset Request</h2>

        <p>Your OTP is:</p>

        <h1>${otp}</h1>

        <p>This OTP expires in 10 minutes.</p>

        <p>If you didn't request this, please ignore this email.</p>
      `,
    });

    console.log(
      `OTP sent to ${email}`
    );
  } catch (error) {
    console.log(
      "OTP Email Error:",
      error
    );

    throw error;
  }
}

// EXPORTS
module.exports = {
  sendReminder,
  sendOTP,
};