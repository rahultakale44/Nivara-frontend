import './Badge.css';

/**
 * Badge Component
 * For status, priority, and categorical labels
 */
const Badge = ({
  children,
  variant = 'neutral',
  size = 'md',
  icon,
  className = '',
  ...props
}) => {
  const classes = [
    'nivara-badge',
    `nivara-badge--${variant}`,
    `nivara-badge--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...props}>
      {icon && <span className="nivara-badge__icon">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

/**
 * Status Badge Helper
 * Maps complaint status to badge variant
 */
export const StatusBadge = ({ status, size = 'md', ...props }) => {
  const statusMap = {
    PENDING: 'pending',
    IN_PROGRESS: 'in-progress',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
  };

  const labelMap = {
    PENDING: 'Pending',
    IN_PROGRESS: 'In Progress',
    RESOLVED: 'Resolved',
    REJECTED: 'Rejected',
  };

  const variant = statusMap[status] || 'neutral';
  const label = labelMap[status] || status;

  return (
    <Badge variant={variant} size={size} {...props}>
      {label}
    </Badge>
  );
};

/**
 * Priority Badge Helper
 * Maps priority level to badge variant
 */
export const PriorityBadge = ({ priority, size = 'md', ...props }) => {
  const priorityMap = {
    LOW: 'priority-low',
    MEDIUM: 'priority-medium',
    HIGH: 'priority-high',
    URGENT: 'priority-urgent',
  };

  const labelMap = {
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    URGENT: 'Urgent',
  };

  const variant = priorityMap[priority] || 'neutral';
  const label = labelMap[priority] || priority;

  return (
    <Badge variant={variant} size={size} {...props}>
      {label}
    </Badge>
  );
};

export default Badge;
