const { Resend } = require("resend");
const resend = new Resend(process.env.resend_api);

const otpStore = {};

const sendOtp = async (email) => {
  console.log("🔵 sendOtp called for:", email);
  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore[email] = otp;

  await resend.emails.send({
    from: "DairyFresh <onboarding@resend.dev>",   // testing ke liye ye default domain use kar sakte ho
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