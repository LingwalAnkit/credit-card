import { CreditCard } from "lucide-react";
import PropTypes from "prop-types";

const CardList = ({ cards }) => (
  <div className="p-4 border rounded-lg">
    <h2 className="text-lg font-semibold mb-2">Your Cards</h2>
    <div className="grid gap-2">
      {cards.length > 0 ? (
        cards.map((card) => (
          <div
            key={card._id}
            className="p-3 border rounded-lg bg-black text-white"
          >
            <div className="flex items-center gap-2 mb-2">
              <CreditCard size={20} />{" "}
              <span className="capitalize">{card.cardType}</span>
            </div>
            <p className="font-mono text-lg">
              {card.cardNumber.match(/.{1,4}/g).join(" ")}
            </p>
            <p className="text-sm">Expires: {card.expiryDate}</p>
            <p className="text-sm">CVV: {card.cvv}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center py-4">
          No cards generated yet.
        </p>
      )}
    </div>
  </div>
);

CardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired, // Unique identifier for the card
      cardType: PropTypes.string.isRequired, // Visa, Mastercard, etc.
      cardNumber: PropTypes.string.isRequired, // Card number as a string
      expiryDate: PropTypes.string.isRequired, // Expiry date in MM/YY format
      cvv: PropTypes.string.isRequired, // Card security code
    })
  ).isRequired,
};

export default CardList;
