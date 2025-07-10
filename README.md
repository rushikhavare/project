# Expense Tracker

A full-stack web application for tracking personal expenses with user authentication, expense management, and data visualization.

## 🚀 Features

- **User Authentication**: Secure signup and login with JWT tokens
- **Expense Management**: Add, view, and categorize expenses
- **Categories**: Shopping, Entertainment, Healthcare, Housing, Education, Travel
- **Data Visualization**: Visualize spending patterns and trends
- **Protected Routes**: Secure dashboard access for authenticated users

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern UI library
- **React Router DOM 7.6.3** - Client-side routing
- **CSS Modules** - Scoped styling
- **React Testing Library** - Unit testing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5.1.0** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 8.16.2** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcrypt 6.0.0** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
expenseTracker/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── auth/          # Authentication components
│   │   ├── pages/         # Page components
│   │   │   ├── dashboard/ # Dashboard pages
│   │   │   ├── login/     # Login page
│   │   │   └── signup/    # Signup page
│   │   └── App.js         # Main app component
│   └── package.json
├── server/                # Node.js backend
│   ├── db/               # Database configuration
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   └── index.js          # Server entry point
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expenseTracker
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**

   Create a `.env` file in the server directory:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   FRONTEND_PORT=3001
   ```

5. **Start the application**

   **Terminal 1 - Start the backend server:**
   ```bash
   cd server
   npm start
   ```

   **Terminal 2 - Start the frontend development server:**
   ```bash
   cd client
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:3000

## 📖 Usage

### Authentication
1. **Sign Up**: Create a new account with username, email, and password
2. **Login**: Access your account with email and password
3. **Protected Routes**: Dashboard is only accessible to authenticated users

### Expense Management
1. **Add Expense**: Navigate to the "Add Expense" page
   - Select a category (Shopping, Entertainment, Healthcare, Housing, Education, Travel)
   - Enter the amount
   - Choose the date
   - Add optional comments
   - Submit to save

2. **View Expenses**: Navigate to the "View Expense" page to see all your expenses

3. **Visualize Data**: Use the visualization features to analyze spending patterns

## 🔧 API Endpoints

### Authentication
- `POST /user/signup` - Register a new user
- `POST /user/login` - Login user
- `POST /user/logout` - Logout user

### Expenses
- `GET /expense` - Get all expenses for authenticated user
- `POST /expense` - Create a new expense
- `PUT /expense/:id` - Update an expense
- `DELETE /expense/:id` - Delete an expense

## 🧪 Testing

Run tests for the frontend:
```bash
cd client
npm test
```

## 🏗️ Database Schema

### User Schema
- `username` (String, required, unique)
- `email` (String, required, unique)
- `password` (String, required, hashed)
- `createdAt` (Date, default: now)

### Expense Schema
- `category` (String, required, enum)
- `amount` (Number, required, min: 0)
- `date` (Date, required)
- `comments` (String, optional, max: 500 chars)
- `timestamps` (createdAt, updatedAt)

## 🔒 Security Features

- **Password Hashing**: Passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Frontend route protection
- **CORS Configuration**: Secure cross-origin requests
- **Input Validation**: Server-side data validation

## 🚀 Deployment

### Frontend Deployment
```bash
cd client
npm run build
```

### Backend Deployment
- Ensure environment variables are set
- Use a process manager like PM2
- Set up MongoDB connection


**Note**: Make sure to set up your MongoDB connection string and JWT secret in the environment variables before running the application. 
 
