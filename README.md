# StartupGuru - Fullstack MERN Architecture

StartupGuru is a fullstack Web Application Development (WAD) platform built with a clear separation of **`frontend`** (React SPA) and **`backend`** (Node.js/Express + MongoDB).

---

## 📁 Grouped Project Structure

```
StartupGuru/
├── frontend/                     # ⚛️ FRONTEND (React + Vite + React Router)
│   ├── src/
│   │   ├── components/           # Reusable UI Elements
│   │   │   ├── Navbar.jsx        # Navigation with active route highlighting
│   │   │   ├── Footer.jsx        # Standardized site footer
│   │   │   └── InsightsSlider.jsx# Founder tips slider (useState hook)
│   │   ├── pages/                # Multi-Page Routes
│   │   │   ├── Home.jsx          # Hero section + 4 evaluation pillars
│   │   │   ├── ServicesPage.jsx  # Detailed advisory services breakdown
│   │   │   ├── SubmitIdea.jsx    # Idea submission form with input validation
│   │   │   ├── DatabasePage.jsx  # Live database dashboard & demo table
│   │   │   └── AboutPage.jsx     # Platform mission & architecture stack
│   │   ├── services/
│   │   │   └── api.js            # Fetch calls to backend endpoints
│   │   ├── App.jsx               # React Router (<Routes>, <Route>)
│   │   ├── main.jsx              # Application bootstrap (<BrowserRouter>)
│   │   └── index.css             # Responsive styling
│   └── package.json
│
├── backend/                      # 🗄️ BACKEND (Node.js + Express + MongoDB)
│   ├── config/
│   │   └── db.js                 # MongoDB Atlas connection (Mongoose) + fallback
│   ├── models/
│   │   └── Idea.js               # Mongoose Schema & validation model
│   ├── controllers/
│   │   └── ideaController.js     # CRUD business logic (CRUD operations)
│   ├── routes/
│   │   └── ideaRoutes.js         # Express Router mapping HTTP endpoints
│   └── index.js                  # Express app & API server entry point
│
├── legacy-html-demo/             # 📄 Original Vanilla HTML/CSS/JS version
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .env.example                  # Example environment variables
├── .env                          # Local environment variables (Port & Atlas URI)
├── server.js                     # Root entry point forwarding to backend/index.js
└── package.json                  # Root runner scripts
```

---

## 🚀 Running the Application

### 1. Start the Backend API (Port 5000):
```bash
npm start
```

### 2. In a separate terminal, start the Frontend (Port 5173):
```bash
npm run frontend
```
Open **`http://localhost:5173`** in your browser.

---

## 📡 Backend Router Endpoints (`backend/routes/ideaRoutes.js`)

| Method | Endpoint | Action |
|---|---|---|
| `GET` | `/api/status` | Check backend health & active DB engine |
| `GET` | `/api/ideas` | Fetch all ideas for the live table |
| `POST` | `/api/ideas` | Validate & save submitted idea |
| `DELETE` | `/api/ideas/:id` | Delete an idea by ID |
