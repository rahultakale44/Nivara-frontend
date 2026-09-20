# Nivara Backend API Contract

**Base URL:** `http://localhost:8080/api`  
**Authentication:** JWT Bearer Token (except registration and login endpoints)  
**Date:** September 20, 2026

---

## 1. Authentication Endpoints

### 1.1 Register Student

**Endpoint:** `POST /auth/register`  
**Access:** Public  
**Description:** Register a new student account

**Request Body:**
```json
{
  "fullName": "string (required, 3-100 chars)",
  "email": "string (required, valid email)",
  "password": "string (required, min 6 chars)"
}
```

**Response:** `200 OK`
```json
"User registered successfully"
```

**Errors:**
- `400 Bad Request` - Validation failed
- `409 Conflict` - Email already exists

---

### 1.2 Login

**Endpoint:** `POST /auth/login`  
**Access:** Public  
**Description:** Authenticate user and receive JWT token

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "STUDENT" | "ADMIN"
}
```

**Errors:**
- `401 Unauthorized` - Invalid credentials
- `400 Bad Request` - Missing fields

---

## 2. Location Endpoints

### 2.1 Get All Active Locations

**Endpoint:** `GET /locations`  
**Access:** Authenticated (STUDENT, ADMIN)  
**Description:** Retrieve all active locations or filter by building/floor

**Query Parameters:**
- `building` (optional) - Filter by building name
- `floor` (optional) - Filter by floor number (requires building)

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "building": "North Block",
    "floor": 4,
    "wing": "A",
    "roomNumber": "408",
    "displayName": "North Block - Floor 4 - Wing A - Room 408",
    "active": true
  }
]
```

**Examples:**
- `GET /locations` - All active locations
- `GET /locations?building=North Block` - All locations in North Block
- `GET /locations?building=North Block&floor=4` - All North Block Floor 4 locations

---

### 2.2 Get Location by ID

**Endpoint:** `GET /locations/{id}`  
**Access:** Authenticated (STUDENT, ADMIN)  
**Description:** Get a specific location by ID

**Response:** `200 OK`
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

**Errors:**
- `404 Not Found` - Location does not exist

---

### 2.3 Create Location (ADMIN ONLY)

**Endpoint:** `POST /locations`  
**Access:** ADMIN only  
**Description:** Create a new campus location

**Request Body:**
```json
{
  "building": "string (required, max 100 chars)",
  "floor": "integer (required, >= 0)",
  "wing": "string (optional, max 10 chars)",
  "roomNumber": "string (required, max 20 chars)",
  "displayName": "string (optional, max 200 chars)"
}
```

**Response:** `200 OK`
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

**Errors:**
- `400 Bad Request` - Validation failed
- `409 Conflict` - Location with same building/floor/wing/roomNumber already exists
- `403 Forbidden` - User is not admin

---

### 2.4 Update Location (ADMIN ONLY)

**Endpoint:** `PUT /locations/{id}`  
**Access:** ADMIN only  
**Description:** Update an existing location

**Request Body:**
```json
{
  "building": "string (optional, max 100 chars)",
  "floor": "integer (optional, >= 0)",
  "wing": "string (optional, max 10 chars)",
  "roomNumber": "string (optional, max 20 chars)",
  "displayName": "string (optional, max 200 chars)"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "building": "North Block",
  "floor": 4,
  "wing": "A",
  "roomNumber": "408",
  "displayName": "Updated Display Name",
  "active": true
}
```

**Errors:**
- `404 Not Found` - Location does not exist
- `409 Conflict` - Updated location conflicts with existing
- `403 Forbidden` - User is not admin

---

### 2.5 Deactivate Location (ADMIN ONLY)

**Endpoint:** `DELETE /locations/{id}`  
**Access:** ADMIN only  
**Description:** Soft-delete (deactivate) a location

**Response:** `200 OK`
```json
"Location deactivated successfully"
```

**Errors:**
- `404 Not Found` - Location does not exist
- `403 Forbidden` - User is not admin

---

## 3. Complaint Endpoints

### 3.1 Create Complaint

**Endpoint:** `POST /complaints`  
**Access:** STUDENT only  
**Description:** Create a new complaint

**Request Body:**
```json
{
  "title": "string (required, 3-200 chars)",
  "description": "string (required, 10-2000 chars)",
  "category": "string (required)",
  "locationId": "integer (required)",
  "priority": "LOW" | "MEDIUM" | "HIGH" | "URGENT" (optional, default: MEDIUM),
  "imageUrl": "string (optional)"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Water Cooler Not Working",
  "description": "Water cooler on 4th floor is not functioning",
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

**Errors:**
- `400 Bad Request` - Validation failed
- `404 Not Found` - Location not found or inactive
- `403 Forbidden` - User is not student

---

### 3.2 Get My Complaints

**Endpoint:** `GET /complaints/my`  
**Access:** STUDENT only  
**Description:** Get all complaints submitted by the authenticated student

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Water Cooler Not Working",
    "description": "Water cooler on 4th floor is not functioning",
    "category": "Infrastructure",
    "status": "PENDING",
    "priority": "MEDIUM",
    "createdAt": "2026-09-20T14:30:00",
    "imageUrl": "http://localhost:8080/uploads/uuid_image.jpg",
    "adminNote": null,
    "location": { ... },
    "reporterName": "Student Name",
    "reporterEmail": "student@example.com"
  }
]
```

---

### 3.3 Get All Complaints (ADMIN ONLY)

**Endpoint:** `GET /complaints`  
**Access:** ADMIN only  
**Description:** Get all complaints across all students

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Water Cooler Not Working",
    "description": "Water cooler on 4th floor is not functioning",
    "category": "Infrastructure",
    "status": "PENDING",
    "priority": "MEDIUM",
    "createdAt": "2026-09-20T14:30:00",
    "imageUrl": "http://localhost:8080/uploads/uuid_image.jpg",
    "adminNote": null,
    "location": { ... },
    "reporterName": "Student Name",
    "reporterEmail": "student@example.com"
  }
]
```

---

### 3.4 Get Complaint by ID

**Endpoint:** `GET /complaints/{id}`  
**Access:** Authenticated (STUDENT can only see their own, ADMIN can see all)  
**Description:** Get a specific complaint by ID

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Water Cooler Not Working",
  "description": "Water cooler on 4th floor is not functioning",
  "category": "Infrastructure",
  "status": "PENDING",
  "priority": "MEDIUM",
  "createdAt": "2026-09-20T14:30:00",
  "imageUrl": "http://localhost:8080/uploads/uuid_image.jpg",
  "adminNote": null,
  "location": { ... },
  "reporterName": "Student Name",
  "reporterEmail": "student@example.com"
}
```

**Errors:**
- `404 Not Found` - Complaint does not exist
- `403 Forbidden` - Student trying to access another student's complaint

---

### 3.5 Update Complaint Status (ADMIN ONLY)

**Endpoint:** `PUT /complaints/{id}/status`  
**Access:** ADMIN only  
**Description:** Update complaint status and add admin notes

**Request Body:**
```json
{
  "status": "PENDING" | "IN_PROGRESS" | "RESOLVED" | "REJECTED" (required),
  "adminNote": "string (optional)"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Water Cooler Not Working",
  "description": "Water cooler on 4th floor is not functioning",
  "category": "Infrastructure",
  "status": "IN_PROGRESS",
  "priority": "MEDIUM",
  "createdAt": "2026-09-20T14:30:00",
  "imageUrl": "http://localhost:8080/uploads/uuid_image.jpg",
  "adminNote": "Maintenance team dispatched",
  "location": { ... },
  "reporterName": "Student Name",
  "reporterEmail": "student@example.com"
}
```

**Errors:**
- `404 Not Found` - Complaint does not exist
- `403 Forbidden` - User is not admin

---

## 4. File Upload Endpoint

### 4.1 Upload Image

**Endpoint:** `POST /upload`  
**Access:** Authenticated  
**Description:** Upload proof image for complaint

**Request:**
- Content-Type: `multipart/form-data`
- Form field: `file`

**File Requirements:**
- Max size: 5MB
- Accepted types: Image files
- File name sanitization applied

**Response:** `200 OK`
```json
"http://localhost:8080/uploads/uuid_sanitized_filename.jpg"
```

**Errors:**
- `400 Bad Request` - File validation failed (empty, too large, invalid name)

---

## 5. Data Models

### ComplaintStatus Enum
- `PENDING`
- `IN_PROGRESS`
- `RESOLVED`
- `REJECTED`

### Priority Enum
- `LOW`
- `MEDIUM` (default)
- `HIGH`
- `URGENT`

### Role Enum
- `STUDENT`
- `ADMIN`

---

## 6. Authorization Matrix

| Endpoint | STUDENT | ADMIN |
|----------|---------|-------|
| POST /auth/register | ✅ | ✅ |
| POST /auth/login | ✅ | ✅ |
| GET /locations | ✅ | ✅ |
| GET /locations/{id} | ✅ | ✅ |
| POST /locations | ❌ | ✅ |
| PUT /locations/{id} | ❌ | ✅ |
| DELETE /locations/{id} | ❌ | ✅ |
| POST /complaints | ✅ | ❌ |
| GET /complaints/my | ✅ | ❌ |
| GET /complaints | ❌ | ✅ |
| GET /complaints/{id} | ✅ (own only) | ✅ (all) |
| PUT /complaints/{id}/status | ❌ | ✅ |
| POST /upload | ✅ | ✅ |

---

## 7. Error Response Format

All errors follow this structure:

```json
{
  "message": "Error description",
  "timestamp": "2026-09-20T14:30:00",
  "status": 400
}
```

Common HTTP Status Codes:
- `400` - Bad Request (validation failure)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource does not exist)
- `409` - Conflict (duplicate resource)
- `500` - Internal Server Error

---

## 8. Authentication Flow

1. **Register** or **Login** to receive JWT token
2. Store token in `localStorage` (or secure storage)
3. Include token in all subsequent requests:
   ```
   Authorization: Bearer <token>
   ```
4. Token contains user role (STUDENT or ADMIN)
5. Backend validates token and role for each protected endpoint

---

## 9. Integration Notes

### Current Frontend Issues to Fix:

1. **Hardcoded API Base URL:**
   - Current: `https://campuscare-backend-rt14.onrender.com/api`
   - Should use: Environment variable `VITE_API_BASE_URL`
   - Update to: `http://localhost:8080/api` for development

2. **Missing locationId in CreateComplaint:**
   - Frontend currently does NOT send `locationId` field
   - **BREAKING CHANGE:** Backend now requires `locationId`
   - Must add location selector to complaint form

3. **Missing priority field:**
   - Frontend does not expose priority selection
   - Backend defaults to MEDIUM if not provided

4. **Image URL handling:**
   - Admin dashboard hardcodes full URL with backend domain
   - Should use returned URL directly from upload endpoint

5. **Response structure changed:**
   - Backend now returns `ComplaintResponse` DTO (not entity)
   - Includes nested `location` object
   - Uses `reporterName` and `reporterEmail` instead of `user` object

6. **Location management:**
   - No frontend UI for location management (admin)
   - Need to build location CRUD interface

---

## 10. Demo Credentials

**Student Account:**
- Email: `dileeptakale@gmail.com`
- Password: `123456`

**Admin Account:**
- Email: `admin@campuscare.com`
- Password: `admin123`
