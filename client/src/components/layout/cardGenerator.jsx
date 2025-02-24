import { Plus } from "lucide-react";
import PropTypes from "prop-types";

const CardGenerator = ({
  onGenerate,
  loading,
  selectedType,
  setSelectedType,
}) => (
  <div className="p-4 border rounded-lg mb-4">
    <h2 className="text-lg font-semibold mb-2">Generate New Card</h2>
    <div className="flex gap-2">
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="px-3 py-2 border rounded-lg bg-white text-black"
      >
        <option value="visa">Visa</option>
        <option value="mastercard">Mastercard</option>
        <option value="amex">Amex</option>
      </select>
      <button
        onClick={onGenerate}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
      >
        <Plus size={20} /> Generate
      </button>
    </div>
  </div>
);

CardGenerator.propTypes = {
  onGenerate: PropTypes.func.isRequired, // Function required for card generation
  loading: PropTypes.bool, // Boolean to indicate loading state
  selectedType: PropTypes.string.isRequired, // Selected card type
  setSelectedType: PropTypes.func.isRequired, // Function to update selectedType
};

export default CardGenerator;
