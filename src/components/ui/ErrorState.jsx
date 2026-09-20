import { AlertCircle } from 'lucide-react';
import './ErrorState.css';

/**
 * ErrorState Component
 * For displaying error states
 */
const ErrorState = ({
  title = 'Something went wrong',
  message,
  action,
  variant = 'default',
  className = '',
}) => {
  return (
    <div className={`nivara-error-state nivara-error-state--${variant} ${className}`}>
      <div className="nivara-error-state__icon">
        <AlertCircle />
      </div>
      <h3 className="nivara-error-state__title">{title}</h3>
      {message && <p className="nivara-error-state__message">{message}</p>}
      {action && <div className="nivara-error-state__action">{action}</div>}
    </div>
  );
};

export default ErrorState;
