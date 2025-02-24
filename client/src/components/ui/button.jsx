import PropTypes from "prop-types";

export function Button({ 
  children, 
  text, 
  onClick, 
  type = "button", 
  loading, 
  disabled, 
  className = "", 
  icon
}) {
  // Determine content based on children, text, and icon
  const renderContent = () => {
    if (loading) return "Processing...";
    
    // If children exist, use them
    if (children) return children;
    
    // If an icon is provided with text
    if (icon && text) {
      return (
        <div className="flex items-center gap-2">
          {icon}
          <span>{text}</span>
        </div>
      );
    }
    
    // Default to text only
    return text;
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={` ${
        loading || disabled ? "bg-gray-400 cursor-not-allowed" : ""
      } ${className}`}
    >
      {renderContent()}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.node
};