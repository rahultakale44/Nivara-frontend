import './Input.css';

/**
 * Input Component
 * Supports text, email, password, number, search, url, tel
 */
const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helper,
  required = false,
  disabled = false,
  icon,
  ...props
}) => {
  const inputClasses = [
    'nivara-input',
    error && 'nivara-input--error',
    icon && 'nivara-input--with-icon',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="nivara-input-wrapper">
      {label && (
        <label
          className={`nivara-input-label ${required ? 'nivara-input-label--required' : ''}`}
        >
          {label}
        </label>
      )}

      <div className="nivara-input-icon-wrapper">
        {icon && <span className="nivara-input-icon">{icon}</span>}
        <input
          type={type}
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          {...props}
        />
      </div>

      {error && <span className="nivara-input-error">{error}</span>}
      {helper && !error && <span className="nivara-input-helper">{helper}</span>}
    </div>
  );
};

/**
 * Textarea Component
 */
export const Textarea = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  helper,
  required = false,
  disabled = false,
  rows = 4,
  ...props
}) => {
  const textareaClasses = [
    'nivara-textarea',
    error && 'nivara-textarea--error',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="nivara-input-wrapper">
      {label && (
        <label
          className={`nivara-input-label ${required ? 'nivara-input-label--required' : ''}`}
        >
          {label}
        </label>
      )}

      <textarea
        className={textareaClasses}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        rows={rows}
        {...props}
      />

      {error && <span className="nivara-input-error">{error}</span>}
      {helper && !error && <span className="nivara-input-helper">{helper}</span>}
    </div>
  );
};

/**
 * Select Component
 */
export const Select = ({
  label,
  value,
  onChange,
  children,
  options = [],
  placeholder = 'Select an option',
  error,
  helper,
  required = false,
  disabled = false,
  icon,
  ...props
}) => {
  const selectClasses = [
    'nivara-select',
    error && 'nivara-select--error',
    icon && 'nivara-input--with-icon',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="nivara-input-wrapper">
      {label && (
        <label
          className={`nivara-input-label ${required ? 'nivara-input-label--required' : ''}`}
        >
          {label}
        </label>
      )}

      <div className="nivara-input-icon-wrapper">
        {icon && <span className="nivara-input-icon">{icon}</span>}
        <select
          className={selectClasses}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          {...props}
        >
          {children ? children : (
            <>
              {placeholder && (
                <option value="" disabled>
                  {placeholder}
                </option>
              )}
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </>
          )}
        </select>
      </div>

      {error && <span className="nivara-input-error">{error}</span>}
      {helper && !error && <span className="nivara-input-helper">{helper}</span>}
    </div>
  );
};

export default Input;
