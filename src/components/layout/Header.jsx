import './Header.css';

/**
 * Header Component
 * Application header with title and actions
 */
const Header = ({ title, children }) => {
  return (
    <header className="nivara-header">
      <div className="nivara-header-left">
        {title && <h1 className="nivara-header-title">{title}</h1>}
      </div>
      <div className="nivara-header-right">{children}</div>
    </header>
  );
};

export default Header;
