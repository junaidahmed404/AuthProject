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

/auth-service │── /client # Frontend (React + Zustand) │── /server # Backend (Node.js + Express) │── /config # Configuration files (env, DB, JWT, OAuth) │── /middleware # Authentication & security middlewares │── /routes # API routes (auth, users) │── /controllers # Business logic for authentication │── /models # Mongoose models (User, Tokens) │── /utils # Utility functions (JWT, email, hashing) │── .env # Environment variables │── package.json # Dependencies & scripts │── README.md # Project documentation

yaml
Copy
Edit

---

## 🔧 Installation  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/junaidahmed404/auth-service.git
cd auth-service
2️⃣ Install Dependencies
bash
Copy
Edit
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
3️⃣ Set Up Environment Variables
Create a .env file inside the server directory and add the following:

env
Copy
Edit
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
bash
Copy
Edit
cd server
npm run dev
Start the Frontend
bash
Copy
Edit
cd client
npm start
The backend will run on http://localhost:5000, and the frontend will run on http://localhost:3000.

📡 API Endpoints
Method	Endpoint	Description	Auth Required
POST	/api/auth/register	Register a new user	❌ No
POST	/api/auth/login	User login & JWT issuance	❌ No
GET	/api/auth/logout	Logout & clear session	✅ Yes
GET	/api/auth/me	Get logged-in user details	✅ Yes
POST	/api/auth/refresh	Refresh JWT token	✅ Yes
POST	/api/auth/forgot-password	Send password reset email	❌ No
POST	/api/auth/reset-password	Reset password via token	❌ No
GET	/api/auth/google	Google OAuth authentication	❌ No
GET	/api/auth/github	GitHub OAuth authentication	❌ No
🔒 Security Measures
JWT Token Expiry & Refresh System

OAuth with Google & GitHub for third-party login

Rate Limiting & CORS enabled

Bcrypt password hashing

Helmet for HTTP security headers


🔗 Connect with Me




🚀 Let's build something amazing together!

yaml
Copy
Edit

---

### 📌 **What’s Included?**  
✅ **Clear project overview**  
✅ **Installation guide**  
✅ **API documentation table**  
✅ **Project structure**  
✅ **Security & authentication details**  
✅ **Well-formatted Markdown for readability**  

Let me know if you need any additions or modifications! 🚀
