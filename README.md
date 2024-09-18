﻿# DemoProject
# DemoProject
# AlgoWise Technologies

AlgoWise Technologies is a web application that allows users to explore job listings and trending courses. The frontend is built using React.js, and the backend is developed with Node.js, utilizing MongoDB as the database.

## Features

- **Job Listings**: Users can browse and apply for jobs.
- **Courses**: Users can explore and enroll in trending courses.
- **User Authentication**: Sign up, log in, and manage user accounts.
- **Mobile-Friendly**: Responsive design for optimal performance on all devices.
- **Dynamic Data**: Real-time data fetched from MongoDB for jobs and courses.
- **Security**: Basic input validation and protection against common vulnerabilities.

## Table of Contents

- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)

## Installation

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v14 or above)
- **MongoDB** (running locally or via a cloud provider like MongoDB Atlas)
- **npm** or **yarn**
- **Git**

### Clone the Repository

To get started, clone the repository to your local machine:

```bash
git clone https://github.com/manasakancharla1/algowise-technologies.git
cd algowise-technologies
```

### Backend Setup

1. Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

2. Create a `.env` file in the `backend` folder with the following content:

```bash
MONGO_URI=mongodb://localhost:27017/jobCoursesDB
PORT=5000
```

3. Start the backend server:

```bash
npm start
```

The backend server should now be running at `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend folder and install dependencies:

```bash
cd frontend
npm install
```

2. Start the frontend development server:

```bash
npm start
```

The frontend should now be running at `http://localhost:3000`.

## Folder Structure

The project folder structure is organized as follows:

```bash
algowise-technologies/
├── backend/          # Backend (Node.js API for jobs and courses)
│   ├── controllers/  # Logic for handling requests
│   ├── models/       # MongoDB models for jobs and courses
│   ├── routes/       # API routes for jobs and courses
│   ├── app.js        # Express server setup
│   └── package.json  # Backend dependencies
├── frontend/         # Frontend (React.js UI)
│   ├── src/
│   │   ├── components/ # React components (Header, Footer, etc.)
│   │   ├── pages/      # React pages (Home, AboutUs, Jobs, Courses)
│   │   ├── App.js      # Main React component
│   │   └── index.js    # Entry point for React
│   └── package.json    # Frontend dependencies
└── README.md         # Project README
```

## API Endpoints

The backend provides the following API endpoints:

- **Jobs API**
  - `GET /api/jobs`: Fetch all available jobs.
  - `POST /api/jobs`: Create a new job (admin-only).
- **Courses API**
  - `GET /api/courses`: Fetch all available courses.
  - `POST /api/courses`: Create a new course (admin-only).
- **User Authentication API**
  - `POST /api/signup`: Register a new user.
  - `POST /api/signin`: Authenticate a user and return a token.

