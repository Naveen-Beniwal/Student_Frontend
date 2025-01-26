# Campus Placement Portal - Student Dashboard 🎓

<div align="center">
  <img src="path_to_your_banner_image.png" alt="Project Banner" width="800"/>
</div>

> A comprehensive student dashboard for campus placement management, built with React.js and Node.js.

## ✨ Features

### Authentication & Security
- 🔐 Secure JWT-based authentication
- 🔄 Token refresh mechanism
- 🛡️ Protected routes and role-based access

### Student Profile Management
- 📝 Complete profile creation and editing
- 📄 Resume builder with multiple templates
- 📊 Academic details management
- 🎯 Skills and achievements tracking

### Placement Process
- 📢 Real-time job notifications
- 📅 Interview scheduling
- 📋 Application tracking
- 📊 Placement statistics visualization

### Analytics Dashboard
- 📈 Personal placement progress
- 🎯 Company-wise application status
- 📊 Batch performance metrics
- 🔍 Detailed application history

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm/yarn
- MongoDB
- Git

### Backend Setup
```bash
# Clone the repository
git clone <repository-url>

# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
touch .env
Add the following to your .env file:

env
ACCESS_TOKEN_SECRET = 123
ACCESS_TOKEN_EXPIRY = 4d

REFRESH_TOKEN_SECRET = 123
REFRESH_TOKEN_EXPIRY = 7d

PORT = 3000
DATABASE_URL = "your_mongodb_connection_string"
bash
# Start the backend server
npm run dev

# Server will start on http://localhost:3000
Frontend Setup
bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm run dev

# Application will open on http://localhost:5173
📸 Screenshots
Homepage
Student Dashboard
Profile Management
🛠️ Tech Stack
Frontend
React.js
TailwindCSS
GSAP/Framer Motion
Chart.js
Axios
Backend
Node.js
Express.js
MongoDB
JWT Authentication
Passport.js
📱 Application Flow
User Registration/Login

Visit localhost:5173
Click on "Sign Up" for new registration
Fill in required details
Verify email (if implemented)
Login with credentials
Profile Setup

Complete personal information
Add academic details
Upload resume or use builder
Add skills and achievements
Dashboard Access

View available opportunities
Track application status
Check placement statistics
Manage notifications
⚙️ Environment Variables
Backend (.env)
env
ACCESS_TOKEN_SECRET = 123
ACCESS_TOKEN_EXPIRY = 4d

REFRESH_TOKEN_SECRET = 123
REFRESH_TOKEN_EXPIRY = 7d

PORT = 3000
DATABASE_URL = "your_mongodb_connection_string"
🔐 Security Features
JWT-based authentication
Protected API endpoints
Refresh token rotation
Role-based access control
Input validation
XSS protection
🐛 Common Issues & Solutions
Connection Error

bash
Error: ECONNREFUSED
Solution: Ensure MongoDB is running and DATABASE_URL is correct

Token Error

bash
Error: Invalid token
Solution: Clear browser cookies and login again

📝 Additional Notes
Ensure both frontend and backend servers are running simultaneously
MongoDB should be running before starting the backend server
Use Chrome or Firefox for best experience
Keep your tokens secure and never share them
🤝 Contributing
Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
📞 Support
For support, email naveenbeniwal00001@gmail.com

Created with ❤️ by Naveen Beniwal
