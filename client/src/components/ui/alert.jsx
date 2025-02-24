import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import PropTypes from 'prop-types';

const Alert = ({ children, variant = "default", className = "", ...props }) => {
  const baseStyles = "relative w-full rounded-lg border p-4 mb-4 flex gap-3 items-start";
  
  const variants = {
    default: "bg-gray-50 border-gray-200 text-gray-900",
    error: "bg-red-50 border-red-200 text-red-900",
    success: "bg-green-50 border-green-200 text-green-900",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-900",
    info: "bg-blue-50 border-blue-200 text-blue-900",
    destructive: "bg-red-50 border-red-200 text-red-900"
  };

  const icons = {
    default: <Info className="h-5 w-5 text-gray-600" />,
    error: <AlertCircle className="h-5 w-5 text-red-600" />,
    success: <CheckCircle className="h-5 w-5 text-green-600" />,
    warning: <AlertCircle className="h-5 w-5 text-yellow-600" />,
    info: <Info className="h-5 w-5 text-blue-600" />,
    destructive: <AlertCircle className="h-5 w-5 text-red-600" />
  };

  return (
    <div 
      role="alert"
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {icons[variant]}
      <div className="flex-1">{children}</div>
    </div>
  );
};

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    'default',
    'error',
    'success',
    'warning',
    'info',
    'destructive'
  ]),
  className: PropTypes.string
};

Alert.defaultProps = {
  variant: 'default',
  className: ''
};

const AlertDescription = ({ children, className = "", ...props }) => {
  return (
    <div 
      className={`text-sm [&_p]:leading-relaxed ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

AlertDescription.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

AlertDescription.defaultProps = {
  className: ''
};

export { Alert, AlertDescription };