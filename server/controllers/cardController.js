const CreditCard = require("../models/cardModel");
const {
  generateRandomCard,
  generateExpiry,
  generateCVV,
} = require("../utils/generator");

exports.createCreditCard = async (req, res) => {
  try {
    const { cardType } = req.body;
    const userId = req.user.id; // From auth middleware

    if (!["visa", "mastercard", "amex"].includes(cardType)) {
      return res.status(400).json({ message: "Invalid card type" });
    }

    const cardNumber = generateRandomCard(cardType);
    const expiryDate = generateExpiry();
    const cvv = generateCVV(cardType);

    const creditCard = new CreditCard({
      userId,
      cardNumber,
      cardType,
      expiryDate,
      cvv,
    });

    await creditCard.save();

    res.status(201).json({
      message: "Credit card generated successfully",
      card: {
        cardNumber,
        cardType,
        expiryDate,
        cvv,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error generating credit card", error: error.message });
  }
};

exports.getCreditCards = async (req, res) => {
  try {
    const userId = req.user.id; 
    const cards = await CreditCard.find({ userId }).select("-cvv"); // Exclude CVV for security
    res.json({ cards });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching credit cards", error: error.message });
  }
};
