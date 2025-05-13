# Task Tracker

A full-stack project management app to create projects, manage tasks, and track progress. Built with React (frontend), Node.js/Express (backend), and MongoDB.

## 🚀 Live Demo

[Task Tracker Live Website](https://task-tracker-app-orcin.vercel.app/)

---

## Features

- User authentication (signup, login, JWT-based)
- Forgot password functionality
- Create, update, and delete projects (limit: 4 per user)
- Create, update, and delete tasks within projects
- Task status tracking (Yet to Begin, In Process, Completed)
- Responsive and modern UI with Tailwind CSS

---

## Folder Structure

```
Task Tracker/
│
├── backend/         # Node.js/Express API
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/        # React app (Vite)
│   ├── src/
│   ├── public/
│   ├── .env
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

---

### 1. Clone the Repository

```bash
git clone https://github.com/ankurkrr/Task-Tracker-App
cd task-tracker
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

- Create a `.env` file in the `backend` folder:

  ```
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  PORT=5000
  ```

  **How to create a JWT_SECRET:**
  You can generate a secure random secret using Node.js in your terminal:

  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```

  Copy the output and use it as your `JWT_SECRET`.
- Start the backend server:

  ```bash
  npm run dev
  # or
  npm start
  ```

  The backend will run on [http://127.0.0.1:5000](http://127.0.0.1:5000).

---

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

- Create a `.env` file in the `frontend` folder:

  ```
  VITE_API_URL=http://127.0.0.1:5000
  ```
- Start the frontend dev server:

  ```bash
  npm run dev
  ```

  The frontend will run on [http://127.0.0.1:3000](http://127.0.0.1:3000).

---

## 📝 Environment Variables

### Backend (`backend/.env`)

- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT
- `PORT` - Port for backend server (default: 5000)

### Frontend (`frontend/.env`)

- `VITE_API_URL` - URL of the backend API (default: `http://127.0.0.1:5000`)

---

## 🖥️ Deployment

- **Frontend:** Deployed on [Vercel](https://vercel.com/)
- **Backend:** Deployed on [Render](https://render.com/)

## 📄 License

This project is for educational purposes.

---

## 🙏 Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)

---

## ✨ Live Demo

[https://task-tracker-app-orcin.vercel.app/](https://task-tracker-app-orcin.vercel.app/)
