import './NivaraBrand.css';

/**
 * NivaraBrand Component
 * Nivara product branding and identity
 */
const NivaraBrand = ({ variant = 'default', showTagline = true }) => {
  const classes = ['nivara-brand', variant !== 'default' && `nivara-brand--${variant}`]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <h1 className="nivara-brand-wordmark">Nivara</h1>
      {showTagline && (
        <p className="nivara-brand-tagline">MIT ADT Campus Support</p>
      )}
    </div>
  );
};

export default NivaraBrand;
