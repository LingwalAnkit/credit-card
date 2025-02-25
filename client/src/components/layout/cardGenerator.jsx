import { Plus } from "lucide-react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Dropdown from "../ui/select";
import { Button } from "../ui/button";

const CardGenerator = ({ onGenerate, loading, selectedType, setSelectedType }) => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div
      className={`p-4 border mb-12 shadow-md rounded-lg transition-all ${
        darkMode ? "bg-black text-white border-white shadow-white" : "bg-white text-black border-black shadow-black"
      }`}
    >
      <h2 className="text-lg font-semibold mb-2">Generate New Card</h2>
      <div className="flex gap-2">
        <Dropdown
          options={["visa", "mastercard", "amex"]}
          selected={selectedType}
          setSelected={setSelectedType}
        />
        <Button
          icon={<Plus size={20} />}
          text="Generate"
          onClick={onGenerate}
          disabled={loading}
          loading={loading}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            darkMode ? "bg-white text-black" : "bg-black text-white"
          } shadow-lg hover:bg-gray-400 hover:text-black disabled:opacity-50`}
        />
      </div>
    </div>
  );
};

CardGenerator.propTypes = {
  onGenerate: PropTypes.func.isRequired, // Function required for card generation
  loading: PropTypes.bool, // Boolean to indicate loading state
  selectedType: PropTypes.string.isRequired, // Selected card type
  setSelectedType: PropTypes.func.isRequired, // Function to update selectedType
};

export default CardGenerator;
