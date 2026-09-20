import './EmptyState.css';

/**
 * EmptyState Component
 * For displaying empty data states
 */
const EmptyState = ({
  icon,
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <div className={`nivara-empty-state ${className}`}>
      {icon && <div className="nivara-empty-state__icon">{icon}</div>}
      {title && <h3 className="nivara-empty-state__title">{title}</h3>}
      {description && <p className="nivara-empty-state__description">{description}</p>}
      {action && <div className="nivara-empty-state__action">{action}</div>}
    </div>
  );
};

export default EmptyState;
