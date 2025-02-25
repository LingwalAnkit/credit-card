import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export function Input({ label, type, name, value, onChange, placeholder }) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-black rounded-lg ${
          darkMode
            ? "bg-gray-600 border-gray-500 text-white"
            : "bg-white border-black text-black "
        }`}
      />
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};
