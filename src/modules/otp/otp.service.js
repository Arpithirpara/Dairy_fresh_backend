const nodemailer = require("nodemailer");

const otpStore = {};

const sendOtp = async (email) => {
  console.log("🔵 sendOtp called for:", email);
  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore[email] = otp;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",   // ✅ explicit host
    port: 465,                 // ✅ SSL port
    secure: true,               // ✅ true for port 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    family: 4,                  // ✅ ab ye properly apply hoga
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification OTP",
    html: `
      <h2>DairyFresh OTP Verification</h2>
      <h3>Your OTP is: ${otp}</h3>
      <p>This OTP is valid for 5 minutes.</p>
    `,
  });

  return true;
};

const verifyOtp = (email, otp) => {
  return otpStore[email] == otp;
};

const removeOtp = (email) => {
  delete otpStore[email];
};

module.exports = {
  sendOtp,
  verifyOtp,
  removeOtp,
};