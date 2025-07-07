const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  course: String,
  paymentInfo: {
    cardNumber: String,
    expiry: String,
    cvv: String
  },
  completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Registration', RegistrationSchema);
