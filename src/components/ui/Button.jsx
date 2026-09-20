import './Button.css';

/**
 * Button Component
 * Variants: primary, secondary, outline, ghost, danger
 * Sizes: sm, md, lg
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  type = 'button',
  onClick,
  ...props
}) => {
  const classes = [
    'nivara-button',
    `nivara-button--${variant}`,
    `nivara-button--${size}`,
    fullWidth && 'nivara-button--full-width',
    loading && 'nivara-button--loading',
    disabled && 'nivara-button--disabled',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <span className="nivara-button__spinner" aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="8"
              cy="8"
              r="6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="32"
              strokeDashoffset="32"
            >
              <animate
                attributeName="stroke-dashoffset"
                dur="1s"
                repeatCount="indefinite"
                from="32"
                to="0"
              />
            </circle>
          </svg>
        </span>
      )}
      {icon && iconPosition === 'left' && !loading && (
        <span className="nivara-button__icon">{icon}</span>
      )}
      <span className="nivara-button__label">{children}</span>
      {icon && iconPosition === 'right' && !loading && (
        <span className="nivara-button__icon">{icon}</span>
      )}
    </button>
  );
};

export default Button;
