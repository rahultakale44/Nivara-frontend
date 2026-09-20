# Nivara Frontend - Quick Reference Guide

**Last Updated:** September 20, 2026  
**Current Status:** Phase 1.5 Complete ✅

---

## Quick Start

### Run the Application

```bash
# Terminal 1 - Backend
cd Nivara-backend
./mvnw spring-boot:run

# Terminal 2 - Frontend
cd Nivara-frontend
npm install
npm run dev
```

**URLs:**
- Frontend: http://localhost:5173
- Backend: http://localhost:8080
- Backend API: http://localhost:8080/api

---

## Demo Credentials

**Student Account:**
- Email: `dileeptakale@gmail.com`
- Password: `123456`

**Admin Account:**
- Email: `admin@campuscare.com`
- Password: `admin123`

---

## File Structure

```
Nivara-frontend/
├── src/
│   ├── api/
│   │   └── api.js                 # Axios client + JWT interceptors
│   ├── components/
│   │   └── ProtectedRoute.jsx     # Route protection
│   ├── pages/
│   │   ├── Home.jsx               # Landing page (to be redesigned)
│   │   ├── Login.jsx              # Student login
│   │   ├── AdminLogin.jsx         # Admin login
│   │   ├── Register.jsx           # Student registration
│   │   ├── StudentDashboard.jsx   # Student home
│   │   ├── CreateComplaint.jsx    # Create complaint with location + priority
│   │   ├── MyComplaints.jsx       # Student complaints list
│   │   └── AdminDashboard.jsx     # Admin complaint management
│   ├── App.jsx                    # Router
│   ├── App.css                    # Main styles
│   └── main.jsx                   # Entry point
├── .env                           # Local config (DO NOT COMMIT)
├── .env.example                   # Template for .env
├── API-CONTRACT.md                # Backend API documentation
├── FRONTEND-INSPECTION-REPORT.md  # Full frontend analysis
├── PHASE-1.5-COMPLETION-REPORT.md # Changes log
├── WORK-SUMMARY.md                # Overall summary
└── QUICK-REFERENCE.md             # This file
```

---

## Environment Configuration

### .env File

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

**For Production:**
```env
VITE_API_BASE_URL=https://your-backend.com/api
```

---

## Key Backend Endpoints

### Authentication
- `POST /api/auth/register` - Register student
- `POST /api/auth/login` - Login (returns JWT + role)

### Locations
- `GET /api/locations` - Get active locations
- `GET /api/locations/{id}` - Get specific location

### Complaints (Student)
- `POST /api/complaints` - Create complaint (requires locationId + priority)
- `GET /api/complaints/my` - Get my complaints

### Complaints (Admin)
- `GET /api/complaints` - Get all complaints
- `PUT /api/complaints/{id}/status` - Update status + admin note

### File Upload
- `POST /api/upload` - Upload image (returns URL)

**Note:** JWT token automatically added by interceptor. No manual headers needed.

---

## Common Tasks

### Add New Dependency

```bash
cd Nivara-frontend
npm install package-name
```

### Build for Production

```bash
npm run build
# Output: dist/ folder
```

### Lint Code

```bash
npm run lint
```

### Preview Production Build

```bash
npm run preview
```

---

## Component Patterns

### Using API Client

```javascript
import api from "../api/api";

// Token automatically added by interceptor
const response = await api.get("/complaints/my");
const data = response.data;

// 401 errors automatically handled (logout + redirect)
```

### Protected Route

```javascript
<Route
  path="/student-dashboard"
  element={
    <ProtectedRoute allowedRole="STUDENT">
      <StudentDashboard />
    </ProtectedRoute>
  }
/>
```

### Toast Notifications

```javascript
import { toast } from "react-toastify";

toast.success("Success message!");
toast.error("Error message!");
```

---

## Complaint Form Fields

### Required by Backend

```javascript
{
  title: string,          // 3-200 chars
  description: string,    // 10-2000 chars
  category: string,       // Infrastructure, Classroom, etc.
  locationId: number,     // REQUIRED - location ID
}
```

### Optional

```javascript
{
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT",  // Defaults to MEDIUM
  imageUrl: string,  // Returned from /api/upload
}
```

---

## Status Values

### Complaint Status
- `PENDING` - Just submitted
- `IN_PROGRESS` - Admin is working on it
- `RESOLVED` - Fixed
- `REJECTED` - Cannot be resolved

### Priority
- `LOW` - Green badge
- `MEDIUM` - Yellow badge (default)
- `HIGH` - Orange badge
- `URGENT` - Red badge

---

## Styling Reference

### Colors

```css
/* Primary */
--cyan: #22d3ee, #06b6d4
--purple: #8b5cf6, #a855f7

/* Status */
--pending: #fbbf24  (yellow)
--in-progress: #3b82f6  (blue)
--resolved: #22c55e  (green)
--rejected: #ef4444  (red)

/* Priority */
--low: #22c55e  (green)
--medium: #fbbf24  (yellow)
--high: #f97316  (orange)
--urgent: #ef4444  (red)
```

### Common Classes

```css
.status              /* Status badge */
.priority-badge      /* Priority badge */
.location-info       /* Location badge */
.loading-box         /* Loading spinner container */
.loader              /* Spinner animation */
```

---

## API Response Examples

### Login Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "role": "STUDENT"
}
```

### Location Response

```json
{
  "id": 1,
  "building": "North Block",
  "floor": 4,
  "wing": "A",
  "roomNumber": "408",
  "displayName": "North Block - Floor 4 - Wing A - Room 408",
  "active": true
}
```

### Complaint Response

```json
{
  "id": 1,
  "title": "Water Cooler Not Working",
  "description": "...",
  "category": "Infrastructure",
  "status": "PENDING",
  "priority": "MEDIUM",
  "createdAt": "2026-09-20T14:30:00",
  "imageUrl": "http://localhost:8080/uploads/uuid_image.jpg",
  "adminNote": null,
  "location": {
    "id": 1,
    "building": "North Block",
    "floor": 4,
    "wing": "A",
    "roomNumber": "408",
    "displayName": "North Block - Floor 4 - Wing A - Room 408",
    "active": true
  },
  "reporterName": "Student Name",
  "reporterEmail": "student@example.com"
}
```

---

## Troubleshooting

### Issue: Cannot connect to backend
**Solution:** Check backend is running on port 8080
```bash
curl http://localhost:8080/api/locations
```

### Issue: CORS errors
**Solution:** Backend CORS configured for `http://localhost:5173`  
If using different port, update backend `WebConfig.java`

### Issue: 401 Unauthorized
**Solution:** Token expired or invalid. Clear localStorage and login again.
```javascript
localStorage.clear();
window.location.href = "/login";
```

### Issue: Locations not loading
**Solution:** Check backend has locations in database
```sql
SELECT * FROM locations WHERE active = true;
```

### Issue: Image upload fails
**Solution:** Check file size < 5MB, backend `uploads/` folder exists

---

## Development Tips

### Hot Reload
- Vite provides instant hot reload
- Save file → browser updates automatically

### Console Logs
- All errors logged to browser console
- Backend responses logged in catch blocks

### Testing New Features
1. Test as student first
2. Then test as admin
3. Check both happy path and error cases

### Before Committing
1. Run `npm run lint`
2. Test all affected pages
3. Check console for errors
4. Verify backend compatibility

---

## Next Phase Preparation

### Phase 2: Foundation

**Install:**
```bash
npm install framer-motion
```

**Create:**
```
src/
├── styles/
│   └── tokens.js         # Design tokens
├── components/
│   └── ui/
│       ├── Button.jsx
│       ├── Input.jsx
│       ├── Card.jsx
│       └── Badge.jsx
└── context/
    └── AuthContext.jsx   # Auth state management
```

**Read:**
- `FRONTEND-INSPECTION-REPORT.md` Section 10.2
- Focus on "Design System Requirements"

---

## Useful Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Fix lint errors
npm run lint -- --fix

# Clean install (if issues)
rm -rf node_modules package-lock.json
npm install
```

---

## Documentation Links

- **API Contract:** `API-CONTRACT.md`
- **Frontend Analysis:** `FRONTEND-INSPECTION-REPORT.md`
- **Phase 1.5 Report:** `PHASE-1.5-COMPLETION-REPORT.md`
- **Work Summary:** `WORK-SUMMARY.md`

---

## Contact/Support

**Project Status:** Phase 1.5 Complete ✅  
**Ready For:** Phase 2 - Foundation  
**Remaining Work:** ~18-25 hours  

**To Continue:** Ask to proceed with Phase 2

---

**END OF QUICK REFERENCE**
