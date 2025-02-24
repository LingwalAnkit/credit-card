import { CreditCard } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "../ui/button";

const CardList = ({ cards }) => {
  const [visibleCVV, setVisibleCVV] = useState(null);

  const handleShowCVV = (cardId) => {
    setVisibleCVV(cardId);
    setTimeout(() => setVisibleCVV(null), 3000); // Hide after 5 seconds
  };

  return (
    <div className="p-4">
      <h2 className="flex items-center justify-center text-3xl font-bold mb-6">
        Your Cards
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {cards.length > 0 ? (
          cards.map((card) => (
            <div
              key={card._id}
              className="relative w-[320px] h-[200px] bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-2xl p-4 text-white flex flex-col justify-between"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center">
                <span className="uppercase text-lg font-bold">
                  {card.cardType}
                </span>
                <CreditCard size={28} className="text-gray-300" />
              </div>

              {/* Card Number */}
              <p className="text-xl font-mono tracking-widest">
                {card.cardNumber.match(/.{1,4}/g).join(" ")}
              </p>

              {/* Card Footer */}
              <div className="flex justify-between items-center text-sm">
                <span>Expires: {card.expiryDate}</span>
                <div className="flex flex-row gap-2">
                  <Button
                    text="Show CVV"
                    onClick={() => handleShowCVV(card._id)}
                    className="px-1 bg-gray-200 text-black rounded-lg"
                  />
                  <span className="text-gray-400">
                    {visibleCVV === card._id ? card.cvv : "•••"}
                  </span>
                </div>
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
};

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
