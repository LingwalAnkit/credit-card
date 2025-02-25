import { Plus } from "lucide-react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Dropdown from "../ui/select";
import { Button } from "../ui/button";

const CardGenerator = ({ onGenerate, loading, selectedType, setSelectedType }) => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleGenerate = async () => {
    try {
      // Show a loading toast that can be dismissed when onGenerate completes
      toast.loading(`Generating ${selectedType.toUpperCase()} card...`, { id: 'cardGeneration' });
      
      // Call the original onGenerate function
      await onGenerate();
      
      // Once generation is successful, update the toast
      toast.success(`${selectedType.toUpperCase()} card generated successfully!`, { id: 'cardGeneration' });
    } catch (error) {
      // If there's an error, show an error toast
      toast.error(`Failed to generate ${selectedType.toUpperCase()} card. Please try again.`, { id: 'cardGeneration' });
    }
  };

  return (
    <div
      className={`p-4 border mb-8 md:mb-12 shadow-md rounded-lg transition-all 
        ${darkMode ? "bg-black text-white border-white shadow-white" : "bg-white text-black border-black shadow-black"}
      `}
    >
      <h2 className="text-lg sm:text-xl font-semibold mb-3">Generate New Card</h2>
      <div className="flex flex-col sm:flex-row gap-3">
        <Dropdown
          options={["visa", "mastercard", "amex"]}
          selected={selectedType}
          setSelected={setSelectedType}
          className="w-full sm:w-auto"
        />
        <Button
          icon={<Plus size={20} />}
          text="Generate"
          onClick={handleGenerate}
          disabled={loading}
          loading={loading}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition w-full sm:w-auto 
            ${darkMode ? "bg-white text-black" : "bg-black text-white"} 
            shadow-lg hover:bg-gray-400 hover:text-black disabled:opacity-50`}
        />
      </div>
    </div>
  );
};

CardGenerator.propTypes = {
  onGenerate: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  selectedType: PropTypes.string.isRequired,
  setSelectedType: PropTypes.func.isRequired,
};

export default CardGenerator;