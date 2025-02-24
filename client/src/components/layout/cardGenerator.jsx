import { Plus } from "lucide-react";
import PropTypes from "prop-types";
import Dropdown from "../ui/select";
import { useState } from "react";
import { Button } from "../ui/button";

const CardGenerator = ({ onGenerate }) => {
  const [selectedType, setSelectedType] = useState("visa");
  return (
    <div className="p-4 border rounded-lg mb-12 shadow-lg">
      <h2 className="text-lg font-semibold mb-2">Generate New Card</h2>
      <div className="flex items-center justify-between gap-4">
        <Dropdown
          options={["visa", "mastercard", "amex"]}
          selected={selectedType}
          setSelected={setSelectedType}
        />
        <Button text={"Generate"} onClick={onGenerate}>
          <Plus size={20} /> Generate
        </Button>
      </div>
    </div>
  );
};

CardGenerator.propTypes = {
  onGenerate: PropTypes.func.isRequired, // Function required for card generation
};

export default CardGenerator;
