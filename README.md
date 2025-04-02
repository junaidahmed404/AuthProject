# 🔐 Authentication Service (MERN + Zustand)

A **secure, standalone authentication service** built using **MERN Stack** with **Zustand** for state management. This service is designed to be easily integrated into other applications, providing **JWT-based authentication, OAuth support, role-based access control (RBAC), and session management**.

---

## 🚀 Features

✅ **User Authentication** (Register, Login, Logout)  
✅ **JWT-Based Authentication** (Secure access tokens & refresh tokens)  
✅ **OAuth2 Integration** (Google, GitHub, etc.)  
✅ **Role-Based Access Control (RBAC)**  
✅ **Session Management**  
✅ **Password Hashing with Bcrypt**  
✅ **Email Verification & Password Reset**  
✅ **API Rate Limiting & Security Enhancements**  

---

## 🛠 Tech Stack

- **Frontend:** React, Zustand, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB with Mongoose  
- **Authentication:** JWT, OAuth2, Bcrypt  
- **Security:** Helmet, CORS, Express Rate Limit  

---

## 📂 Project Structure

/auth-service
├── client/          # Frontend (React + Zustand)
├── server/          # Backend (Node.js + Express)
│   ├── config/      # Configuration files (env, DB, JWT, OAuth)
│   ├── middleware/  # Authentication & security middlewares
│   ├── routes/      # API routes (auth, users)
│   ├── controllers/ # Business logic for authentication
│   ├── models/      # Mongoose models (User, Tokens)
│   ├── utils/       # Utility functions (JWT, email, hashing)
├── .env             # Environment variables
├── package.json     # Dependencies & scripts
├── README.md        # Project documentation

Project documentation

---

## 🔧 Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/junaidahmed404/auth-service.git
cd auth-service


2️⃣ Install Dependencies

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

3️⃣ Set Up Environment Variables
Create a .env file inside the server directory and add the following:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=7d
OAUTH_GOOGLE_CLIENT_ID=your_google_client_id
OAUTH_GOOGLE_CLIENT_SECRET=your_google_client_secret
OAUTH_GITHUB_CLIENT_ID=your_github_client_id
OAUTH_GITHUB_CLIENT_SECRET=your_github_client_secret
EMAIL_USER=your_email_service_user
EMAIL_PASS=your_email_service_password


🚀 Running the Project
Start the Backend Server

cd server
npm run dev


Start the Frontend
cd client
npm start
