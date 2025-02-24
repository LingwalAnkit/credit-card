import { CreditCard } from "lucide-react";
import PropTypes from "prop-types";

const CardList = ({ cards }) => (
  <div className="p-4">
    <h2 className="text-3xl font-semibold mb-8">Your Cards</h2>
    <div className="grid grid-cols-2 gap-4">
      {cards.length > 0 ? (
        cards.map((card) => (
          <div
            key={card._id}
            className="relative w-[310px] h-[200px] bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-2xl p-4 text-white flex flex-col justify-between"
          >
            {/* Card Header */}
            <div className="flex justify-between items-center">
              <span className="uppercase text-lg font-bold">{card.cardType}</span>
              <CreditCard size={28} className="text-gray-300" />
            </div>

            {/* Card Number */}
            <p className="text-xl font-mono tracking-widest">
              {card.cardNumber.match(/.{1,4}/g).join(" ")}
            </p>

            {/* Card Footer */}
            <div className="flex justify-between items-center text-sm">
              <span>Expires: {card.expiryDate}</span>
              <span className="text-gray-400">CVV: ***</span>
            </div>

            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-white opacity-10 rounded-xl pointer-events-none"></div>
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
      _id: PropTypes.string.isRequired,
      cardType: PropTypes.string.isRequired,
      cardNumber: PropTypes.string.isRequired,
      expiryDate: PropTypes.string.isRequired,
      cvv: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CardList;
