# AlgoWise Technologies

**Project Overview:** AlgoWise Technologies is a web application that allows users to explore job listings and trending courses. The frontend is built using React.js, and the backend is developed with Node.js, utilizing MongoDB as the database.

**Setup Instructions:**

1. **Prerequisites:** Ensure you have the following installed:
   - **Node.js** (v14 or above)
   - **MongoDB** (running locally or via a cloud provider like MongoDB Atlas)
   - **npm** or **yarn**
   - **Git**

2. **Clone the Repository:**
   ```bash
   git clone https://github.com/manasakancharla1/algowise-technologies.git
   cd algowise-technologies
   ```

3. **Backend Setup:**
   - Navigate to the `backend` folder:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file with the following content:
     ```bash
     MONGO_URI=mongodb://localhost:27017/jobCoursesDB
     PORT=5000
     ```
   - Start the backend server:
     ```bash
     npm start
     ```
   - The backend server will run at `http://localhost:5000`.

4. **Frontend Setup:**
   - Navigate to the `frontend` folder:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend development server:
     ```bash
     npm start
     ```
   - The frontend application will run at `http://localhost:3000`.

**Running the Project:**

- **Backend:** Ensure MongoDB is running, then start the backend server using `npm start` in the `backend` directory.
- **Frontend:** Start the frontend development server using `npm start` in the `frontend` directory.

**API Documentation:**

- **Jobs API:** 
  - `GET /api/jobs` - Fetch all available jobs.
  - `POST /api/jobs` - Create a new job (admin-only).
- **Courses API:** 
  - `GET /api/courses` - Fetch all available courses.
  - `POST /api/courses` - Create a new course (admin-only).
- **User Authentication API:** 
  - `POST /api/signup` - Register a new user.
  - `POST /api/signin` - Authenticate a user and return a token.

**Dependencies:**

- **Backend:** 
  - `express` - Fast, unopinionated, minimalist web framework for Node.js
  - `mongoose` - MongoDB object modeling tool
  - `dotenv` - Loads environment variables from a `.env` file
- **Frontend:** 
  - `react` - JavaScript library for building user interfaces
  - `react-router-dom` - Declarative routing for React.js
  - `bootstrap` - Frontend framework for building responsive, mobile-first sites
  - `font-awesome` - Icon library for scalable vector icons

**Troubleshooting:**

- **Backend Not Starting:** Ensure MongoDB is running. Check your `.env` file for correct configuration. Verify that the port is not in use by another process.
- **Frontend Not Loading:** Ensure the backend server is running. Check for any console errors in the browser's developer tools. Verify that the frontend dependencies are correctly installed.
- **API Errors:** Confirm that the API endpoints are correct and accessible. Ensure that your backend server is running and that there are no network issues preventing communication between frontend and backend.

