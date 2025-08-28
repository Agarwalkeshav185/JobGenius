import React from 'react';

const AlertDisplay = ({ 
  message, 
  onClose, 
  className = "",
  variant = "error" // error, warning, info, success
}) => {
  if (!message) return null;

  const variantStyles = {
    error: "bg-red-50 border-red-200 text-red-600",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-700",
    info: "bg-blue-50 border-blue-200 text-blue-700",
    success: "bg-green-50 border-green-200 text-green-600" // Added success
  };

  const iconStyles = {
    error: "text-red-400 hover:text-red-600",
    warning: "text-yellow-400 hover:text-yellow-600",
    info: "text-blue-400 hover:text-blue-600",
    success: "text-green-400 hover:text-green-600"
  };

  return (
    <div className={`mb-4 p-4 border rounded-lg ${variantStyles[variant]} ${className}`}>
      <div className="flex justify-between items-center">
        <p className="flex-1 mr-3">{message}</p>
        {onClose && (
          <button 
            onClick={onClose}
            className={`${iconStyles[variant]} transition-colors hover:opacity-75`}
            aria-label="Close message"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default AlertDisplay;


