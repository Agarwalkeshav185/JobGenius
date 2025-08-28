// Components/UI/FormField.jsx
import React, { useState } from 'react';

const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  disabled = false,
  editable = true,
  error,
  icon: Icon,
  className = '',
  inputClassName = '',
  labelClassName = '',
  rows,
  options = [],
  accept,
  multiple = false,
  autoComplete = 'off',
  maxLength,
  pattern,
  min,
  max,
  step,
  helpText,
  showOptional = true
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const fieldId = `field-${name}`;
  const errorId = `${fieldId}-error`;
  const helpId = `${fieldId}-help`;

  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  // Base input classes with proper padding for different input types
  const getInputClasses = () => {
    const baseClasses = `
      w-full border rounded-lg transition-all duration-200
      ${error 
        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
        : isFocused 
          ? 'border-teal-500 focus:border-teal-500 focus:ring-teal-500' 
          : 'border-gray-300 focus:border-teal-500 focus:ring-teal-500'
      }
      ${disabled || !editable 
        ? 'bg-gray-100 cursor-not-allowed text-gray-500' 
        : 'bg-white hover:border-gray-400'
      }
      focus:ring-2 focus:ring-opacity-50 focus:outline-none
      ${inputClassName}
    `;

    // Different padding for different input types
    if (type === 'textarea') {
      return `${baseClasses} ${Icon ? 'pl-12 pr-4 pt-3 pb-3' : 'px-4 py-3'}`;
    }
    
    return `${baseClasses} ${Icon ? 'pl-12 pr-4 py-3' : 'px-4 py-3'}`;
  };

  // Render different input types
  const renderInput = () => {
    if (type === 'textarea') {
      return (
        <textarea
          id={fieldId}
          name={name}
          value={value || ''}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          disabled={disabled || !editable}
          className={getInputClasses()}
          rows={rows || 4}
          maxLength={maxLength}
          autoComplete={autoComplete}
          aria-describedby={`${error ? errorId : ''} ${helpText ? helpId : ''}`.trim()}
          aria-invalid={error ? 'true' : 'false'}
          style={{ resize: 'vertical', minHeight: `${(rows || 4) * 1.5 + 1.5}rem` }}
        />
      );
    }

    if (type === 'select') {
      return (
        <select
          id={fieldId}
          name={name}
          value={value || ''}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          disabled={disabled || !editable}
          className={getInputClasses()}
          aria-describedby={`${error ? errorId : ''} ${helpText ? helpId : ''}`.trim()}
          aria-invalid={error ? 'true' : 'false'}
        >
          <option value="">{placeholder || `Select ${label}`}</option>
          {options.map((option) => (
            <option 
              key={option.value || option} 
              value={option.value || option}
            >
              {option.label || option}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        id={fieldId}
        name={name}
        type={type}
        value={value || ''}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        required={required}
        disabled={disabled || !editable}
        className={getInputClasses()}
        autoComplete={autoComplete}
        maxLength={maxLength}
        pattern={pattern}
        min={min}
        max={max}
        step={step}
        accept={accept}
        multiple={multiple}
        aria-describedby={`${error ? errorId : ''} ${helpText ? helpId : ''}`.trim()}
        aria-invalid={error ? 'true' : 'false'}
      />
    );
  };

  return (
    <div className={`mb-6 ${className}`}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={fieldId}
          className={`block text-sm font-medium text-gray-700 mb-2 ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
          {!required && showOptional && (
            <span className="text-gray-400 text-xs ml-1">(optional)</span>
          )}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Icon - Fixed positioning for textarea */}
        {Icon && (
          <div className={`absolute text-gray-400 z-10 pointer-events-none ${
            type === 'textarea' 
              ? 'left-4 top-4' // Position icon at top-left for textarea
              : 'left-4 top-1/2 transform -translate-y-1/2' // Center for regular inputs
          }`}>
            <Icon size={18} />
          </div>
        )}

        {/* Input Field */}
        {renderInput()}

        {/* Loading State Indicator */}
        {disabled && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
          </div>
        )}
      </div>

      {/* Help Text */}
      {helpText && !error && (
        <p id={helpId} className="mt-2 text-sm text-gray-500">
          {helpText}
        </p>
      )}

      {/* Error Message */}
      {error && (
        <p id={errorId} className="mt-2 text-sm text-red-600 flex items-center">
          <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}

      {/* Character Count (for text inputs with maxLength) */}
      {maxLength && (type === 'text' || type === 'textarea') && value && (
        <div className="mt-2 text-xs text-gray-400 text-right">
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  );
};

export default FormField;