import './PageContainer.css';

/**
 * PageContainer Component
 * Standardized page layout wrapper
 */
export const PageContainer = ({ children, className = '' }) => {
  return <div className={`nivara-page-container ${className}`}>{children}</div>;
};

/**
 * PageHeader Component
 */
export const PageHeader = ({ title, description, actions, children }) => {
  return (
    <div className="nivara-page-header">
      <div>
        {title && <h1 className="nivara-page-title">{title}</h1>}
        {description && <p className="nivara-page-description">{description}</p>}
        {children}
      </div>
      {actions && <div className="nivara-page-actions">{actions}</div>}
    </div>
  );
};

/**
 * PageContent Component
 */
export const PageContent = ({ children, className = '' }) => {
  return <div className={`nivara-page-content ${className}`}>{children}</div>;
};
