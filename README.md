# StayWithMe — Intelligent PG & Roommate Finder Platform 🏠

A full-stack platform designed to help users find suitable PG accommodations and compatible roommates based on their budget, preferred location, and lifestyle preferences.

## 🚀 Features

- **User Authentication:** Secure registration and login using JWT authentication.
- **PG Accommodation Search:** Explore PG accommodations based on user preferences.
- **Roommate Finder:** Create and view roommate profiles.
- **Preference Matching:** Find potential roommates based on budget, location, and lifestyle.
- **Real-Time Chat:** Communicate with potential roommates using Socket.IO.
- **User Profiles:** Manage personal and roommate information.

## 🛠️ Tech Stack

**Frontend**
- React Native
- Expo

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB

**Authentication & Communication**
- JSON Web Token (JWT)
- Socket.IO

## 📁 Project Structure

```text
PG-Roommate-Finder/
│
├── pg-roommate-backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
├── pg-roommate-frontend/
│   ├── screens/
│   ├── components/
│   └── package.json
│
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/tiwari22123/pg-roommate-finder.git
cd pg-roommate-finder
```

### 2. Backend Setup

```bash
cd pg-roommate-backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup

Open another terminal:

```bash
cd pg-roommate-frontend
npm install
npx expo start --web
```

The application will run locally in your browser.

## 🔐 Security

- JWT-based authentication.
- Protected backend routes.
- Environment variables for sensitive configuration.

## 🎯 Project Objective

The main objective of this project is to simplify the process of finding affordable PG accommodations and compatible roommates through a single platform with search, profile management, and real-time communication features.

## 👩‍💻 Author

**Adya Tiwari**

[GitHub](https://github.com/tiwari22123)

---

