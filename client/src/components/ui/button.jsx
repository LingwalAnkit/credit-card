import PropTypes from "prop-types";

export function Button({ text, loading, onClick, ...props }) {
  return (
    <button
      className="w-full py-2 border border-black bg-black text-white hover:bg-white hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={loading}
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  loading: false,
  onClick: () => {},
};
