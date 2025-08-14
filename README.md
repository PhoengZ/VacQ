# VacQ

## Project Background

The COVID-19 pandemic has been difficult to handle so far. The strategy of the Government COVID Center (GCC) is to get the vaccine to the citizens. To be fully vaccinated, a citizen will need 2-3 shots of vaccine.

The Government therefore initiates a project to develop a web-based application system, called VacQ, to allow the citizens to book vaccination services to their preferred hospitals. To ensure that as many people as possible have access to such services, the system needs to be on the web platform.

## Functional Requirements
1. The system shall allow a user to register by specifying the name, email, and password.
2. After registration, the user becomes a registered user, and the system shall allow the user to log in to use the system by specifying the email and password. The system shall allow a registered user to log out.
3. After login, the system shall allow the registered user to book up to 3 vaccine shots by specifying the appointment date and the preferred hospitals. The hospital list is also provided to the user.
4. The system shall allow the registered user to view their vaccination bookings.
5. The system shall allow the registered user to edit their vaccination bookings.
6. The system shall allow the registered user to delete their vaccination bookings.
7. The system shall allow the admin to view any vaccination bookings.
8. The system shall allow the admin to edit any vaccination bookings.
9. The system shall allow the admin to delete any vaccination bookings.

---

## Project Structure

- `Backend/` - Node.js Express REST API server
- `vacqfrotnend/` - React + TypeScript + Vite frontend

---

## Backend (Node.js/Express)

### Main Tools Used
- **Express**: Web server and REST API
- **Mongoose**: MongoDB ODM
- **JWT**: Authentication
- **Swagger**: API documentation (`/api-docs`)
- **Nodemon**: Development server auto-reload

### How to Run Backend
1. Install dependencies:
	```powershell
	cd Backend
	npm install
	```
2. Set up environment variables in `Backend/config/config.env` (see example in repo).
3. Start the development server:
	```powershell
	npm run dev
	```
4. API docs available at [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

### Main Endpoints
- `/api/v1/auth/register` - Register user
- `/api/v1/auth/login` - Login user
- `/api/v1/auth/logout` - Logout user
- `/api/v1/hospitals` - List/Create hospitals
- `/api/v1/appointments` - Manage appointments

---

## Frontend (React + TypeScript + Vite)

### Main Tools Used
- **React**: UI library
- **TypeScript**: Type safety
- **Vite**: Fast build tool
- **Redux Toolkit**: State management
- **React Router**: Routing
- **Axios**: API requests
- **Tailwind CSS**: Styling

### How to Run Frontend
1. Install dependencies:
	```powershell
	cd vacqfrotnend
	npm install
	```
2. Start the development server:
	```powershell
	npm run dev
	```
3. The app will be available at [http://localhost:5173](http://localhost:5173) (default Vite port)

---

## Usage

1. Register a new user via the frontend or API.
2. Login and book up to 3 vaccine appointments at preferred hospitals.
3. View, edit, or delete your bookings.
4. Admin users can manage all bookings.

---

## API Documentation

See [http://localhost:5000/api-docs](http://localhost:5000/api-docs) for full Swagger API docs after starting the backend.