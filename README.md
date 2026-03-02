# Think-Books-Phase-3
Think Books is a web application designed to help users explore, search, and manage book recommendations.  
This repository contains the **Phase 3** implementation, which introduces authentication, improved routing, and integration with MongoDB Atlas.

---

## 🚀 Features
- User registration and login system (authentication with `auth.js` routes).
- Book recommendation search functionality.
- MongoDB Atlas integration for storing user and book data.
- Organized project structure with `public/` for frontend assets and `src/` for backend routes.
- Responsive HTML pages for login, registration, and search.

---

## 🛠️ Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Cloud)
- **Version Control:** Git & GitHub

---

## 📂 Project Structure
Think-Books-Phase-3/
│
├── public/
│   ├── login.html
│   ├── register.html
│   ├── search.html
│   └── styles.css
│
├── src/
│   ├── routes/
│   │   └── auth.js
│   └── server.js
│
├── package.json
└── README.md

Code

---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/nonsodaboss-ops/Think-Books-Phase-3.git
   cd Think-Books-Phase-3
Install dependencies

bash
npm install
Configure environment variables

Create a .env file in the root directory.

Add your MongoDB connection string:

Code
MONGO_URI=your-mongodb-atlas-uri
PORT=3000
Run the server

bash
npm start
The app will be available at http://localhost:3000.

🔑 Authentication
Login: public/login.html

Register: public/register.html

Routes handled in src/routes/auth.js.

🌐 Deployment
Can be deployed on services like Heroku, Render, or Vercel.

Ensure MongoDB Atlas cluster is properly configured and accessible.

🤝 Contributing
Fork the repo

Create a new branch (feature/your-feature)

Commit changes (git commit -m "Add new feature")

Push to branch (git push origin feature/your-feature)

Open a Pull Request

📜 License
This project is licensed under the MIT License.
