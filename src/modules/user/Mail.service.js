const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  family: 4, // ✅ IPv4 force — ye add karo
});

// ================= SEND RESET PASSWORD EMAIL =================
const sendResetPasswordEmail = async (email, resetLink) => {
  try {
    await transporter.sendMail({
      from: `"DairyFresh 🐄" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your Password - DairyFresh",

      html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width:600px;
        margin:auto;
        border:1px solid #ddd;
        border-radius:10px;
        overflow:hidden;
        box-shadow:0px 2px 10px rgba(0,0,0,0.1);
      ">

        <!-- Header -->
        <div style="
          background:#4CAF50;
          padding:25px;
          text-align:center;
          color:white;
        ">
          
          <!-- Replace with your real logo URL -->
          <img
            src="https://yourdomain.com/logo.png"
            alt="DairyFresh Logo"
            width="80"
            style="margin-bottom:10px;"
          />

          <h1 style="
            margin:0;
            font-size:28px;
          ">
            🐄 DairyFresh
          </h1>

        </div>

        <!-- Main Content -->
        <div style="padding:30px">

          <h2 style="color:#333;">
            Password Reset Request
          </h2>

          <p style="color:#666; line-height:1.6;">
            Hello,
          </p>

          <p style="color:#666; line-height:1.6;">
            We received a request to reset your DairyFresh account password.
          </p>

          <p style="color:#666; line-height:1.6;">
            Click the button below to create a new password.
          </p>

          <p style="color:#666;">
            This reset link will expire in
            <strong>15 minutes</strong>.
          </p>

          <div style="
            text-align:center;
            margin:35px 0;
          ">

            <a
              href="${resetLink}"
              style="
                background:#4CAF50;
                color:white;
                text-decoration:none;
                padding:14px 28px;
                border-radius:6px;
                font-size:16px;
                font-weight:bold;
                display:inline-block;
              "
            >
              Reset Password
            </a>

          </div>

          <p style="
            color:#888;
            font-size:14px;
            line-height:1.6;
          ">
            If you didn't request this password reset,
            you can safely ignore this email.
          </p>

          <hr style="
            border:none;
            border-top:1px solid #eee;
            margin:25px 0;
          ">

          <p style="
            color:#999;
            font-size:12px;
            word-break:break-all;
          ">
            If the button doesn't work, copy and paste this link into your browser:
          </p>

          <p style="
            color:#4CAF50;
            font-size:12px;
            word-break:break-all;
          ">
            ${resetLink}
          </p>

        </div>

        <!-- Footer -->
        <div style="
          background:#f7f7f7;
          padding:15px;
          text-align:center;
          color:#777;
          font-size:12px;
        ">
          © 2026 DairyFresh. All rights reserved.
        </div>

      </div>
      `,
    });

    console.log("Reset password email sent successfully");

  } catch (error) {
    console.error("Email Error:", error);
    throw error;
  }
};

module.exports = {
  sendResetPasswordEmail,
};