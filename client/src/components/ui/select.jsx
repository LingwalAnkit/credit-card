import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";

const Dropdown = ({ options, selected, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div className="relative w-48">
      {/* Selected Option (Trigger) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex justify-between items-center w-full px-3 py-2 border rounded-lg transition-all ${
          darkMode ? "bg-black text-white border-white" : "bg-white text-black border-black"
        }`}
      >
        {selected.charAt(0).toUpperCase() + selected.slice(1)}

        {/* Animated Chevron Icon */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown />
        </motion.div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute left-0 w-full mt-2 border rounded-lg transition-all ${
              darkMode ? "bg-black border-white shadow-white" : "bg-white border-black shadow-black"
            }`}
          >
            {options.map((option) => (
              <li
                key={option}
                onClick={() => {
                  setSelected(option);
                  setIsOpen(false);
                }}
                className={`px-3 py-2 cursor-pointer transition-all ${
                  darkMode
                    ? "text-white hover:bg-gray-800"
                    : "text-black hover:bg-gray-100"
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.array.isRequired,
  selected: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
};

export default Dropdown;
