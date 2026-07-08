const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    mobile: {
        type: String,
        unique: true,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },

    // ---- Forgot/Reset Password fields ----
    resetPasswordToken: {
        type: String,
        default: null,
    },
    resetPasswordExpires: {
        type: Date,
        default: null,
    },
});

module.exports = mongoose.model("User", userschema);