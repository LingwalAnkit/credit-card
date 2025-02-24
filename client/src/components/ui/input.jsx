import PropTypes from "prop-types";

export function Input({ label, type, name, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type} 
        name={name}
        value={value} 
        onChange={onChange} 
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-black bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
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
