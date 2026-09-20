import './Card.css';

/**
 * Card Component
 * Reusable card container with consistent styling
 */
const Card = ({
  children,
  variant = 'default',
  padding = 'default',
  interactive = false,
  onClick,
  className = '',
  ...props
}) => {
  const classes = [
    'nivara-card',
    `nivara-card--${variant}`,
    `nivara-card--padding-${padding}`,
    interactive && 'nivara-card--interactive',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const Element = interactive && onClick ? 'button' : 'div';

  return (
    <Element className={classes} onClick={onClick} {...props}>
      {children}
    </Element>
  );
};

/**
 * Card Header
 */
export const CardHeader = ({ children, className = '' }) => {
  return <div className={`nivara-card-header ${className}`}>{children}</div>;
};

/**
 * Card Title
 */
export const CardTitle = ({ children, className = '' }) => {
  return <h3 className={`nivara-card-title ${className}`}>{children}</h3>;
};

/**
 * Card Content
 */
export const CardContent = ({ children, className = '' }) => {
  return <div className={`nivara-card-content ${className}`}>{children}</div>;
};

/**
 * Card Footer
 */
export const CardFooter = ({ children, className = '' }) => {
  return <div className={`nivara-card-footer ${className}`}>{children}</div>;
};

export default Card;
