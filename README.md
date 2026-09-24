# Nivara Frontend

> MIT ADT Campus Support - Professional Campus Operations Platform

A modern, professional React-based frontend application for campus infrastructure management and complaint tracking at MIT ADT University.

## Overview

Nivara Frontend provides an intuitive, enterprise-grade interface for students and administrators to manage campus maintenance requests, track complaint resolution, and monitor facility operations. Built with React and modern web technologies, it delivers a seamless user experience across devices.

## Key Features

### For Students
- **Complaint Management**: Submit, track, and manage campus infrastructure complaints
- **Location-Based Reporting**: Associate complaints with specific campus locations (building, floor, wing, room)
- **Priority Selection**: Set complaint priority levels (LOW, MEDIUM, HIGH, URGENT)
- **Image Upload**: Attach photos to complaints for better documentation
- **Real-Time Status Tracking**: Monitor complaint resolution progress
- **Personal Dashboard**: View complaint statistics and history

### For Administrators
- **Admin Dashboard**: Comprehensive overview with statistics and analytics
- **Complaint Management**: Review, update status, and resolve complaints
- **Location Management**: Create and manage campus locations
- **Status Visualization**: Charts and graphs for complaint analytics
- **User Activity Monitoring**: Track complaint submissions and resolutions

### UI/UX Features
- **Professional Design System**: Consistent MIT ADT purple branding (#7C3AED)
- **Responsive Layout**: Mobile-first design that works on all devices
- **Dark Mode Ready**: Built with design tokens for easy theming
- **Role-Based Navigation**: Dynamic sidebar navigation based on user role
- **Loading States**: Skeleton screens and spinners for better UX
- **Error Handling**: User-friendly error messages with toast notifications
- **Empty States**: Informative placeholders when no data is available

## 🛠️ Technology Stack

### Core Framework
- **React**: 19.2.6
- **React DOM**: 19.2.6
- **Vite**: 8.0.12 (Build tool and dev server)

### Routing & State
- **React Router DOM**: 7.17.0

### HTTP & API
- **Axios**: 1.17.0 (with JWT interceptors)

### UI & Visualization
- **Recharts**: 3.8.1 (Charts and analytics)
- **Lucide React**: 1.17.0 (Icon system)
- **React Toastify**: 11.1.0 (Toast notifications)

### Development Tools
- **ESLint**: 9.27.0 (Code quality)
  - `@eslint/js`: 9.27.0
  - `eslint-plugin-react`: 7.37.2
  - `eslint-plugin-react-hooks`: 5.0.0
  - `eslint-plugin-react-refresh`: 0.4.16
- **Globals**: 16.0.0 (Global variables)

### Build Configuration
- **Node.js**: Version not pinned in repository (recommend Node.js 18+ for Vite 8.x)
- **npm**: Version not pinned in repository

## Prerequisites

Before running this project, ensure you have:

- Node.js 18.x or higher (recommended for Vite 8.x compatibility)
- npm or yarn package manager
- Access to Nivara Backend API (running on port 8090 by default)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/rahultakale44/Nivara-frontend.git
cd Nivara-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8090
```

**Configuration Options:**
- `VITE_API_BASE_URL`: Backend API base URL (default: `http://localhost:8090`)

**Important**: Ensure the backend server is running before starting the frontend.

### 4. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in terminal).

### 5. Build for Production

```bash
npm run build
```

Build output will be in the `dist/` directory.

### 6. Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
Nivara-frontend/
├── public/                 # Static assets
├── src/
│   ├── api/
│   │   └── api.js         # Axios instance with JWT interceptors
│   ├── assets/            # Images, logos, and static files
│   │   ├── nivara-logo-new.png
│   │   ├── mit-adt-logo.png
│   │   └── mit-adt-campus.jpg
│   ├── components/
│   │   ├── branding/      # Nivara brand components
│   │   │   └── NivaraBrand.jsx
│   │   ├── layout/        # Layout components
│   │   │   ├── AppShell.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── PageContainer.jsx
│   │   └── ui/            # Reusable UI components
│   │       ├── Button.jsx
│   │       ├── Input.jsx
│   │       ├── Card.jsx
│   │       ├── StatusBadge.jsx
│   │       ├── PriorityBadge.jsx
│   │       ├── Modal.jsx
│   │       └── ...
│   ├── pages/             # Route pages
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── StudentDashboard.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── CreateComplaint.jsx
│   │   └── MyComplaints.jsx
│   ├── styles/            # Global styles and design tokens
│   │   ├── tokens.css     # Design system tokens
│   │   ├── base.css       # Base styles
│   │   ├── landing.css    # Homepage styles
│   │   └── auth.css       # Authentication page styles
│   ├── App.jsx            # Main app component with routing
│   ├── Home.jsx           # Landing page
│   └── main.jsx           # Application entry point
├── .env.example           # Environment variable template
├── .gitignore
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML entry point
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
└── README.md
```

## Design System

### Color Palette (MIT ADT Branding)
- **Primary**: `#7C3AED` (MIT ADT Purple)
- **Primary Hover**: `#6D28D9`
- **Primary Light**: `#A78BFA`
- **Backgrounds**: White, gray-50, gray-100
- **Text**: Gray-900 (primary), Gray-600 (secondary)

### Typography
- **Font Family**: Inter (system fallback: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto)
- **Font Sizes**: 12px - 36px (defined in design tokens)
- **Font Weights**: 400, 500, 600, 700

### Components
All UI components follow the design system defined in `src/styles/tokens.css` with:
- Consistent spacing (4px base unit)
- Standardized shadows
- Smooth transitions
- Accessible color contrast

## Authentication

### JWT Token Management
- Tokens stored in `localStorage`
- Automatic token injection via Axios interceptors
- 401/403 responses trigger automatic logout
- Protected routes require valid authentication

### User Roles
- **STUDENT**: Access to complaint submission and tracking
- **ADMIN**: Full access to dashboard, complaint management, and location management

## API Integration

### Base Configuration
API client configured in `src/api/api.js`:
- Base URL from environment variable
- JWT token interceptors
- Automatic error handling
- Response/request transformation

### Key Endpoints
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /api/complaints` - Get all complaints
- `POST /api/complaints` - Create complaint
- `PUT /api/complaints/{id}/status` - Update complaint status
- `GET /api/locations` - Get all locations
- `POST /api/locations` - Create location (admin only)

Full API documentation available in [Nivara Backend Repository](https://github.com/rahultakale44/Nivara-backend).

## Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

Sidebar collapses to hamburger menu on mobile devices.

## Code Quality

### Linting
```bash
npm run lint
```

ESLint configuration includes:
- React best practices
- React Hooks rules
- React Refresh for HMR

## Deployment

### Production Build
```bash
npm run build
```

### Deployment Platforms
The built application (`dist/` folder) can be deployed to:
- **Vercel**: Zero-config deployment for Vite apps
- **Netlify**: Automatic builds from Git
- **GitHub Pages**: Static hosting
- **AWS S3 + CloudFront**: Enterprise hosting
- **Any static hosting service**

### Environment Variables for Production
Ensure `VITE_API_BASE_URL` points to your production backend API.

## Contributing

This is a university project. For contributions:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is developed for MIT ADT University.

## Authors

- **Rahul Takale** - [GitHub](https://github.com/rahultakale44)

## Related Repositories

- **Backend**: [Nivara Backend](https://github.com/rahultakale44/Nivara-backend)

## Support

For issues or questions:
- Open an issue on GitHub
- Contact the development team

---

**Nivara** - Excellence in Campus Infrastructure Support
