import './Loading.css';

/**
 * Spinner Component
 */
export const Spinner = ({ size = 'md', className = '' }) => {
  const classes = ['nivara-spinner', `nivara-spinner--${size}`, className]
    .filter(Boolean)
    .join(' ');

  return <div className={classes} role="status" aria-label="Loading" />;
};

/**
 * Loading Container
 * For full-page or section loading states
 */
const Loading = ({ message = 'Loading...', size = 'md' }) => {
  return (
    <div className="nivara-loading-container" role="status" aria-live="polite">
      <Spinner size={size} />
      {message && <span className="nivara-loading-container__message">{message}</span>}
    </div>
  );
};

/**
 * Skeleton Component
 * For content placeholders while loading
 */
export const Skeleton = ({ variant = 'text', width, height, className = '' }) => {
  const classes = ['nivara-skeleton', `nivara-skeleton--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  const style = {
    ...(width && { width }),
    ...(height && { height }),
  };

  return <div className={classes} style={style} aria-hidden="true" />;
};

export default Loading;
