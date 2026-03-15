# Clinic Management System (MERN)

This project is a simple Clinic Management System built using the MERN stack. The system helps in managing patient records in a clinic. It allows the user to add, view, update and delete patient information. The system also stores patient medical history and automatically generates a patient ID.
The frontend of the project is built using React with Tailwind CSS and DaisyUI for styling. The backend is built using Node.js and Express, and MongoDB is used as the database.

## Features

* Add new patient records
* Automatically generate patient ID
* Store patient medical history
* View patient details
* Update patient information
* Delete patient records
* Search patients by name
* Filter patients by gender
* Simple table based interface for displaying data

## Technologies Used

Frontend
React
Tailwind CSS
DaisyUI
React Router
Axios

Backend
Node.js
Express.js
MongoDB
Mongoose

## Project Structure

```
clinic-management-system
│
├── backend
│   ├── models
│   ├── routes
│   ├── controllers
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── Pages
│   │   ├── lib
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```

## Installation

1. Clone the repository

```
git clone https://github.com/yourusername/clinic-management-system.git
```

2. Install backend dependencies

```
cd backend
npm install
```

3. Start backend server

```
npm run dev
```

4. Install frontend dependencies

```
cd frontend
npm install
```

5. Start frontend server

```
npm run dev
```

## Database Fields

The patient data stored in the database includes the following fields:

* Patient ID
* Name
* Age
* Gender
* Phone Number
* Address
* Blood Group
* Allergies
* Medical History
* Created At

## Functionality

The system allows clinic staff to manage patient information efficiently. When a new patient is added, the system automatically generates a unique patient ID. All patient information including medical history can be stored and updated when required. The search and filter options help to quickly find patient records.



If you want, I can also give you a **slightly shorter README version that looks even more natural for college submission or viva**, which many professors prefer.
