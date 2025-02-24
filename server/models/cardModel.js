const mongoose = require("mongoose");

const creditCardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cardNumber: {
    type: String,
    required: true,
    unique: true
  },
  cardType: {
    type: String,
    enum: ['visa', 'mastercard', 'amex'],
    required: true
  },
  expiryDate: {
    type: String,
    required: true
  },
  cvv: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const CreditCard = mongoose.model("CreditCard", creditCardSchema);
module.exports = CreditCard;