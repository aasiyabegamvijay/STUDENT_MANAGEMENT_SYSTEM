# Full Stack Student Management App

## Overview
This is a **Full Stack CRUD Application** to manage student data.  
The application demonstrates **backend fundamentals, frontend integration, API handling, database management, and basic validation**.

---

## Tech Stack

### Backend
- Node.js with Express
- REST API architecture

### Database
- MongoDB

### Frontend
- React (Vite)

---

## Database Structure

| Field | Type | Required |
|-------|------|----------|
| id | Auto increment / UUID | Yes |
| name | String | Yes |
| email | String (Unique) | Yes |
| age | Integer | Yes |
| course | String | Yes |

---

## Functional Requirements

### 1) Add Student
- **Frontend:** Form with fields: Name, Email, Age, Course  
  Client-side validation included.
- **Backend:** POST `/api/students`  
  **Validation Rules:**
  - Name cannot be empty
  - Email must be valid format and unique
  - Age must be between 17–35
- Returns success or proper error message.

### 2) View Students
- Display all students in a table.
- Show Name, Email, Age, Course, Created Date.
- Include **Edit** & **Delete** buttons.

### 3) Get Student by ID
- Returns 404 if not found.

### 4) Update Student
- Allowed fields: Name, Course
- Input validation included.
- Frontend supports edit form (modal or separate page).

### 5) Delete Student
- Hard delete allowed.
- Frontend shows confirmation before deletion.

---

## Project Setup

### Prerequisites
- Node.js installed
- MongoDB running locally or using a cloud service

---

### Backend Setup
1. Open terminal in the `backend` folder:
```bash
cd backend

Install dependencies:
npm install

Start backend server:
npm run dev
The backend will usually run on http://localhost:5000 (or your configured port).

Frontend Setup (Vite React)

Open terminal in the frontend folder:
cd frontend

Install dependencies:
npm install

Start frontend development server:
npm run dev
Open the URL shown in the terminal (usually http://localhost:5173/) in your browser.

API Endpoints
Method	Endpoint	Description
POST	/api/students	Add a new student
GET	/api/students	Get all students
GET	/api/students/:id	Get a student by ID
PUT	/api/students/:id	Update a student's name/course
DELETE	/api/students/:id	Delete a student
Usage
Open the frontend application.

Add new students using the form.

View all students in the table.

Edit or delete students as needed.

Data is persisted in the backend database.

Validation Rules
Name: Cannot be empty

Email: Must be valid format and unique

Age: Between 17–35

Author
Aasiya Begam S
