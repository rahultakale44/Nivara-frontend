# CampusCare Frontend

React-based frontend for the CampusCare campus complaint management system. Provides separate interfaces for students to submit and track complaints, and administrators to manage complaint status and view analytics.

This is the frontend component of a full-stack portfolio/interview project.

---

## Features

### Student Features
- **Registration & Login** - Create account and authenticate
- **Dashboard** - View personal complaint statistics and recent complaints
- **Create Complaints** - Submit complaints with title, description, category, and optional image
- **Track Complaints** - View status of submitted complaints (PENDING, IN_PROGRESS, RESOLVED)
- **Image Upload** - Attach images to complaints

### Admin Features
- **Admin Dashboard** - Overview of all complaints with statistics
- **Complaint Management** - View all complaints across all students
- **Status Updates** - Update complaint status with admin notes
- **Analytics** - Visual charts and metrics using Recharts

### UI/UX
- **Responsive Design** - Mobile-friendly interface
- **Toast Notifications** - Real-time feedback using react-toastify
- **React Router** - Client-side routing with protected routes
- **Lucide Icons** - Modern icon library
- **Loading States** - User feedback during API operations

---

## Technology Stack

- **React 19.2.6** - UI library
- **React Router DOM 7.17.0** - Client-side routing
- **Axios 1.17.0** - HTTP client for API communication
- **Recharts 3.8.1** - Data visualization and charts
- **React Toastify 11.1.0** - Toast notifications
- **Lucide React 1.17.0** - Icon library
- **Vite 8.0.12** - Build tool and dev server
- **ESLint 10.3.0** - Code linting

---

## Prerequisites

- **Node.js** - v18 or higher recommended
- **npm** - Comes with Node.js
- **Backend API** - CampusCare backend must be running (see backend repository)

---

## Environment Configuration

Create a `.env` file or update API base URL in `src/api/axios.js`:

```javascript
// Default configuration points to:
const API_BASE_URL = 'http://localhost:8080';
```

For production deployment (Vercel), update this to your backend API URL.

---

## Installation

```bash
# Install dependencies
npm install
```

---

## Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

**Note:** Ensure the backend API is running at `http://localhost:8080`

---

## Build

```bash
# Build for production
npm run build
```

Production files will be generated in the `dist/` directory.

---

## Preview Production Build

```bash
# Preview the production build locally
npm run preview
```

---

## Linting

```bash
# Run ESLint
npm run lint
```

---

## Project Structure

```
campuscare-frontend/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── api/
│   │   └── axios.js          # Axios configuration
│   ├── assets/               # Static assets
│   ├── components/           # React components
│   ├── pages/                # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── StudentDashboard.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── ...
│   ├── App.jsx               # Main app component
│   ├── App.css               # App styles
│   ├── Home.jsx              # Landing page
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── vercel.json               # Vercel deployment config
├── vite.config.js
└── README.md
```

---

## Key Routes

| Route | Component | Access | Description |
|-------|-----------|--------|-------------|
| `/` | Home | Public | Landing page |
| `/login` | Login | Public | User login |
| `/register` | Register | Public | Student registration |
| `/student-dashboard` | StudentDashboard | STUDENT | Student complaint management |
| `/admin-dashboard` | AdminDashboard | ADMIN | Admin complaint management |

---

## API Integration

The frontend communicates with the backend REST API using Axios.

**Authentication Flow:**
1. User logs in via `/api/auth/login`
2. Backend returns JWT token and user role
3. Token stored in localStorage
4. Token included in `Authorization: Bearer <token>` header for subsequent requests

**Protected Routes:**
- Student routes require STUDENT role
- Admin routes require ADMIN role
- Role verified by backend on each API request

---

## Deployment

### Vercel (Current Deployment Platform)

The project includes `vercel.json` configuration for single-page application routing.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Environment Variables on Vercel:**
- Update API base URL to point to your deployed backend
- Configure in `src/api/axios.js` or use Vercel environment variables

---

## Backend Dependency

This frontend requires the CampusCare backend API to be running. See the backend repository for setup instructions:

**Backend Requirements:**
- Running on `http://localhost:8080` (development)
- JWT authentication configured
- CORS enabled for frontend origin
- All API endpoints operational

---

## Features Not Included

- Automated tests (no test suite configured)
- TypeScript (uses JavaScript)
- State management library (uses React state and localStorage)
- Advanced caching strategies
- Offline support / PWA features
- Internationalization (i18n)

---

## Browser Compatibility

Modern browsers supporting ES6+ features:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Contributing

This is a personal portfolio project. If you find issues or have suggestions, feel free to open an issue or submit a pull request.

---

## License

This is a personal portfolio project created for educational and interview purposes.

---

## Related Repositories

- **Backend:** CampusCare Backend (Spring Boot REST API)

---

## Author

Rahul - Final Year Computer Science Student

**Project Purpose:** Portfolio/Interview Project demonstrating full-stack development with React, REST API integration, authentication, and role-based UI.
