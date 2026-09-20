import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  ListTodo,
  PlusCircle,
  MapPin,
  LogOut,
  User,
} from 'lucide-react';
import NivaraBrand from '../branding/NivaraBrand';
import './Sidebar.css';

/**
 * Sidebar Component
 * Navigation sidebar with role-based menu
 */
const Sidebar = ({ role }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const studentNav = [
    { path: '/student-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/create-complaint', icon: PlusCircle, label: 'Report Issue' },
    { path: '/my-complaints', icon: ListTodo, label: 'My Issues' },
  ];

  const adminNav = [
    { path: '/admin-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin-issues', icon: FileText, label: 'Issues' },
    { path: '/admin-locations', icon: MapPin, label: 'Locations' },
  ];

  const navItems = role === 'ADMIN' ? adminNav : studentNav;

  return (
    <aside className="nivara-sidebar">
      <div className="nivara-sidebar-header">
        <NivaraBrand />
      </div>

      <nav className="nivara-sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nivara-sidebar-nav-item ${isActive ? 'nivara-sidebar-nav-item--active' : ''}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="nivara-sidebar-footer">
        <div className="nivara-sidebar-user">
          <div className="nivara-sidebar-user-avatar">
            <User size={16} />
          </div>
          <div className="nivara-sidebar-user-info">
            <div className="nivara-sidebar-user-role">
              {role === 'ADMIN' ? 'Administrator' : 'Student'}
            </div>
          </div>
        </div>
        
        <button
          className="nivara-sidebar-logout"
          onClick={handleLogout}
          aria-label="Logout"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
