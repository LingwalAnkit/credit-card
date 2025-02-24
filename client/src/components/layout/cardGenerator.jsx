import { Plus } from "lucide-react";
import PropTypes from "prop-types";
import Dropdown from "../ui/select";
import { Button } from "../ui/button";

const CardGenerator = ({
  onGenerate,
  loading,
  selectedType,
  setSelectedType,
}) => (
  <div className="p-4 border mb-12 shadow-lg">
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
        className="flex items-center gap-2 px-4 py-2 bg-black text-white shadow-2xl hover:bg-gray-400 hover:text-black disabled:opacity-50"
      />
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
