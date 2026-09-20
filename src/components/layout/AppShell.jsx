import Sidebar from './Sidebar';
import Header from './Header';
import './AppShell.css';

/**
 * AppShell Component
 * Global application layout for authenticated pages
 */
const AppShell = ({ children, role }) => {
  return (
    <div className="nivara-app-shell">
      <Sidebar role={role} />
      <div className="nivara-app-main">
        <Header />
        <main className="nivara-app-content">{children}</main>
      </div>
    </div>
  );
};

export default AppShell;
